import {Text} from 'react-native';
import {H7XXSmallStyles} from '../../../themes/styles';

const H7XXSmall = ({
  children,
  color,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
}) => {
  const baseStyle = {
    ...H7XXSmallStyles.textStyle,
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

H7XXSmall.defaultProps = {
  marginTop: 0,
  marginBottom: 0,
  marginRight: 0,
  marginLeft: 0,
  color: null,
};

export default H7XXSmall;
