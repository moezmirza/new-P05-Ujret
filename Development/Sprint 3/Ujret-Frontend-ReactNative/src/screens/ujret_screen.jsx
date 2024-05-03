// React and React Native imports
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {Image} from 'react-native';

// Component imports
import H1Xlarge from '../components/atoms/headings/h1_xlarge';
import UjretModule from '../components/molecules/ujret_module';

// Styles and constants
import {ujretStyles} from '../themes/styles';
import {Metrics} from '../themes/metrics';
import ProfileIcon from '../assets/icons/profile_icon.png';

// Redux
import {useDispatch, useSelector} from 'react-redux';

// Component definition
const UjretScreen = ({navigation}) => {
  // Redux state
  const userInfo = useSelector(state => state.user.userInfo);
  console.log('userInfo on ujret:', userInfo);

  // List of ujret app modules
  const ujretAppModules = [
    {
      nextScreen: 'HandymenHome',
      moduleName: 'Handymen',
      imageSrc: require('../assets/images/moduleImg1.png'),
    },
    {
      nextScreen: 'Ujret',
      moduleName: 'Tool Renting',
      imageSrc: require('../assets/images/moduleImg4.png'),
    },
    {
      nextScreen: 'Ujret',
      moduleName: 'Carpooling',
      imageSrc: require('../assets/images/moduleImg2.png'),
    },
    {
      nextScreen: 'Ujret',
      moduleName: 'Freelancing',
      imageSrc: require('../assets/images/moduleImg3.png'),
    },
  ];

  // Rendering UI
  return (
    <SafeAreaView style={ujretStyles.screen}>
      <View>
        {/* Profile icon */}
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <View style={ujretStyles.profileIconOuter}>
            <View style={ujretStyles.profileIcon}>
              <Image source={ProfileIcon}></Image>
            </View>
          </View>
        </TouchableOpacity>

        {/* Header */}
        <H1Xlarge
          marginTop={Metrics.screenHeight * 0.05}
          marginBottom={Metrics.screenHeight * 0.03}>
          Which Service Do You Want?
        </H1Xlarge>

        {/* Ujret app modules */}
        <View style={{...ujretStyles.modulesOuterContainer}}>
          {ujretAppModules.map((moduleInfo, index) => {
            return (
              <UjretModule
                key={index}
                navigation={navigation}
                {...moduleInfo}></UjretModule>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

// Exporting the component
export default UjretScreen;
