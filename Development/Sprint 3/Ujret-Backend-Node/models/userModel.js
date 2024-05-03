import mongoose from 'mongoose';

const GENDER_TYPES = ['MALE', 'FEMALE', 'OTHER'];

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  cnic: { type: String, maxlength: 15, default: null },
  gender: { type: String, enum: GENDER_TYPES, default: 'OTHER' },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  services: { type: [String] },
  otp: {
    type: String,
    required: true,
    default: Math.floor(1000 + Math.random() * 9999).toString(),
  },
  phoneNumberVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Pre-save hook
UserSchema.pre('save', function (next) {
  if (this.isNew) {
    // Add default values or perform other operations
    this.otp = Math.floor(1000 + Math.random() * 9999).toString();
  }
  next();
});

const User = mongoose.model('User', UserSchema);

export default User;
