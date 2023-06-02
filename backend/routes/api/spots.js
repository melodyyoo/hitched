const express = require("express");
const router = express.Router();

const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const { Op } = require("sequelize");
const { validateQuery } = require("../../utils/validation");

//get all spots
router.get("/", async (req, res) => {
  const options = validateQuery(req.query);
  const spots = await Spot.findAll(options);

  const updatedSpots = [];

  for (let i = 0; i < spots.length; i++) {
    const spot = spots[i];

    const reviews = await spot.getReviews();

    let starTotal = 0;
    reviews.forEach((review) => {
      starTotal += review.dataValues.stars;
    });

    const avg = starTotal / reviews.length;
    spot.dataValues.avgRating = avg;

    const images = await spot.getSpotImages();
    images.forEach((image) => {
      if (image.dataValues.preview === true) {
        spot.dataValues.previewImage = image.dataValues.url;
      } else {
        spot.dataValues.previewImage = "No preview image available";
      }
    });

    updatedSpots.push(spot.toJSON());
  }

  res.json({ Spots: updatedSpots, page: parseInt(req.query.page), size: parseInt(req.query.size) });
});

//get all spots owned by the current user
router.get("/current", requireAuth, async (req, res, next) => {
  const spots = await Spot.findAll({
    where: { ownerId: req.user.id },
  });

  const updatedSpots = [];

  for (let i = 0; i < spots.length; i++) {
    const spot = spots[i];

    const reviews = await spot.getReviews();

    let starTotal = 0;
    reviews.forEach((review) => {
      starTotal += review.dataValues.stars;
    });

    const avg = starTotal / reviews.length;
    spot.dataValues.avgRating = avg;

    const images = await spot.getSpotImages();
    images.forEach((image) => {
      if (image.dataValues.preview === true) {
        spot.dataValues.previewImage = image.dataValues.url;
      } else {
        spot.dataValues.previewImage = "No preview image available";
      }
    });

    updatedSpots.push(spot.toJSON());
  }

  res.json({ Spots: updatedSpots });
});

//get details of a spot from an id
router.get("/:spotId", async (req, res, next) => {
  const spots = { Spots: [] };

  const spot = await Spot.findByPk(req.params.spotId, {
    include: [
      { model: SpotImage, attributes: ["id", "url", "preview"] },
      { model: User, attributes: ["id", "firstName", "lastName"], as: "Owner" },
    ],
  });

  if (spot) {
    const reviews = await spot.getReviews();
    spot.dataValues.numReviews = reviews.length;

    let starTotal = 0;
    reviews.forEach((review) => {
      starTotal += review.dataValues.stars;
    });
    const avg = starTotal / reviews.length;

    spot.dataValues.avgStarRating = avg;

    res.json(spot);
  } else {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
    });
  }
});

//create a spot
router.post("/", requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const error = { message: "Bad Request", errors: {} };
  if (!address) {
    error.errors.address = "Street address is required";
  }

  if (!city) {
    error.errors.city = "City is required";
  }

  if (!state) {
    error.errors.state = "State is required";
  }

  if (!country) {
    error.errors.country = "Country is required";
  }

  if (!lat || typeof lat !== "number") {
    error.errors.lat = "Latitude is not valid";
  }

  if (!lng || typeof lng !== "number") {
    error.errors.lng = "Longitude is not valid";
  }

  if (!name || name.length > 50) {
    error.errors.name = "Name must be less than 50 characters";
  }

  if (!description) {
    error.errors.description = "Description is required";
  }

  if (!price) {
    error.errors.price = "Price per day is required";
  }

  if (Object.keys(error.errors).length) {
    res.status(400);
    res.json(error);
  }

  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  res.status(201);
  res.json(newSpot);
});

//add an image to a spot based on the spot's id
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (spot) {
    if (spot.dataValues.ownerId === req.user.id) {
      const { url, preview } = req.body;
      const newSpotImage = await SpotImage.create({
        url,
        preview,
        spotId: req.params.spotId,
      });

      const spotImage = await SpotImage.findOne({
        where: {
          url,
        },
        attributes: ["id", "url", "preview"],
      });

      res.json(spotImage);
    } else {
      res.status(403);
      res.json({ message: "Forbidden" });
    }
  } else {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
    });
  }
});

//get all reviews by a spot's id
router.get("/:spotId/reviews", async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (spot) {
    const reviews = await Review.findAll({
      where: {
        spotId: req.params.spotId,
      },
      include: [
        { model: User, attributes: ["id", "firstName", "lastName"] },
        { model: ReviewImage, attributes: ["id", "url"] },
      ],
    });

    res.json({ Reviews: reviews });
  } else {
    res.status(404);
    res.json({ message: "Spot couldn't be found" });
  }
});

