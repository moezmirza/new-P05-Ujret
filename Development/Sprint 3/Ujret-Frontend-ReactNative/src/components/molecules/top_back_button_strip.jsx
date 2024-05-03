import {View} from 'react-native';
import BackButton from '../atoms/progress_indicators/back_arrow';
import BackButtonWhite from '../atoms/progress_indicators/back_arrow_white';
import {backArrow, TopBackStripStyles} from '../../themes/styles';

const TopBackStrip = ({navigation, lastScreen, variant}) => {
  const navigateTo = lastScreen
    ? () => navigation.navigate(lastScreen)
    : () => navigation.goBack();

  const arrow = () => {
    if (variant === 'white') {
      return (
        <BackButtonWhite style={backArrow.backButton} onPress={navigateTo} />
      );
    }
    return <BackButton style={backArrow.backButton} onPress={navigateTo} />;
  };

  return <View style={TopBackStripStyles.container}>{arrow()}</View>;
};

TopBackStrip.defaultProps = {
  lastScreen: null, // Default value if lastScreen is not provided
  variant: 'green', // Default value if variant is not provided
};

export default TopBackStrip;
