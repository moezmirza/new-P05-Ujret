// user_slice.js

import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the initial state of the user's slice of the store
const initialState = {
  userInfo: null,
};

// Use createSlice to create a slice, which generates action creators and action types
export const userSlice = createSlice({
  name: 'user', // The name of the slice
  initialState, // The initial state of the slice
  reducers: {
    // Define reducers that will update the state
    setUser: (state, action) => {
      state.userInfo = action.payload;
      AsyncStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    clearUser: state => {
      state.userInfo = null;
      AsyncStorage.removeItem('userInfo');
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;

// Export the reducer, which will be used in the store configuration
export default userSlice.reducer;
