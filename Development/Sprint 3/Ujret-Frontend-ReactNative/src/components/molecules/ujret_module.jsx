// import React from 'react';
import {Pressable, TouchableOpacity, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// styles and constants
import {ujretStyles, H3MainStyles} from '../../themes/styles';
import {Metrics} from '../../themes/metrics';

// components
import LogoImage from '../atoms/image_container/logo_image';
import H3Main from '../atoms/headings/h3_main';

// UjretModule component
const UjretModule = ({navigation, nextScreen, moduleName, imageSrc}) => {
  // const props = {navigation, nextScreen, moduleName, imageSrc};
  const navigateTo = () => navigation.navigate(nextScreen);

  const gradientColors =
    // moduleName === 'Handymen' || moduleName === 'Tool Renting'
    //   ? ujretStyles.moduleCon.gradientColors
    //   : ujretStyles.moduleCon.grayStyleGradientColors;
    ujretStyles.moduleCon.gradientColors;

  const opacityValue =
    moduleName === 'Handymen' || moduleName === 'Tool Renting' ? 1 : 1;

  return (
    <Pressable onPress={navigateTo}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        locations={[0, 0.6]}
        colors={gradientColors}
        style={ujretStyles.moduleCon.styles}>
        <LogoImage
          // source={require(`../../assets/images/moduleImg1.png`)}
          source={
            imageSrc ? imageSrc : require(`../../assets/images/moduleImg1.png`)
          }
          style={{
            ...ujretStyles.moduleImage,
            opacity: opacityValue,
          }}
        />
        <Text
          style={{
            ...H3MainStyles.textStyle,
            color: '#fffffc',
            marginTop: 0.01 * Metrics.screenHeight,
            // opacity: opacityValue + 0.3,
          }}>
          {moduleName}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

UjretModule.defaultProps = {
  nextScreen: 'Splash',
  moduleName: 'UjretModule',
  imageSrc: null,
};

export default UjretModule;
