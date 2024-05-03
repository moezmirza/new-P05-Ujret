import mongoose from 'mongoose';
import { TASK_CATEGORIES, categorySubCategories } from './categoryModel.js';

const HandymanSchema = new mongoose.Schema({
  id: { type: String, required: true },
  userId: {
    type: String,
    ref: 'User',
    required: true,
    unique: true,
    validate: {
      validator: async function (userId) {
        const user = await mongoose.model('User').findOne({ id: userId });
        return !!user;
      },
      message: 'User with provided ID does not exist.',
    },
  },
  categoryList: {
    type: [
      {
        type: String,
        enum: TASK_CATEGORIES,
      },
    ],
  },
  experience: { type: Number, required: true, default: 0 }, //in years
  about: {
    type: String,
    default: 'Hello i am your service provider',
  },
  address: { type: String, required: true, default: '' },
  onlineStatus: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Pre-save hook
HandymanSchema.pre('save', function (next) {
  if (this.isNew) {
    // Add default values or perform other operations
  }
  next();
});

const Handyman = mongoose.model('Handyman', HandymanSchema);

export default Handyman;
