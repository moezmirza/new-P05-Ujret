// React and React Native imports
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Image} from 'react-native';
import {Icon} from 'react-native-elements';

// Component imports
import H1Xlarge from '../components/atoms/headings/h1_xlarge';
import UjretModule from '../components/molecules/ujret_module';

// Styles and constants
import {ujretStyles} from '../themes/styles';
import {Metrics} from '../themes/metrics';
import ProfileIcon from '../assets/icons/profile_icon.png';
import {ColorsLight} from '../themes/colors';
import {useEffect} from 'react';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {clearTask} from '../stores/task_slice';

// Component definition
const UjretScreen = ({navigation}) => {
  // Redux state
  const userInfo = useSelector(state => state.user.userInfo);
  console.log('userInfo on ujret:', userInfo);
  const dispatch = useDispatch();

  //
  useEffect(() => {
    dispatch(clearTask());
  }, [navigation]);

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
        <View style={styles.navIconsOuter}>
          <TouchableOpacity
            style={styles.iconsOuter}
            onPress={() => navigation.navigate('TaskHistoryScreen')}>
            <Icon
              name="list-alt"
              type="font-awesome-5"
              color={ColorsLight.green6}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconsOuter}
            onPress={() => navigation.navigate('EditProfile')}>
            <Icon
              name="user-alt"
              type="font-awesome-5"
              color={ColorsLight.green6}
            />
          </TouchableOpacity>
        </View>

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

//
const styles = StyleSheet.create({
  navIconsOuter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  iconsOuter: {
    borderRadius: 500,
    borderWidth: 2,
    borderColor: ColorsLight.green6,
    backgroundColor: ColorsLight.primaryWhite,
    padding: 8,
    shadowColor: 'rgba(0, 185, 89, 0.5)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.7,
    shadowRadius: 16,
    elevation: 6,
  },
  iconStyles: {
    color: ColorsLight.green6,
  },
});

// Exporting the component
export default UjretScreen;
