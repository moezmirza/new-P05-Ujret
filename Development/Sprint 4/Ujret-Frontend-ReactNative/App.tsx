// import React from 'react';
// import { View, Image, StyleSheet, Dimensions } from 'react-native';

// const window = Dimensions.get('window');

// const SplashScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('./src/assets/images/Logos.png')}
//         style={styles.logo}
//       />
//       <View style={styles.shapeContainer}>
//         <View style={styles.triangleLeft} />
//         <View style={styles.triangleRight} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0D5C5E', // Use the exact color of your splash background
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     width: window.width * 0.4, // Adjust the width as per your logo's aspect ratio
//     height: window.width * 0.4, // Adjust the height as per your logo's aspect ratio
//     resizeMode: 'contain',
//   },
//   shapeContainer: {
//     position: 'absolute',
//     bottom: 0,
//     width: window.width,
//   },
//   triangleLeft: {
//     width: 0,
//     height: 0,
//     backgroundColor: 'transparent',
//     borderStyle: 'solid',
//     borderRightWidth: window.width / 1.5,
//     borderTopWidth: window.width / 2,
//     borderRightColor: 'transparent',
//     borderTopColor: '#0A7A7B', // Adjust triangle color as needed
//     position: 'absolute',
//     left: 0,
//     transform: [{ translateY: -(window.width  * 0.2) }], // Adjust to match the slope of your design
//   },
//   triangleRight: {
//     width: 0,
//     height: 0,
//     backgroundColor: 'transparent',
//     borderStyle: 'solid',
//     borderLeftWidth: window.width / 2,
//     borderTopWidth: window.width / 2,
//     borderLeftColor: 'transparent',
//     borderTopColor: '#0A7A7B', // Adjust triangle color as needed
//     position: 'absolute',
//     right: 0,
//     transform: [{ translateY: -(window.width / 3 * 1.6) }], // Adjust to match the slope of your design
//   },
// });

// export default SplashScreen;

// import React from 'react';
// import { View, Dimensions } from 'react-native';
// import LogoImage from './src/components/atoms/image_container/logo_image';
// import ShapeContainer from './src/components/molecules/splash_screen_triangles';
// import { screenContainerStyle, logoImageStyle } from './src/themes/styles';

// const SplashScreen = () => {
//   return (
//     <View style={screenContainerStyle}>
//       <LogoImage
//         source={require('./src/assets/images/Logos.png')}
//         style={logoImageStyle}
//       />
//       <ShapeContainer />
//     </View>
//   );
// };

// export default SplashScreen;

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from './src/screens/splash_screen';
// // Import other screens here as well

// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash">
//         {/* Stack.Screen for each screen in your app */}
//         <Stack.Screen
//           name="Splash"
//           component={SplashScreen}
//           options={{ headerShown: false }}
//         />
//         {/* Define other screens here, e.g., HomeScreen, DetailsScreen, etc. */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

// import React from 'react';
// // import SplashScreen from '../Front_End_React_Native/src/screens/splash_screen';
// // import OnboardingScreen1 from '../Front_End_React_Native/src/screens/onboarding_screen1';
// // import OnboardingScreen3 from '../Front_End_React_Native/src/screens/onboarding_screen3';
// import OnboardingScreen2 from '../Front_End_React_Native/src/screens/onboarding_screen2';

// const App = () => {
//   // return <OnboardingScreen />;
//   // return <OnboardingScreen1 />;
//   // return <OnboardingScreen3 />;

//   return <OnboardingScreen2 />;
// };

// export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigations/stack_navigator';
import { Provider } from 'react-redux';
import { store, persistor } from './src/stores/store';
import { PersistGate } from 'redux-persist/integration/react';
import './src/firebase_config/firebase_config';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