//create a review for a spot based on the spot's id
router.post("/:spotId/reviews", requireAuth, async (req, res, next) => {
  const { review, stars } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);

  if (spot) {
    const findReview = await Review.findOne({
      where: {
        userId: req.user.id,
        spotId: req.params.spotId,
      },
    });

    if (!findReview) {
      const error = { message: "Bad Request", errors: {} };
      if (!review) {
        error.errors.review = "Review text is required";
      }

      if (!stars || typeof stars !== "number" || stars < 1 || stars > 5) {
        error.errors.stars = "Stars must be an integer from 1 to 5";
      }

      if (Object.keys(error.errors).length) {
        res.status(400);
        res.json(error);
      }

      const newReview = await Review.create({
        userId: req.user.id,
        spotId: parseInt(req.params.spotId),
        review,
        stars,
      });

      res.status(201);
      res.json(newReview);
    } else {
      res.status(500);
      res.json({ message: "User already has a review for this spot" });
    }
  } else {
    res.status(404);
    res.json({ message: "Spot couldn't be found" });
  }
});

//get all bookings for a spot based on the spot's id
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (spot) {
    const jsonSpot = spot.toJSON();
    if (jsonSpot.ownerId === req.user.id) {
      const ownerSpot = await Spot.findByPk(req.params.spotId, {
        where: { ownerId: req.user.id },
        include: {
          model: Booking,
          include: { model: User, attributes: ["id", "firstName", "lastName"] },
        },
        attributes: {
          exclude: [
            "id",
            "ownerId",
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "description",
            "price",
            "createdAt",
            "updatedAt",
          ],
        },
      });

      const newOwnerSpot = ownerSpot.toJSON();
      res.json(newOwnerSpot);
    } else {
      const nonOwnerSpot = await Spot.findByPk(req.params.spotId, {
        include: {
          model: Booking,
          attributes: ["spotId", "startDate", "endDate"],
        },
        attributes: {
          exclude: [
            "id",
            "ownerId",
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "description",
            "price",
            "createdAt",
            "updatedAt",
          ],
        },
      });

      const newNonOwnerSpot = nonOwnerSpot.toJSON();
      res.json(newNonOwnerSpot);
    }
  } else {
    res.status(404).json({ message: "Spot couldn't be found" });
  }
});

//create a booking from a spot based on the spot's id
router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { startDate: reqStartDate, endDate: reqEndDate } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);

  if (spot) {
    const jsonSpot = spot.toJSON();

    if (jsonSpot.ownerId !== req.user.id) {
      const error = { message: "Bad Request", errors: {} };

      const reqEnd = new Date(reqEndDate).getTime();
      const reqStart = new Date(reqStartDate).getTime();

      if (!reqEndDate || !reqStartDate || reqStart >= reqEnd) {
        error.errors.endDate = "endDate cannot be on or before startDate";
      }
      if (Object.keys(error.errors).length) {
        res.status(400);
        return res.json(error);
      }

      const bookingConflict = {
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {},
      };
      const bookings = await Booking.findAll({
        where: { spotId: req.params.spotId },
        attributes: ["endDate", "startDate"],
      });

      for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i];

        const end = new Date(booking.endDate).getTime();
        const start = new Date(booking.startDate).getTime();

        if (reqEnd <= end && reqEnd >= start) {
          bookingConflict.errors.endDate = "End date conflicts with an existing booking";
        }

        if (reqStart <= end && reqStart >= start) {
          bookingConflict.errors.startDate = "Start date conflicts with an existing booking";
        }

        if (reqStart <= start && reqEnd >= end) {
          bookingConflict.errors.startDate = "Start date conflicts with an existing booking";
          bookingConflict.errors.endDate = "End date conflicts with an existing booking";
        }

        if (Object.keys(bookingConflict.errors).length) {
          res.status(400);
          return res.json(bookingConflict);
        }
      }
      //success
      const newBooking = await Booking.create({
        spotId: parseInt(req.params.spotId),
        userId: req.user.id,
        startDate: reqStartDate,
        endDate: reqEndDate,
      });

      res.json(newBooking);
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  } else {
    res.status(404).json({ message: "Spot couldn't be found" });
  }
});

// //edit a spot
router.put("/:spotId", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (spot) {
    if (spot.dataValues.ownerId === req.user.id) {
      const { address, city, state, country, lat, lng, name, description, price } = req.body;
      const error = { message: "Bad Request", errors: {} };
      if (!address) {
        error.errors.address = "Street address is required";
      }

      if (!city) {
        error.errors.address = "City is required";
      }

      if (!state) {
        error.errors.state = "State is required";
      }

      if (!country) {
        error.errors.country = "Country is required";
      }

      if (!lat || typeof lat !== "number") {
        error.errors.lat = "Latitude is not valid";
      }

      if (!lng || typeof lng !== "number") {
        error.errors.lng = "Longitude is not valid";
      }

      if (!name || name.length > 50) {
        error.errors.name = "Name must be less than 50 characters";
      }

      if (!description) {
        error.errors.description = "Description is required";
      }

      if (!price) {
        error.errors.price = "Price per day is required";
      }

      if (Object.keys(error.errors).length) {
        res.status(400);
        res.json(error);
      }

      spot.set({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        ownerId: req.user.id,
      });
      await spot.save();
      res.json(spot);
    } else {
      res.status(403);
      res.json({ message: "Forbidden" });
    }
  } else {
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
});

//delete a spot
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (spot) {
    if (spot.dataValues.ownerId === req.user.id) {
      spot.destroy();

      res.json({
        message: "Successfully deleted",
      });
    } else {
      res.status(403);
      res.json({ message: "Forbidden" });
    }
  } else {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
    });
  }
});

module.exports = router;
