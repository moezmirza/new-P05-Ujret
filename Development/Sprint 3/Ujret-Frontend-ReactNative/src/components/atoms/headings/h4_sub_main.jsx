import {Text} from 'react-native';
import {H4SubMainStyles} from '../../../themes/styles';

const H4SubMain = ({
  children,
  color,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
}) => {
  // Create a base style object with default values
  const baseStyle = {
    ...H4SubMainStyles.textStyle,
    marginTop: marginTop,
    marginBottom: marginBottom,
    marginRight: marginRight,
    marginLeft: marginLeft,
  };

  // Conditionally add color to the base style if color is not null
  if (color) {
    baseStyle.color = color;
  }

  return <Text style={baseStyle}>{children}</Text>;
};

H4SubMain.defaultProps = {
  marginTop: 0,
  marginBottom: 0,
  marginRight: 0,
  marginLeft: 0,
  color: null, // Setting default value for color
};

export default H4SubMain;
