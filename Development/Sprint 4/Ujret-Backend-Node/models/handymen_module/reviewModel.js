import mongoose  from 'mongoose'

const ReviewSchema = new mongoose.Schema({
    handymanId: {
        type: String,
        ref: 'Handyman',
        required: true,
        validate: {
        validator: async function (handymanId) {
            const handyman_user = await mongoose
            .model('Handyman')
            .findOne({ id: handymanId })
            return !!handyman_user
        }
        },
        message: 'Handyman with provided ID for Review does not exist.',
    },
    userId: {
        type: String,
        ref: 'User',
        required: true,
        validate: {
        validator: async function (userId) {
            const user = await mongoose.model('User').findOne({ id: userId })
            return !!user
        }
        },
        message: 'User with provided ID for Review does not exist.',
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true},
    createdAt: { type: Date, default: Date.now }


})

const Review = mongoose.model('Review', ReviewSchema)
export default Review