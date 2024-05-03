// React and React Native imports
import React from 'react';
import {ScrollView, View} from 'react-native';

// Component imports
import OnboardingContent from '../components/molecules/intro_screen_content';
import LogoImage from '../components/atoms/image_container/logo_image';
import PaginationIndicator from '../components/molecules/pagination_indicator';
import LargeBtn from '../components/atoms/buttons/large_btn';
import TopBackStrip from '../components/molecules/top_back_button_strip';

// Styles
import {
  onboardingStyles,
  onBoardingImage,
  registerMoreInfoScreenStyle,
} from '../themes/styles';

// Strings
import {Strings} from '../stores/constant';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Component definition
const OnboardingScreen3 = ({navigation}) => {
  // Function to mark onboarding as complete
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      navigation.navigate('registration');
    } catch (error) {
      console.error('Error setting onboarding flag:', error);
    }
  };

  // Rendering UI
  return (
    <ScrollView contentContainerStyle={onboardingStyles.container}>
      {/* Top back button strip */}
      <TopBackStrip navigation={navigation} lastScreen={'Onboarding2'} />
      {/* Logo image */}
      <LogoImage
        source={require('../assets/images/onboardingimage3.png')}
        style={onBoardingImage}
      />
      {/* Onboarding content */}
      <OnboardingContent
        headerText={Strings.onBoarding3Screen.headerText}
        subHeaderText={Strings.onBoarding3Screen.subHeaderText}
      />
      {/* Pagination indicator */}
      <PaginationIndicator currentIndex={2} totalCount={3} />
      <View style={registerMoreInfoScreenStyle.buttonsContainer}>
        {/* Large button for completing onboarding */}
        <LargeBtn
          variant={'action'}
          text={Strings.onBoarding3Screen.onboarding3ButtonText}
          onPress={completeOnboarding}
        />
      </View>
    </ScrollView>
  );
};

// Exporting the component
export default OnboardingScreen3;

// import React, {useEffect} from 'react';
// import {SafeAreaView, ScrollView, View} from 'react-native';
// import OnboardingContent from '../components/molecules/intro_screen_content';
// import LogoImage from '../components/atoms/image_container/logo_image';
// import PaginationIndicator from '../components/molecules/pagination_indicator';
// import PrimaryButton from '../components/atoms/buttons/primary_button';
// import {onboardingStyles, onBoardingImage} from '../themes/styles';
// import TopBackStrip from '../components/molecules/top_back_button_strip';
// import {Strings} from '../stores/constant';
// import {useDispatch} from 'react-redux';
// import {completeOnboarding} from '../stores/user_slice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import LargeBtn from '../components/atoms/buttons/large_btn';
// import {registerMoreInfoScreenStyle} from '../themes/styles';

// const OnboardingScreen3 = ({navigation}) => {
//   const completeOnboarding = async () => {
//     try {
//       await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
//       navigation.navigate('registration');
//     } catch (error) {
//       console.error('Error setting onboarding flag:', error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={onboardingStyles.container}>
//       <TopBackStrip navigation={navigation} lastScreen={'Onboarding2'} />
//       <LogoImage
//         source={require('../assets/images/onboardingimage3.png')}
//         style={onBoardingImage}
//       />
//       <OnboardingContent
//         headerText={Strings.onBoarding3Screen.headerText}
//         subHeaderText={Strings.onBoarding3Screen.subHeaderText}
//       />
//       <PaginationIndicator currentIndex={2} totalCount={3} />
//       <View style={registerMoreInfoScreenStyle.buttonsContainer}>
//         <LargeBtn
//           variant={'action'}
//           text={Strings.onBoarding3Screen.onboarding3ButtonText}
//           onPress={completeOnboarding}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// export default OnboardingScreen3;
