// React and React Native imports
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

// Component imports
import LogoImage from '../components/atoms/image_container/logo_image';
import ShapeContainer from '../components/molecules/splash_screen_triangles';

// Styles
import {screenContainerStyle, logoImageStyle} from '../themes/styles';

// Redux
import {useDispatch} from 'react-redux';

// Fetch Data in initialize app
import {initializeApp} from '../utils/initialize';

const SplashScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  console.log('SplashScreen loading:', loading);

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const {hasCompletedOnboarding, userInfo, handymanInfo} =
            await initializeApp(dispatch);
          navigateThroughScreens(
            hasCompletedOnboarding,
            userInfo,
            handymanInfo,
          );
        } catch (error) {
          console.error('Error initializing app:', error);
          // Handle error, e.g., show an error message
        }
        // finally {
        //   setLoading(false);
        // }
      };

      fetchData();
    }, []),
  );

  // Function to navigate based on onboarding status
  const navigateThroughScreens = async (
    hasCompletedOnboarding,
    userInfo,
    handymanInfo,
  ) => {
    if (hasCompletedOnboarding === 'true') {
      if (userInfo) {
        // console.log('userInfo.firebaseUid: ', userInfo.firebaseUid);
        navigation.navigate(userInfo.firebaseUid ? 'Ujret' : 'login');
      } else {
        navigation.navigate('registration');
      }
    } else {
      navigation.navigate('Onboarding1');
    }
  };

  // if (loading) {
  return (
    <View style={{...screenContainerStyle, overflow: 'hidden'}}>
      <LogoImage
        source={require('../assets/images/Logos.png')}
        style={logoImageStyle}
      />
      <ShapeContainer />
    </View>
  );
  // }

  // return null; // Render nothing once loading is complete
};

export default SplashScreen;

// // React and React Native imports
// import React, {useEffect, useState} from 'react';
// import {Alert, View} from 'react-native';
// import {useFocusEffect} from '@react-navigation/native';

// // Component imports
// import LogoImage from '../components/atoms/image_container/logo_image';
// import ShapeContainer from '../components/molecules/splash_screen_triangles';

// // Styles
// import {screenContainerStyle, logoImageStyle} from '../themes/styles';

// // AsyncStorage for local storage
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Redux
// import {useDispatch} from 'react-redux';
// import {setUser} from '../stores/user_slice';
// import {setHandyman} from '../stores/handyman_slice';
// import {setHandymenCategories} from '../stores/handymen_categories_slice';

// // API call
// import {getHandymenCategories} from '../api_layer/handymen_apis';

// // Component definition
// const SplashScreen = ({navigation}) => {
//   // State initialization
//   const [categories, setCategories] = useState([]);
//   const [user_, setUser_] = useState(null);
//   const [handyman_, setHandyman_] = useState(null);
//   const [pageReloaded, setPageReloaded] = useState(false); // Track if the page has been reloaded
//   const [reload, setReload] = useState(false); // Track if the page has been reloaded

//   // Redux dispatcher
//   const dispatch = useDispatch();

//   //
//   useFocusEffect(() => {
//     console.log('UseFocusEffect Called ...');
//     setPageReloaded(false);
//   });

//   // Fetching categories, user info, and onboarding status from AsyncStorage
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [
//           categoryData,
//           userInfoString,
//           handymanInfoString,
//           hasCompletedOnboarding,
//         ] = await Promise.all([
//           getHandymenCategories(),
//           AsyncStorage.getItem('userInfo'),
//           AsyncStorage.getItem('handymanInfo'),
//           AsyncStorage.getItem('hasCompletedOnboarding'),
//         ]);

//         // Setting categories in state and Redux store
//         setCategories(categoryData);
//         dispatch(setHandymenCategories(categoryData));

//         // Processing user info from AsyncStorage
//         if (userInfoString) {
//           try {
//             const _userInfo = JSON.parse(userInfoString);
//             setUser_(_userInfo);
//             dispatch(setUser(_userInfo));
//             console.log('User info Dispatched ...');
//           } catch (parseError) {
//             setUser_(null);
//             dispatch(setUser(null));
//             console.error('Error parsing user info:', parseError);
//           }
//         } else {
//           setUser_(null);
//           dispatch(setUser(null));
//           console.log('No user info found in AsyncStorage');
//         }

//         // Processing handyman info from AsyncStorage
//         if (handymanInfoString) {
//           try {
//             const _handymanInfo = JSON.parse(handymanInfoString);
//             setHandyman_(_handymanInfo);
//             dispatch(setHandyman(_handymanInfo));
//             console.log('Handyman info Dispatched ...');
//           } catch (parseError) {
//             setHandyman_(null);
//             dispatch(setHandyman(null));
//             console.error('Error parsing user info:', parseError);
//           }
//         } else {
//           setHandyman_(null);
//           dispatch(setHandyman(null));
//           console.log('No handyman info found in AsyncStorage');
//         }

//         // Navigating based on onboarding status
//         if (!pageReloaded) {
//           setPageReloaded(true); // Set pageReloaded to true after the first render
//         } else {
//           console.log('Stuck here:', pageReloaded);
//           navigateThroughScreens(hasCompletedOnboarding); // Call navigateThroughScreens after the page reloads
//         }
//       } catch (error) {
//         setUser_(null);
//         dispatch(setUser(null));
//         Alert.alert('Error', error.message);
//       }
//     };

//     console.log('UseEffect Called ...');

//     // Call fetchData function
//     fetchData();
//   }, [navigation, pageReloaded]); // Add pageReloaded to the dependencies array

//   // Function to navigate based on onboarding status
//   const navigateThroughScreens = async hasCompletedOnboarding => {
//     if (hasCompletedOnboarding === 'true') {
//       if (user_) {
//         navigation.navigate(user_.firebaseUid ? 'Ujret' : 'login');
//       } else {
//         navigation.navigate('registration');
//       }
//     } else {
//       navigation.navigate('Onboarding1');
//     }
//   };

//   // Rendering UI
//   return (
//     <View style={{...screenContainerStyle, overflow: 'hidden'}}>
//       <LogoImage
//         source={require('../assets/images/Logos.png')}
//         style={logoImageStyle}
//       />
//       <ShapeContainer />
//     </View>
//   );
// };

// // Exporting the component
// export default SplashScreen;
