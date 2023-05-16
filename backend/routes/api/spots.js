const express = require('express');
const router = express.Router();

const {Spot, SpotImage, User, Review} = require('../../db/models');
const {requireAuth} = require('../../utils/auth')

router.get('/', async(req,res,next)=>{
    const spots = await Spot.findAll();

    const updatedSpots = [];

    for(let i =0; i< spots.length; i++){
        const spot = spots[i];


        const reviews = await spot.getReviews();

        let starTotal = 0
        reviews.forEach(review=>{
            starTotal += review.dataValues.stars;
        })

        const avg = starTotal/reviews.length
        spot.dataValues.avgRating = avg;

        const images = await spot.getSpotImages();
        images.forEach(image => {
           if(image.dataValues.preview === true){
            spot.dataValues.previewImage = image.dataValues.url
           }else{
            spot.dataValues.previewImage = 'No preview image available'
           }
        })

        updatedSpots.push(spot.toJSON())
    }

    res.json({Spots: updatedSpots});
})

router.get('/current', requireAuth, async(req,res,next)=>{
    const spots = await Spot.findAll({
        where: {id: req.user.id}
    });


    const updatedSpots = [];

    for(let i =0; i< spots.length; i++){
        const spot = spots[i];
        console.log(spot)

        const reviews = await spot.getReviews();

        let starTotal = 0
        reviews.forEach(review=>{
            starTotal += review.dataValues.stars;
        })

        const avg = starTotal/reviews.length
        spot.dataValues.avgRating = avg;

        const images = await spot.getSpotImages();
        images.forEach(image => {
           if(image.dataValues.preview === true){
            spot.dataValues.previewImage = image.dataValues.url
           }else{
            spot.dataValues.previewImage = 'No preview image available'
           }
        })

        updatedSpots.push(spot.toJSON())
    }

    res.json({Spots: updatedSpots});

})

//get details of a spot from an id
router.get('/:spotId', async(req,res,next)=>{
    const spots = {Spots: []};

    const spot = await Spot.findByPk(
        req.params.spotId,
        {
            include: [
                {model: SpotImage, attributes: ['id', 'url', 'preview']},
                {model: User, attributes: ['id', 'firstName', 'lastName'], as: 'Owner'}
            ]
        }

    );

    if(spot){
        const reviews = await spot.getReviews();
        spot.dataValues.numReviews = reviews.length;

        let starTotal = 0
        reviews.forEach(review=>{
            starTotal += review.dataValues.stars;
        })
        const avg = starTotal/reviews.length

        spot.dataValues.avgStarRating = avg;

        res.json(spot)
    }else{
        res.status(404);
        res.json({
            message: "Spot couldn't be found"
          })
        }
    });

    //create a spot
    router.post('/', requireAuth, async(req,res,next)=>{
        const {address, city, state, country, lat, lng, name, description, price} = req.body;


        const error = {message: 'Bad Request', errors: {}}
        if(!address){
            error.errors.address = 'Street address is required'
        }

        if(!city){
            error.errors.address = 'City is required'
        }

        if(!state){
            error.errors.state = 'State is required'
        }

        if(!country){
            error.errors.country = 'Country is required'
        }

        if(!lat || typeof lat !== 'number'){
            error.errors.lat = "Latitude is not valid"
        }

        if(!lng || typeof lng !== 'number'){
            error.errors.lng = 'Longitude is not valid'
        }

        if(!name || name.length > 50){
            error.errors.name = 'Name must be less than 50 characters'
        }

        if(!description){
            error.errors.description = 'Description is required'
        }

        if(!price){
            error.errors.price = 'Price per day is required'
        }

        if(Object.keys(error.errors).length){
            res.status(400);
            res.json(error);
        }


        const newSpot = await Spot.create({
            address, city, state, country,lat, lng, name, description,price
        });
        res.status(201);
        res.json(newSpot)

    })

    //add an image to a spot based on the spot's id
router.post('/:spotId/images', requireAuth, async(req,res,next)=>{
    const {url, preview} = req.body;

    const spot = await Spot.findByPk(req.params.spotId,{
        attributes: ['id', 'url', 'preview']
    });

    if(spot && spot.dataValues.id === req.user.id){
        const newSpotImage = await SpotImage.create({
            url,
            preview
        })

        res.json(newSpotImage)

    }else{
        res.status(404);
        res.json({
            message: "Spot couldn't be found"
        })
    }
})

// //edit a spot
// router.put('/:spotId', requireAuth, async(req,res,next)=>{

// })


//delete a spot
router.delete('/:spotId', requireAuth, async(req,res,next)=>{
    const spot = await Spot.findByPk(req.params.spotId);

    if(spot){
        spot.destroy();

        res.json({
            message: "Successfully deleted"
          })
    }else{
        res.status(404);
        res.json({
            message: "Spot couldn't be found"
        })
    }
})


module.exports = router;
