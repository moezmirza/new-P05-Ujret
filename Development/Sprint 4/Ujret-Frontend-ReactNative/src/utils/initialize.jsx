// In a separate module, e.g., src/utils/init.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getHandymenCategories} from '../api_layer/handymen_apis';
import {setUser} from '../stores/user_slice';
import {setHandyman} from '../stores/handyman_slice';
import {setHandymenCategories} from '../stores/handymen_categories_slice';

export const initializeApp = async dispatch => {
  try {
    const [
      categoryData,
      userInfoString,
      handymanInfoString,
      hasCompletedOnboarding,
    ] = await Promise.all([
      getHandymenCategories(),
      AsyncStorage.getItem('userInfo'),
      AsyncStorage.getItem('handymanInfo'),
      AsyncStorage.getItem('hasCompletedOnboarding'),
    ]);

    dispatch(setHandymenCategories(categoryData));

    const userInfo = JSON.parse(userInfoString);
    const handymanInfo = JSON.parse(handymanInfoString);

    if (userInfo) {
      dispatch(setUser(userInfo));
      console.log('userInfo in initialize App:\n', userInfo);
    }

    if (handymanInfo) {
      dispatch(setHandyman(handymanInfo));
    }

    console.log(
      'hasCompletedOnboarding in initialize App:\n',
      hasCompletedOnboarding === 'true',
    );

    return {hasCompletedOnboarding, userInfo, handymanInfo};
  } catch (error) {
    throw error;
  }
};

// export default initializeApp;
