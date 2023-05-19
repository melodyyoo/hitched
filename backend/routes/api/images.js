const router = require("express").Router();

const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

router.delete("/spot-images/:imageId", requireAuth, async (req, res, next) => {
  const image = await SpotImage.findByPk(req.params.imageId, {
    include: { model: Spot },
  });

  if (!image) return res.status(404).json({ message: "Spot Image couldn't be found" });

  if (image.Spot.ownerId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

  await image.destroy();

  res.json({ message: "Successfully deleted" });
});

router.delete("/review-images/:imageId", requireAuth, async (req, res, next) => {
    const review = await ReviewImage.findByPk(req.params.imageId, {
        include: {model: Review}
    });

    if(!review) return res.status(404).json({message: "Review Image couldn't be found"});

    if(review.Review.userId !== req.user.id) return res.status(403).json({message: "Forbidden"});

    await review.destroy();

    res.json({message: "Successfully deleted"})

});

module.exports = router;
