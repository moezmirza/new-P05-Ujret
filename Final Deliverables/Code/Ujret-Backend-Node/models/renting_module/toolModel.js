import mongoose from 'mongoose';

export const RENTING_STATUSES = ['AVAILABLE', 'NOT_AVAILABLE'];
export const TOOL_CATEGORIES = [
  'POWER_TOOLS',
  'HAND_TOOLS',
  'GARDENING',
  'CONSTRUCTION',
  'AUTOMOTIVE',
  'PAINTING',
  'ELECTRICAL',
  'PLUMBING',
  'WOODWORKING',
  'METALWORKING',
  'CLEANING',
  'DECORATING',
  'ELECTRONIC',
  'MEASUREMENT',
  'SAFETY_EQUIPMENT',
  'OTHER',
];

const ToolSchema = new mongoose.Schema({
  id: { type: String, required: true },
  renterId: {
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
  title: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String },
  rent: { type: Number, required: true },
  status: {
    type: String,
    enum: RENTING_STATUSES,
    default: RENTING_STATUSES[0],
  },
  createdAt: { type: Date, default: Date.now },
  imgURLs: { type: [String], default: [] },
  category: {
    type: String,
    required: true,
    enum: TOOL_CATEGORIES,
    default: 'OTHER',
  },
});

const Tool = mongoose.model('Tool', ToolSchema);
export default Tool;
