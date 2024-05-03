import mongoose from 'mongoose';
import { TASK_CATEGORIES, categorySubCategories } from './categoryModel.js';

// Enum for task status
export const TASK_STATUSES = [
  'PENDING',
  'ACCEPTED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
];

const TaskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  userId: {
    type: String,
    ref: 'User',
    required: true,
    validate: {
      validator: async function (userId) {
        const user = await mongoose.model('User').findOne({ id: userId });
        return !!user;
      },
      message: 'User with provided ID does not exist.',
    },
  },
  handymanId: {
    type: String,
    ref: 'Handyman',
    default: null,
    validate: {
      validator: async function (handymanId) {
        if (!handymanId) return true; // If handymanId is not provided, validation passes
        const handyman = await mongoose
          .model('Handyman')
          .findOne({ id: handymanId });
        return !!handyman;
      },
      message: 'Handyman with provided ID does not exist.',
    },
  },
  category: { type: String, required: true, enum: TASK_CATEGORIES },
  subCategories: {
    type: [String],
    validate: {
      validator: function (subCategories) {
        return subCategories.every((subCategory) =>
          categorySubCategories[this.category].includes(subCategory)
        );
      },
      message:
        'The selected Subcategory is not a valid subcategory for the selected category.',
    },
  },
  description: { type: String, maxlength: 255, default: '' },
  address: { type: String, required: true, default: '' },
  budget: { type: Number, required: true },
  price: { type: Number, required: false, default: null },
  duration: { type: Number, required: true },
  scheduledDate: { type: Date, default: Date.now },
  scheduledTime: { type: Date, default: Date.now },
  taskStatus: { type: String, enum: TASK_STATUSES, default: TASK_STATUSES[0] }, // Enum for task status with default value
  createdAt: { type: Date, default: Date.now },
});

// Pre-save hook
TaskSchema.pre('save', function (next) {
  if (this.isNew) {
    // Add default values or perform other operations
  }
  next();
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;
