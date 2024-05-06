import {Colors, ColorsLight} from './colors';
import {Fonts} from './fonts';
import {Metrics, Spacing} from './metrics';
import {StyleSheet, Platform, View} from 'react-native';

// All Headings styles - moez
export const H1XLargeStyles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 45,
    lineHeight: 43.2,
    color: ColorsLight.primaryGreen,
    textAlign: 'center',
    paddingTop: Spacing.small,
  },
});

export const H2LargeStyles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 35,
    lineHeight: 37.98,
    color: ColorsLight.primaryBlack,
    textAlign: 'center',
    paddingTop: Spacing.x_small,
  },
});

export const H3MainStyles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    lineHeight: 25.65,
    color: ColorsLight.primaryGreen,
    textAlign: 'center',
    paddingTop: Spacing.x_small,
  },
});

export const H4SubMainStyles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    // lineHeight: 20.14,
    color: ColorsLight.primaryBlack,
    textAlign: 'center',
    // paddingTop: Spacing.x_small,
  },
});

export const H5SmallStyles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: ColorsLight.primaryBlack,
    textAlign: 'center',
  },
});

export const H6XSmallStyles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: ColorsLight.primaryGreen,
    textAlign: 'center',
  },
});

export const H7XXSmallStyles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: ColorsLight.primaryGreen,
    textAlign: 'center',
  },
});

// All Paragraph styles - moez
export const P1LargeStyles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: ColorsLight.grey2,
    textAlign: 'center',
  },
});

export const P2MainStyles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14.5,
    lineHeight: 16.67,
    color: ColorsLight.grey2,
    paddingTop: Spacing.xx_small,
  },
});

export const P3SmallStyles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: ColorsLight.grey2,
  },
});

export const P4XSmallStyles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: ColorsLight.grey2,
    textAlign: 'center',
  },
});

// Buttons Styles
export const buttonsStyles = StyleSheet.create({
  large_btn: {
    sizing: {
      borderRadius: Metrics.buttonRadius,
      paddingVertical: Metrics.large_btnPaddingVertical,
      paddingHorizontal: Metrics.large_btnPaddingHorizontal,
      width: Metrics.large_btnWidth,
    },
    action: {
      styles: {
        backgroundColor: ColorsLight.primaryGreen,
        borderWidth: 1,
        borderColor: ColorsLight.primaryGreen,
        shadowColor: ColorsLight.grey2,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      textStyle: {
        ...H5SmallStyles.textStyle,
        color: ColorsLight.primaryWhite,
      },
    },
    secondary: {
      styles: {
        backgroundColor: ColorsLight.green4,
        borderWidth: 1,
        borderColor: ColorsLight.green4,
        shadowColor: ColorsLight.grey2,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      textStyle: {
        ...H5SmallStyles.textStyle,
        color: ColorsLight.primaryGreen,
      },
    },
    ghost: {
      styles: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        // borderWidth: 1,
        // borderColor: 'rgba(255, 255, 255, 0)',
        // shadowColor: ColorsLight.grey2,
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
      },
      textStyle: {
        ...H5SmallStyles.textStyle,
        color: ColorsLight.grey1,
      },
    },
    cancel: {
      styles: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderWidth: 1,
        borderColor: ColorsLight.red1,
      },
      textStyle: {
        ...H5SmallStyles.textStyle,
        color: ColorsLight.red1,
      },
    },
  },
});

export const screenContainerStyle = {
  flex: 1,
  backgroundColor: ColorsLight.primaryGreen,
  alignItems: 'center',
  justifyContent: 'center',
};

export const screenContainerStyleWhite = {
  // flex: 1,
  backgroundColor: ColorsLight.primaryWhite,
  alignItems: 'center',
  justifyContent: 'center',
};

export const fullScreenWhite = {
  backgroundColor: ColorsLight.primaryWhite,
  height: '100%',
  alignItems: 'center',
};

export const logoImageStyle = {
  width: Metrics.logoWidth,
  height: Metrics.logoHeight,
  resizeMode: 'contain',
  marginBottom: Spacing.x_large,
};
export const onBoardingImage = {
  marginTop: Spacing.large,
  width: Metrics.onboardingImageWidth,
  height: Metrics.onboardingImageHeight,
  resizeMode: 'contain',
};

export const ShapeContainerStyles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    overflow: 'hidden',
  },
  rightShape: {
    backgroundColor: '#0b4d4e',
    height: Metrics.screenHeight * 0.5,
    width: Metrics.screenWidth * 1.5,
    transform: [{rotate: '-44.62deg'}],
    position: 'absolute',
    bottom: -(Metrics.screenHeight * 0.5) / 3,
    right: -(Metrics.screenWidth * 1.5) / 2,
  },
  leftShape: {
    backgroundColor: '#0A7A7B',
    height: Metrics.screenHeight * 0.5,
    width: Metrics.screenWidth * 1.5,
    transform: [{rotate: '44.62deg'}],
    position: 'absolute',
    bottom: -(Metrics.screenHeight * 0.5) / 3,
    left: -(Metrics.screenWidth * 1.5) / 2,
  },
});

