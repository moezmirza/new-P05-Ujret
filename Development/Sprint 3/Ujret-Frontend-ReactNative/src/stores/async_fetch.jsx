// // user_slice.js

// import {createSlice} from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Define the initial state of the user's slice of the store
// const initialState = {
//   userInfo: null,
//   // serviceStatus: {
//   //   // This will hold the online/offline service status of the user
//   //   handyman: false,
//   //   carpool: false,
//   // },
// };

// // Define an asynchronous action creator to fetch user info from AsyncStorage
// export const fetchUserFromAsync = () => async dispatch => {
//   try {
//     const userInfoString = await AsyncStorage.getItem('userInfo');
//     if (userInfoString) {
//       const userInfo = JSON.parse(userInfoString);
//       dispatch(setUser(userInfo)); // Dispatch setUser action with the retrieved userInfo
//     }
//   } catch (error) {
//     console.error('Error fetching user info from Async Storage:', error);
//   }
// };

// // Use createSlice to create a slice, which generates action creators and action types
// export const userSlice = createSlice({
//   name: 'user', // The name of the slice
//   initialState, // The initial state of the slice
//   reducers: {
//     // Define reducers that will update the state
//     setUser: (state, action) => {
//       state.userInfo = action.payload;
//       AsyncStorage.setItem('userInfo', JSON.stringify(action.payload));
//     },
//     clearUser: state => {
//       state.userInfo = null;
//       AsyncStorage.removeItem('userInfo');
//     },
//   },
// });

// export const {setUser, clearUser} = userSlice.actions;

// // Export the reducer, which will be used in the store configuration
// export default userSlice.reducer;

// Define an asynchronous action creator to fetch user info from AsyncStorage
export const fetchUserFromAsync = async () => {
  try {
    const userInfoString = await AsyncStorage.getItem('userInfo');
    if (userInfoString) {
      const _userInfo = JSON.parse(userInfoString);
      console.log('fetchUserFromAsync log:\n', _userInfo);
      return _userInfo;
      // dispatch(setUser(userInfo)); // Dispatch setUser action with the retrieved userInfo
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
