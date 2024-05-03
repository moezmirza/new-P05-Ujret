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

// Component definition
const OnboardingScreen = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={onboardingStyles.container}>
      {/* Top back button strip */}
      <TopBackStrip navigation={navigation} lastScreen={'Splash'} />
      {/* Logo image */}
      <LogoImage
        source={require('../assets/images/onboardingimage1.png')}
        style={onBoardingImage}
      />
      {/* Onboarding content */}
      <OnboardingContent
        headerText={Strings.onBoarding1Screen.headerText}
        subHeaderText={Strings.onBoarding1Screen.subHeaderText}
      />
      {/* Pagination indicator */}
      <PaginationIndicator currentIndex={0} totalCount={3} />
      <View style={registerMoreInfoScreenStyle.buttonsContainer}>
        {/* Large button for navigation */}
        <LargeBtn
          variant={'action'}
          text={Strings.onBoarding1Screen.onboarding1ButtonText}
          onPress={() => navigation.navigate('Onboarding2')}
        />
      </View>
    </ScrollView>
  );
};

// Exporting the component
export default OnboardingScreen;

// import React from 'react';
// import {SafeAreaView, ScrollView, View} from 'react-native';
// import OnboardingContent from '../components/molecules/intro_screen_content';
// import LogoImage from '../components/atoms/image_container/logo_image';
// import PaginationIndicator from '../components/molecules/pagination_indicator';
// import PrimaryButton from '../components/atoms/buttons/primary_button';
// import LargeBtn from '../components/atoms/buttons/large_btn';
// import {registerMoreInfoScreenStyle} from '../themes/styles';

// import {onboardingStyles, onBoardingImage, backArrow} from '../themes/styles';
// import TopBackStrip from '../components/molecules/top_back_button_strip';
// import {Strings} from '../stores/constant';

// const OnboardingScreen = ({navigation}) => {
//   return (
//     <ScrollView contentContainerStyle={onboardingStyles.container}>
//       <TopBackStrip navigation={navigation} lastScreen={'Splash'} />
//       <LogoImage
//         source={require('../assets/images/onboardingimage1.png')}
//         style={onBoardingImage}
//       />
//       <OnboardingContent
//         headerText={Strings.onBoarding1Screen.headerText}
//         subHeaderText={Strings.onBoarding1Screen.subHeaderText}
//       />
//       <PaginationIndicator currentIndex={0} totalCount={3} />
//       <View style={registerMoreInfoScreenStyle.buttonsContainer}>
//         <LargeBtn
//           variant={'action'}
//           text={Strings.onBoarding1Screen.onboarding1ButtonText}
//           onPress={() => navigation.navigate('Onboarding2')}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// export default OnboardingScreen;
