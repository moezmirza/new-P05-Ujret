import {Text} from 'react-native';
import {H3MainStyles} from '../../../themes/styles';

const H3Main = ({
  children,
  color,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
}) => {
  // Create a base style object with default values
  const baseStyle = {
    ...H3MainStyles.textStyle,
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

H3Main.defaultProps = {
  marginTop: 0,
  marginBottom: 0,
  marginRight: 0,
  marginLeft: 0,
  color: null, // Setting default value for color
};

export default H3Main;
