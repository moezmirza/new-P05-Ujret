import Review from '../../models/handymen_module/reviewModel.js'
import Handyman from '../../models/handymen_module/handymanModel.js'

const addReview = async (req, res) => {
    try {
        const { handyman_id, user_id, rating, review } = req.body
        const reviewObj = new Review({
            handymanId:handyman_id,
            userId:user_id,
            rating,
            review
        })
        const savedReview = await reviewObj.save()
        if (savedReview) {
            const handyman = await Handyman.findOne({ id: handyman_id })
            handyman.reviewsCount += 1
            handyman.rating = ((handyman.rating * (handyman.reviewsCount-1)) + rating) / handyman.reviewsCount
            await handyman.save()
            
            res.status(201).send({
                data: null,
                event_code: '1',
                message: 'Review added successfully',
                status_code: 201,
            });
        } else {
            console.log('Failed to add review');
            res.status(500).send({
                data: null,
                event_code: '0',
                message: 'Failed to add review',
                status_code: 500,
            });
        }
    } catch (error) {
        console.log('some error', error);
        res.status(500).send({
            data: null,
            event_code: '0',
            message: 'Failed to add review',
            status_code: 500,
        });
    }

}

const updateRating = async (req, res) => {
    try{
        const {handyman_id} = req.query
        const handyman = await Handyman.findOne({ id: handyman_id })
        const reviews = await Review.find({handymanId:handyman_id})
        let rating = 0
        reviews.forEach(review => {
            rating += review.rating
        })
        handyman.rating = rating / reviews.length
        await handyman.save()
        res.status(201).send({
            data: null,
            event_code: '1',
            message: 'Rating updated successfully',
            status_code: 201,
        });
    }
    catch(error){
        console.log('some error', error);
        res.status(500).send({
            data: null,
            event_code: '0',
            message: 'Failed to update rating',
            status_code: 500,
        });
    }
}

const updateAllRatings = async (req, res) => {
    try{
        const handymen = await Handyman.find({})
        handymen.forEach(async handyman => {
            const reviews = await Review.find({handymanId:handyman.id})
            let rating = 0
            reviews.forEach(review => {
                rating += review.rating
            })
            handyman.rating = rating / reviews.length
            await handyman.save()
        })
        res.status(201).send({
            data: null,
            event_code: '1',
            message: 'Rating updated successfully',
            status_code: 201,
        });
    }
    catch(error){
        console.log('some error', error);
        res.status(500).send({
            data: null,
            event_code: '0',
            message: 'Failed to update rating',
            status_code: 500,
        });
    }

}


export {
    addReview,
    updateRating,
    updateAllRatings
}
