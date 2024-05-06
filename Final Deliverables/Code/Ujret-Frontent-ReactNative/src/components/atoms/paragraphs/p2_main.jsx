import {Text} from 'react-native';
import {P2MainStyles} from '../../../themes/styles';

const P2Main = ({children}) => (
  <Text style={P2MainStyles.textStyle}>{children}</Text>
);

export default P2Main;
