// edit Profile Screen

// React and Firebase authentication imports
import React, {useState, useEffect} from 'react';
import {
  getAuth,
  signOut,
  deleteUser,
  sendPasswordResetEmail,
} from 'firebase/auth';

// React Native imports
import {SafeAreaView, ScrollView, View, Alert, StyleSheet} from 'react-native';

// Component imports
import BackButtonWhite from '../components/atoms/progress_indicators/back_arrow_white';
import TopBackStrip from '../components/molecules/top_back_button_strip';
import MediumHeaderText from '../components/atoms/headings/medium_size_heading';
import UserAvatar from '../components/atoms/image_container/user_avatar';
import ListItem from '../components/molecules/edit_profile_list_items';
import LogoutConfirmationModal from '../components/organisms/headers/pop_up_logout_model';
import DeleteConfirmationModal from '../components/organisms/headers/pop_up_delete_model';

// Theme and style imports
import {editProfileScreen} from '../themes/allscreens/edit_profile_screen_style';
import {Metrics} from '../themes/metrics';
import {Colors, ColorsLight} from '../themes/colors';
import {Strings} from '../stores/constant';
import {registerMoreInfoScreenStyle} from '../themes/styles';

// Redux imports
import {useSelector, useDispatch} from 'react-redux';
import {clearUser} from '../stores/user_slice';
import {clearHandyman} from '../stores/handyman_slice';
import {clearHandymenCategories} from '../stores/handymen_categories_slice';

// Main screen component
const EditProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  // Access user information from Redux store
  const userInfo = useSelector(state => state.user.userInfo);
  const handymanInfo = useSelector(state => state.handyman.handymanInfo);
  // console.log('handymanInfo:', handymanInfo);

  // State hooks
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDelModalVisible, setDelModalVisible] = useState(false);
  const [userName, setUserName] = useState('Hello Champ');
  const auth = getAuth();

  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.firstName || 'Hello Champ');
    }
  });

  // Function to handle logout confirmation
  const handleConfirmLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      dispatch(clearHandyman());
      navigation.navigate('login');
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Logout Failed', 'An error occurred while logging out.');
    }
    setModalVisible(false);
  };

  // Function to handle account deletion confirmation
  const handleConfirmDelete = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await deleteUser(user);
        dispatch(clearUser());
        dispatch(clearHandymenCategories());
        navigation.navigate('registration');
      }
    } catch (error) {
      console.error('Delete account failed:', error);
      Alert.alert(Strings.registrationScreen.accountDeleteError + error);
    }
    setDelModalVisible(false);
  };

  // Navigation handlers
  const handleEditProfilePress = () =>
    navigation.navigate('EditProfileDetails');

  // const handleChangePasswordPress = () => navigation.navigate('updatePassword');

  const handleChangePasswordPress = async email => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Check your email',
        'A link to reset your password has been sent to your email address.',
      );
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      Alert.alert('Failed to send reset email', error.message);
    }
  };

  const handleProfileServicePress = () =>
    navigation.navigate(
      handymanInfo ? 'ServiceModeScreen1' : 'ServiceProviderInfo',
    );
  const handleCustomerServicePress = () => {
    navigation.navigate('Splash');
    console.log('Customer Service Pressed');
  };
  const handleLogoutPress = async () => setModalVisible(true);
  const handleDeleteAccountPress = async () => setDelModalVisible(true);

  // List items data
  const listItems = [
    {
      iconName: 'user-edit',
      color: Colors.secondaryColor,
      label: 'Edit Profile',
      onPress: handleEditProfilePress,
    },
    {
      iconName: 'lock',
      color: Colors.secondaryColor,
      label: 'Change Password',
      onPress: () => handleChangePasswordPress(userInfo.email),
    },

    {
      iconName: 'briefcase',
      color: Colors.secondaryColor,
      label: handymanInfo ? 'Services Mode' : 'Create Handyman Profile',
      onPress: handleProfileServicePress,
    },
    {
      iconName: 'headset',
      color: Colors.secondaryColor,
      label: 'Customer Service',
      onPress: handleCustomerServicePress,
    },
    {
      iconName: 'sign-out-alt',
      color: ColorsLight.red1,
      label: 'Log Out',
      onPress: handleLogoutPress,
      borderColor: ColorsLight.red1,
      textColor: ColorsLight.red1,
    },
    {
      iconName: 'trash-alt',
      color: ColorsLight.red1,
      label: 'Delete Account !!',
      onPress: handleDeleteAccountPress,
      borderColor: ColorsLight.red1,
      textColor: ColorsLight.red1,
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={editProfileScreen.imageview}>
        <TopBackStrip navigation={navigation} variant={'white'}></TopBackStrip>
        <MediumHeaderText>Profile</MediumHeaderText>
        <UserAvatar imageUrl={null} />
        <MediumHeaderText>{userName}</MediumHeaderText>
      </View>

      <ScrollView
        style={[editProfileScreen.container, {padding: Metrics.baseMargin}]}>
        {listItems.map((item, index) => (
          <ListItem
            key={`profile-item-${index}`}
            iconName={item.iconName}
            iconColor={item.color}
            labelText={item.label}
            borderColor={item.borderColor}
            textColor={item.textColor}
            onPress={item.onPress}
          />
        ))}
      </ScrollView>
      <LogoutConfirmationModal
        visible={isModalVisible}
        onConfirm={handleConfirmLogout}
        onCancel={() => setModalVisible(false)}
      />

      <DeleteConfirmationModal
        visible={isDelModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDelModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default EditProfileScreen;
