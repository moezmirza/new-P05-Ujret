import {Text} from 'react-native';
import {H1XLargeStyles} from '../../../themes/styles';

const H1XLarge = ({
  children,
  color,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
}) => {
  const baseStyle = {
    ...H1XLargeStyles.textStyle,
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

H1XLarge.defaultProps = {
  marginTop: 0,
  marginBottom: 0,
  marginRight: 0,
  marginLeft: 0,
  color: null, // Setting default value for color
};

export default H1XLarge;
