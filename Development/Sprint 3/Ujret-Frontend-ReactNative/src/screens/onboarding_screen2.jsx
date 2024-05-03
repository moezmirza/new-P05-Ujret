// React and React Native imports
import React from 'react';
import {ScrollView, View} from 'react-native';

// Component imports
import OnboardingContent from '../components/molecules/intro_screen_content';
import LogoImage from '../components/atoms/image_container/logo_image';
import PaginationIndicator from '../components/molecules/pagination_indicator';
import LargeBtn from '../components/atoms/buttons/large_btn';
import TopBackStrip from '../components/molecules/top_back_button_strip';

// Strings
import {Strings} from '../stores/constant';

// Styles
import {
  onBoardingImage,
  onboardingStyles,
  registerMoreInfoScreenStyle,
} from '../themes/styles';

// Component definition
const OnboardingScreen2 = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={onboardingStyles.container}>
      {/* Top back button strip */}
      <TopBackStrip navigation={navigation} lastScreen={'Onboarding1'} />
      {/* Logo image */}
      <LogoImage
        source={require('../assets/images/onboardingimage2.png')}
        style={onBoardingImage}
      />
      {/* Onboarding content */}
      <OnboardingContent
        headerText={Strings.onBoarding2Screen.headerText}
        subHeaderText={Strings.onBoarding2Screen.subHeaderText}
      />
      {/* Pagination indicator */}
      <PaginationIndicator currentIndex={1} totalCount={3} />

      <View style={registerMoreInfoScreenStyle.buttonsContainer}>
        {/* Large button for navigation */}
        <LargeBtn
          variant={'action'}
          text={Strings.onBoarding2Screen.onboarding2ButtonText}
          onPress={() => navigation.navigate('Onboarding3')}
        />
      </View>
    </ScrollView>
  );
};

// Exporting the component
export default OnboardingScreen2;

// import React from 'react';
// import {ScrollView, View, Alert} from 'react-native';
// import {useSelector} from 'react-redux';
// import OnboardingContent from '../components/molecules/intro_screen_content';
// import LogoImage from '../components/atoms/image_container/logo_image';
// import PaginationIndicator from '../components/molecules/pagination_indicator';
// import PrimaryButton from '../components/atoms/buttons/primary_button';
// import TopBackStrip from '../components/molecules/top_back_button_strip';
// import {Strings} from '../stores/constant';
// import {onBoardingImage} from '../themes/styles';
// import {onboardingStyles} from '../themes/styles';
// import LargeBtn from '../components/atoms/buttons/large_btn';
// import {registerMoreInfoScreenStyle} from '../themes/styles';

// const OnboardingScreen2 = ({navigation}) => {
//   return (
//     <ScrollView contentContainerStyle={onboardingStyles.container}>
//       <TopBackStrip navigation={navigation} lastScreen={'Onboarding1'} />
//       <LogoImage
//         source={require('../assets/images/onboardingimage2.png')}
//         style={onBoardingImage}
//       />
//       <OnboardingContent
//         headerText={Strings.onBoarding2Screen.headerText}
//         subHeaderText={Strings.onBoarding2Screen.subHeaderText}
//       />
//       <PaginationIndicator currentIndex={1} totalCount={3} />

//       <View style={registerMoreInfoScreenStyle.buttonsContainer}>
//         <LargeBtn
//           variant={'action'}
//           text={Strings.onBoarding2Screen.onboarding2ButtonText}
//           onPress={() => navigation.navigate('Onboarding3')}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// export default OnboardingScreen2;