export const onboardingStyles = {
  container: {
    flex: 1,
    alignItems: 'center',
    padding: Metrics.basePadding,
    backgroundColor: ColorsLight.primaryWhite,
  },
  button: {
    marginTop: Spacing.large,
    margin: Metrics.baseMargin,
    borderRadius: Metrics.buttonRadius,
    paddingVertical: Metrics.mediumPadding,
    paddingHorizontal: Metrics.basePadding,
    backgroundColor: ColorsLight.primaryGreen,
    width: Metrics.screenWidth * 0.8,
    borderWidth: 2,
    borderColor: ColorsLight.grey2,
    shadowColor: ColorsLight.grey2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  headerOuter: {alignItems: 'center'},
  headerInner: {
    width: '100%',
    marginTop: Metrics.screenHeight * 0.01,
    paddingHorizontal: Metrics.screenWidth * 0.1,
  },
};
export const headerTextStyle = StyleSheet.create({
  textStyle: {
    ...Fonts.style.header,
    color: ColorsLight.primaryBlack,
    padding: Spacing.small,
    textAlign: 'center',
    paddingHorizontal: Spacing.medium,
  },
});
export const subHeaderTextStyle = StyleSheet.create({
  textStyle: {
    ...Fonts.style.subHeader,
    color: ColorsLight.primaryBlack,
    textAlign: 'center',
    paddingHorizontal: Spacing.medium,
  },
});
export const mediumHeaderTextStyle = StyleSheet.create({
  textStyle: {
    ...Fonts.style.midheader,
    color: Colors.background,
    textAlign: 'center',
    paddingHorizontal: Spacing.medium,
  },
});

export const backArrow = StyleSheet.create({
  backButton: {
    top: 10,
    zIndex: 10,
  },
  backArrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
export const TopBackStripStyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'fixed',
    top: 0,
    zIndex: 100,
    left: 0,
  },
});
export const registration = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsLight.primaryWhite,
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.large,
  },
  fieldContainer: {
    marginBottom: Metrics.medium_margin,
  },
  label: {
    color: '#000',
    fontSize: Metrics.sub_heading_font,
    marginBottom: Metrics.small_margin,
  },

  input: {
    backgroundColor: ColorsLight.green7,
    borderRadius: Metrics.small_buttonRadius,
    fontSize: Metrics.sub_heading_font,
    padding: Metrics.mediumPadding,
    marginBottom: Metrics.small_margin,
    borderWidth: 1,
    borderColor: ColorsLight.grey2,
    color: '#000',
  },

  forgotPasswordText: {
    ...H6XSmallStyles.textStyle,
    color: ColorsLight.primaryGreen,
    textAlign: 'right',
    marginVertical: Metrics.small_margin,
    marginHorizontal: Metrics.medium_margin,
  },
  loginText: {
    fontSize: Metrics.sub_heading_font,
    color: ColorsLight.green5,
    textAlign: 'center',
    marginVertical: Metrics.baseMargin,
  },
});
export const passwordInput = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorsLight.green7,
    borderRadius: Metrics.small_buttonRadius,
    borderWidth: 1,
    borderColor: ColorsLight.grey2,
    marginBottom: Metrics.medium_margin,
  },
  input: {
    flex: 1, // Ensures input takes up the maximum available space
    fontSize: Metrics.sub_heading_font,
    padding: Metrics.mediumPadding,
    color: ColorsLight.primaryBlack,
  },
  icon: {
    paddingRight: Metrics.mediumPadding, // Padding for the icon
  },
});

export const inputFieldStyles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'column',
    gap: Spacing.x_small,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  textInputStyles: {
    input: {
      width: Metrics.medium_inputFieldWidth,
      height: Metrics.medium_inputFieldHeight,
      backgroundColor: ColorsLight.green7,
      borderRadius: Metrics.small_inputFieldRadius,
      color: ColorsLight.grey1,
      padding: Metrics.mediumPadding,
      zIndex: 1,
    },
    font: {
      fontFamily: H6XSmallStyles.textStyle.fontFamily,
      fontSize: H6XSmallStyles.textStyle.fontSize,
      color: ColorsLight.grey1,
    },
    description: {
      width: Metrics.medium_inputFieldWidth,
      backgroundColor: ColorsLight.green7,
      borderRadius: Metrics.small_inputFieldRadius,
      color: ColorsLight.grey1,
      padding: Metrics.mediumPadding,
      ...H6XSmallStyles.textStyle,
      color: ColorsLight.grey1,
      textAlign: 'left',
      textAlignVertical: 'top',
      fontFamily: 'Poppins-Regular',
    },
  },
  dropDownStyles: {
    input: {
      width: Metrics.medium_inputFieldWidth,
      height: Metrics.medium_inputFieldHeight,
      backgroundColor: ColorsLight.green7,
      borderRadius: Metrics.small_inputFieldRadius,
      color: ColorsLight.grey1,
      padding: Metrics.mediumPadding,
      color: ColorsLight.primaryBlack,
    },
    font: {
      fontFamily: H6XSmallStyles.textStyle.fontFamily,
      fontSize: H6XSmallStyles.textStyle.fontSize,
    },
  },
});

