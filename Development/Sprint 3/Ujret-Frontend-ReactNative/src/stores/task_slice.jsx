// task_slice.js

// {
//     "taskId": "b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1",
//     "category": "TAILOR",
//     "subCategories": ["EMBROIDERY"],
//     "description": "mirza saab ka kaam 2",
//     "address": "room 332",
//     "budget": 100,
//     "duration": 1,
//    "taskStatus": "PENDING",
//    "createdAt": "2021-07-07T12:00:00.000Z",
//    "serviceSeekerId": "acd23d50-afb9-5e74-804c-a36dc5776977",
//    "serviceSeekerName": "Mirza Saab",
//    "serviceSeekerPhoneNumber": "1234567890",
//    "bidId": "b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1",
//    "price": 900,
//    "bidDescription": "mirza saab ka kaam 2",
//    "handymanId": "acd23d50-afb9-5e74-804c-a36dc5776977",
//    "handymanName": "Mirza Saab",
//    "handymanPhoneNumber": "1234567890",
// }

import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the initial state of the task slice
const initialState = {
  taskInfo: {
    taskId: null,
    category: null,
    subCategories: null,
    description: null,
    address: null,
    budget: null,
    duration: null,
    taskStatus: null,
    createdAt: null,
    serviceSeekerId: null,
    serviceSeekerName: null,
    serviceSeekerPhoneNumber: null,
    bidId: null,
    price: null,
    bidDescription: null,
    handymanId: null,
    handymanName: null,
    handymanPhoneNumber: null,
  },
};

// Create the task slice using createSlice
export const taskSlice = createSlice({
  name: 'task', // The name of the slice
  initialState, // The initial state of the slice
  reducers: {
    // Define reducers that will update the state
    setTask: (state, action) => {
      state.taskInfo = action.payload;
      AsyncStorage.setItem('taskInfo', JSON.stringify(action.payload));
    },
    clearTask: state => {
      state.taskInfo = initialState.taskInfo; // Reset taskInfo to initial state
      AsyncStorage.removeItem('taskInfo');
    },
  },
});

// Extract the action creators
export const {setTask, clearTask} = taskSlice.actions;

// Export the reducer, which will be used in the store configuration
export default taskSlice.reducer;
