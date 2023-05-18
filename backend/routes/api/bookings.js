const express = require("express");
const router = express.Router();

const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

//get all of the current user's bookings
router.get("/current", requireAuth, async (req, res, next) => {
  const bookings = await Booking.findAll({
    where: { userId: req.user.id },
    include: [{ model: Spot, attributes: { exclude: ["createdAt", "updatedAt"] } }],
  });

const spotImages = await SpotImage.findAll({
    where: {
        preview: true
    }
});

const result = bookings.map(booking =>{
    const image = spotImages.find(spotImage =>{
        return spotImage.spotId === booking.spotId
    });

    const previewImage = image?image.url: 'No preview image available'


    return {...booking.toJSON(), Spot: {...booking.Spot.toJSON(), previewImage}}
})

  res.json({ Bookings: result });
});

// edit a booking
router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const { startDate, endDate } = req.body;

  const booking = await Booking.findByPk(req.params.bookingId);

  if (!booking) return res.status(404).json({ message: "Booking couldn't be found" });

  if (booking.userId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

  const today = new Date().getTime();
  const reqStart = new Date(startDate).getTime();
  const reqEnd = new Date(endDate).getTime();

  if (today > reqEnd) {
    return res.status(403).json({ message: "Past bookings can't be modified" });
  }

  const error = { message: "Bad Request", errors: {} };
  if (!endDate || !startDate || reqStart >= reqEnd) {
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
    where: { spotId: booking.spotId },
    attributes: ["endDate", "startDate"],
  });
  console.log(bookings);

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

  const newBooking = await booking.set({
    startDate,
    endDate,
  });

  await newBooking.save();

  res.json(newBooking);
});

// delete a booking
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId);

  if (!booking) {
    return res.status(404).json({ message: "Booking couldn't be found" });
  }

  if (booking.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const today = new Date().getTime();
  const startDate = new Date(booking.startDate).getTime();
  const endDate = new Date(booking.endDate).getTime();
  console.log("TODAY: ", today);

  if (startDate < today && endDate > today) {
    return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
  }

  await booking.destroy();
  res.json({ message: "Successfully deleted" });
});

module.exports = router;
