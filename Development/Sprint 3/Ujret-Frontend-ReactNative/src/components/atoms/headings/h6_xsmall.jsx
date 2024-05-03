import {Text} from 'react-native';
import {H6XSmallStyles} from '../../../themes/styles';

const H6XSmall = ({
  children,
  color,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
}) => {
  const baseStyle = {
    ...H6XSmallStyles.textStyle,
    marginTop: marginTop,
    marginBottom: marginBottom,
    marginRight: marginRight,
    marginLeft: marginLeft,
  };

  if (color) {
    baseStyle.color = color;
  }

  return <Text style={baseStyle}>{children}</Text>;
};

H6XSmall.defaultProps = {
  marginTop: 0,
  marginBottom: 0,
  marginRight: 0,
  marginLeft: 0,
  color: null,
};

export default H6XSmall;
