import {ColorsLight} from '../colors';
import {StyleSheet} from 'react-native';

export const serviveModeScreen = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    height: 100,
    backgroundColor: ColorsLight.primaryWhite,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
});
