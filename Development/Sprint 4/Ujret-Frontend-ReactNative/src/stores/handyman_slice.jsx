// handyman_slice.js

import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  handymanInfo: null,
};

export const handymanSlice = createSlice({
  name: 'handyman',
  initialState,
  reducers: {
    setHandyman: (state, action) => {
      state.handymanInfo = action.payload;
      AsyncStorage.setItem('handymanInfo', JSON.stringify(action.payload));
    },
    clearHandyman: state => {
      state.handymanInfo = null;
      AsyncStorage.removeItem('handymanInfo');
    },
  },
});

export const {setHandyman, clearHandyman} = handymanSlice.actions;

export default handymanSlice.reducer;
