import mongoose from 'mongoose';

// Enum for Bid status
export const BID_STATUSES = ['PENDING', 'ACCEPTED', 'DECLINED'];

const BidSchema = new mongoose.Schema({
  id: { type: String, required: true },
  taskId: {
    type: String,
    ref: 'Task',
    required: true,
    validate: {
      validator: async function (taskId) {
        const task = await mongoose.model('Task').findOne({ id: taskId });
        return !!task;
      },
      message: 'Task with provided ID for Bid does not exist.',
    },
  },
  handymanId: {
    type: String,
    ref: 'Handyman',
    required: true,
    validate: {
      validator: async function (handymanId) {
        const handyman_user = await mongoose
          .model('Handyman')
          .findOne({ id: handymanId });
        return !!handyman_user;
      },
      message: 'Handyman with provided ID for Bid does not exist.',
    },
  },
  amount: { type: Number, required: true },
  description: { type: String, maxlength: 255, default: '' },
  bidStatus: { type: String, enum: BID_STATUSES, default: BID_STATUSES[0] },
  createdAt: { type: Date, default: Date.now },
});

// Pre-save hook
BidSchema.pre('save', function (next) {
  if (this.isNew) {
    // Add default values or perform other operations
  }
  next();
});

const Bid = mongoose.model('Bid', BidSchema);

export default Bid;
