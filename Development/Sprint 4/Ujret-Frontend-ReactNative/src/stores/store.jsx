// Store configuration

import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

// Reducers Slicers import
import userReducer from './user_slice';
import handymenCategoriesReducer from './handymen_categories_slice';
import handymanReducer from './handyman_slice'; // Import the handyman slice
import taskReducer from './task_slice'; // Import the task slice

// Configure Redux Persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'handymenCategories', 'handyman', 'task'], // Add task to persist
};

// Combine reducers
const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
  handymenCategories: persistReducer(persistConfig, handymenCategoriesReducer),
  handyman: persistReducer(persistConfig, handymanReducer),
  task: persistReducer(persistConfig, taskReducer), // Include task reducer
  // Add other reducers here if necessary
});

// Create Redux store
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

// Create persistor
export const persistor = persistStore(store);

export default {store, persistor};

// import {configureStore, combineReducers} from '@reduxjs/toolkit';
// import {persistStore, persistReducer} from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import thunk from 'redux-thunk';

// // Reducers Slicers import
// import userReducer from './user_slice';
// import handymenCategoriesReducer from './handymen_categories_slice';
// import handymanReducer from './handyman_slice'; // Import the handyman slice

// // Configure Redux Persist
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['user', 'handymenCategories', 'handyman'], // Add handyman to persist
// };

// // Combine reducers
// const rootReducer = combineReducers({
//   user: persistReducer(persistConfig, userReducer),
//   handymenCategories: persistReducer(persistConfig, handymenCategoriesReducer),
//   handyman: persistReducer(persistConfig, handymanReducer), // Include handyman reducer
//   // Add other reducers here if necessary
// });

// // Create Redux store
// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: [thunk],
// });

// // Create persistor
// // export const persistor = persistStore(store);
// export const persistor = persistStore(store);

// export default {store, persistor};