export const ujretStyles = {
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: Metrics.basePadding,
    backgroundColor: ColorsLight.primaryWhite,
  },
  profileIconOuter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.small,
    alignItems: 'center',
    paddingHorizontal: Metrics.x_large_Padding,
  },
  profileIcon: {
    borderWidth: 3,
    borderColor: ColorsLight.green6,
    width: Metrics.profileIconWidth,
    height: Metrics.profileIconHeight,
    borderRadius: Metrics.profileIconHeight,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modulesOuterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.small, // For row and column gap
    width: Metrics.screenWidth,
  },
  moduleCon: {
    styles: {
      paddingHorizontal: Spacing.small,
      paddingVertical: Spacing.large,
      width: Metrics.screenWidth * 0.44,
      alignItems: 'center',
      borderRadius: 30,
    },
    gradientColors: ['#0D5C5E', '#079A9A'],
    grayStyleGradientColors: ['#181818', '#5b5b5b'],
  },
  moduleImage: {
    width: Metrics.screenWidth * 0.3,
    resizeMode: 'contain',
  },
};

export const HandymanHome = StyleSheet.create({
  scrollViewStyles: {
    flexGrow: 2,
    backgroundColor: ColorsLight.primaryWhite,
  },
  searchContainer: {
    marginTop: 10, //temp
    paddingVertical: 19,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  searchbar: {
    color: ColorsLight.grey2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginTop: 14,
    paddingHorizontal: 13,
    gap: 11,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  greetingHeadding: {
    fontSize: Fonts.size.large,
    fontWeight: Fonts.weight.bold,
    color: ColorsLight.primaryWhite,
  },
  greetingText: {
    fontSize: Fonts.size.medium,
    color: ColorsLight.primaryWhite,
  },
  serviceListContainer: {
    width: '95%',
    alignSelf: 'center',
    paddingVertical: 15, // not sure
  },
  serviceItem: {
    alignItems: 'center',
    marginVertical: 15,
    width: '25%',
  },
  serviceName: {
    color: ColorsLight.primaryGreen,
    fontFamily: 'Poppins-Medium',
    marginTop: 4,
  },
  serviceItemImage: {
    width: 36,
    height: 36,
  },
  serviceItemImageWrapper: {
    backgroundColor: ColorsLight.green4,
    padding: 17,
    borderRadius: 38,
  },
  serviceItemImageWrapperPrimaryGreen: {
    backgroundColor: ColorsLight.primaryGreen,
  },
  shadowContainer: {
    backgroundColor: ColorsLight.primaryWhite,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowBlur: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

export const registerMoreInfoScreenStyle = StyleSheet.create({
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: Metrics.screenWidth,
    backgroundColor: ColorsLight.primaryGreen,
    marginBottom: Spacing.medium,
    borderBottomLeftRadius: Metrics.large_radius,
    borderBottomRightRadius: Metrics.large_radius,
  },

  topStripOuter: {
    width: Metrics.screenWidth,
    marginLeft: Metrics.large_margin + Metrics.large_margin,
    marginTop: Metrics.large_margin,
  },

  imageUploadContainer: {
    alignItems: 'center',
    marginTop: Spacing.large + Spacing.small,
    marginBottom: Spacing.large + Spacing.large,
    borderRadius: Metrics.profileImageHeight,
    borderWidth: 3,
    borderColor: ColorsLight.primaryWhite,
  },

  imageUploadCircle: {
    width: Metrics.profileImageWidth,
    height: Metrics.profileImageHeight,
    borderRadius: Metrics.profileImageHeight,
    backgroundColor: ColorsLight.grey3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageUploadPreview: {
    width: Metrics.profileImageWidth,
    height: Metrics.profileImageHeight,
    borderRadius: Metrics.profileImageHeight,
  },

  imageUploadText: {
    color: ColorsLight.grey1,
  },
  formContainer: {
    width: '84%',
    gap: Spacing.small,
  },

  buttonsContainer: {
    marginTop: Spacing.large,
    marginBottom: Spacing.large + Spacing.large,
    gap: Spacing.small,
  },
});

export const ServiceDetails = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  serviceItemImage: {
    width: 150,
    height: 150,
  },
  serviceItemImageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 290,
    height: 290,
    margin: 'auto',
    backgroundColor: ColorsLight.green4,
    borderRadius: 157,
  },
});

export const ThanksScreen = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
});
