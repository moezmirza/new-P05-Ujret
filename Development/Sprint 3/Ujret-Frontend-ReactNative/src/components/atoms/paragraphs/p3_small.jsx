import {Text} from 'react-native';
import {P3SmallStyles} from '../../../themes/styles';

const P3Small = ({children}) => (
  <Text style={P3SmallStyles.textStyle}>{children}</Text>
);

export default P3Small;
