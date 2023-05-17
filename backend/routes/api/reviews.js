const express = require('express');
const router = express.Router();

const {Spot, SpotImage, User, Review, ReviewImage} = require('../../db/models');
const {requireAuth} = require('../../utils/auth')

//Get all reviews of the current user
router.get('/current', requireAuth, async (req,res,next)=>{
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']},
            {model: ReviewImage, attributes: ['id', 'url']}
        ]
    });


    const newReviews = [];

    for(let i =0 ; i< reviews.length; i++){
        const review = reviews[i];

        const newReview = review.toJSON();

        const spot = await Spot.findOne({
            where: {
                id: newReview.spotId
            }
        });
        const spotImages = await spot.getSpotImages();

        for(let i =0; i< spotImages.length; i++){
            const spotImage = spotImages[i];

            const newSpotImage = spotImage.toJSON();


            if(newSpotImage.preview === true){
                newReview.Spot.previewImage = newSpotImage.url
            }else{
                newReview.Spot.previewImage = 'No preview image available'
            }

            newReviews.push(newReview)
        }

    }

    res.json({Reviews: newReviews})
})


//Add an image to a review based on the review's Id
router.post('/:reviewId/images', requireAuth, async(req,res,next)=>{
    const review = await Review.findOne({
        where: {id: req.params.reviewId}
    });


    if(review){
        if(review.dataValues.userId === req.user.id){
            const reviewImages = await review.getReviewImages();

            if(reviewImages.length < 10){
                const {url} = req.body;

                const newImage = await ReviewImage.create({
                    reviewId: req.params.reviewId, url
                });

                const findNewImage = await ReviewImage.findOne({
                    where: {
                        url
                    },
                    attributes: ['id', 'url']
                })

                res.json(findNewImage)

            }else{
                res.status(403);
                res.json({message: "Maximum number of images for this resource was reached"})
            }

        }else{
                res.status(403);
                res.json({message: "Forbidden"})
            }
    }else{
        res.status(404);
        res.json({message: "Review couldn't be found"})
    }
});


//edit a review
router.put('/:reviewId', requireAuth, async(req,res,next)=>{
    const findReview = await Review.findOne({
        where: {id: req.params.reviewId}
    });

    if(findReview){
        if(findReview.dataValues.userId === req.user.id){
            const {review, stars} = req.body;

            const error = {message: 'Bad Request', errors: {}}
            if(!review){
                error.errors.review = 'Review text is required'
            }

            if(!stars || typeof stars !== 'number' || stars < 1 || stars > 5){
                error.errors.stars = 'Stars must be an integer from 1 to 5'
            }

            if(Object.keys(error.errors).length){
                res.status(400);
                res.json(error);
            }

            findReview.set({
                review,
                stars
            });
            await findReview.save();

            res.json(findReview)
        }else{
            res.status(403);
            res.json({message: "Forbidden"})
        }
    }else{
        res.status(404);
        res.json({message: "Review couldn't be found"})
    }
})



//delete a review
router.delete('/:reviewId', requireAuth, async(req,res,next)=>{
    const findReview = await Review.findOne({
        where: {id: req.params.reviewId}
    });

    if(findReview){
        if(findReview.dataValues.userId === req.user.id){
            findReview.destroy();

            res.json({message: "Successfully deleted"})
        }else{
            res.status(403);
            res.json({message: "Forbidden"})
        }
    }else{
        res.status(404);
        res.json({message: "Review couldn't be found"})
    }
})



module.exports = router;
