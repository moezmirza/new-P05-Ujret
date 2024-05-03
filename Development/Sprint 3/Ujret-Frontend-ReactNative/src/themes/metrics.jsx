import {Dimensions} from 'react-native';

// Screen dimensions
const {width, height} = Dimensions.get('window');

// Base dimensions from the design prototype
const guidelineBaseWidth = 428;
const guidelineBaseHeight = 990;

// Scaling functions
export const scaleSize = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scaleSize(size) - size) * factor;

export const Metrics = {
  screenWidth: width,
  screenHeight: height,

  // Scaling dimensions
  logoWidth: scaleSize(150),
  logoHeight: scaleSize(150),
  onboardingImageWidth: scaleSize(240),
  onboardingImageHeight: scaleSize(240),
  profileImageWidth: moderateScale(120),
  profileImageHeight: moderateScale(120),
  profileIconWidth: moderateScale(50),
  profileIconHeight: moderateScale(50),

  // Spacing
  basePadding: moderateScale(24),
  baseMargin: moderateScale(20),
  majorMargin: scaleSize(34),

  smallPadding: moderateScale(8),
  mediumPadding: moderateScale(16),
  large_padding: moderateScale(24),
  x_large_Padding: moderateScale(32),

  small_margin: moderateScale(8),
  medium_margin: moderateScale(16),
  large_margin: moderateScale(24),
  x_large_margin: moderateScale(32),
  x_x_large_margin: moderateScale(64),

  // Font sizes
  paragraph_font: moderateScale(12),
  sub_heading_font: moderateScale(16),
  heading_font: moderateScale(24),
  main_heading_font: moderateScale(40),

  // Input Field Metrics
  medium_inputFieldWidth: scaleSize(360),
  medium_inputFieldHeight: moderateScale(60),
  small_inputFieldRadius: moderateScale(12),

  // Button Metrics
  large_btnWidth: scaleSize(360),
  large_btnPaddingVertical: moderateScale(15),
  large_btnPaddingHorizontal: moderateScale(20),

  // Radius
  large_radius: moderateScale(50),

  // Button radius
  buttonRadius: moderateScale(16),
  small_buttonRadius: moderateScale(8),
  medium_buttonRadius: moderateScale(16),
  large_buttonRadius: moderateScale(24),
  x_large_buttonRadius: moderateScale(32),
};

export const Spacing = {
  xx_small: moderateScale(4),
  x_small: moderateScale(8),
  small: moderateScale(16),
  medium: moderateScale(24),
  large: moderateScale(32),
  x_large: moderateScale(80),
};
