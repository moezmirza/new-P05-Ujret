import {Colors} from '../colors';
// import {ColorsLight} from '../colors';

// import {Fonts} from './fonts';
import {Metrics, Spacing} from '../metrics';
import {StyleSheet, Platform, View} from 'react-native';

export const editProfileDetails = StyleSheet.create({
  main: {
    backgroundColor: Colors.background,
  },
  mainContainer: {
    margin: 24,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    zIndex: -1,
  },
  spacer: {
    width: 20,
  },
});
