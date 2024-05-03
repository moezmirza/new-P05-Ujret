// handymen_categories_slicer.js

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  categories: [],
};

const handymenCategoriesSlice = createSlice({
  name: 'handymenCategories',
  initialState,
  reducers: {
    setHandymenCategories: (state, action) => {
      state.categories = action.payload;
    },
    clearHandymenCategories: state => {
      state.categories = [];
    },
  },
});

export const {setHandymenCategories, clearHandymenCategories} =
  handymenCategoriesSlice.actions;

export const selectHandymenCategories = state =>
  state.handymenCategories.categories;

export default handymenCategoriesSlice.reducer;
