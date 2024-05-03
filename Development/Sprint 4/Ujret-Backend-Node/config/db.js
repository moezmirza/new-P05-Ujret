import mongoose from 'mongoose';
import { categorySubCategories } from '../models/handymen_module/categoryModel.js';

const mongoConnectionURL = process.env.MONGO_URL;

const ensureCategories = async () => {
  for (const [category, subCategories] of Object.entries(categorySubCategories)) {
    await mongoose.models.Category.findOneAndUpdate(
      { name: category },
      { $set: { subCategories: subCategories }},
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
  console.log('Categories and subcategories have been ensured.');
};

export const mongo = mongoose.connect(mongoConnectionURL)
  .then(() => {
    console.log('Database mongoDb connected');
    ensureCategories();  // Ensure categories after connection
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
