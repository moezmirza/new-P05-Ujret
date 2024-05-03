import {Colors} from '../colors';
// import {ColorsLight} from '../colors';

// import {Fonts} from './fonts';
import {Metrics, Spacing} from '../metrics';
import {StyleSheet, Platform, View} from 'react-native';

export const editProfileScreen = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  imageview: {
    backgroundColor: Colors.secondaryColor,
    marginBottom: 16,
    padding: 16,
    width: '100%',
    height: 'auto', // Responsive height based on aspect ratio or set a specific percentage
    borderBottomLeftRadius: 50, // Border radius on the bottom left corner
    borderBottomRightRadius: 50, // Border radius on the bottom right corner
  },
  scrollView: {
    marginHorizontal: Metrics.baseMargin,
  },
});
