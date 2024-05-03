// React and React Native imports
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Redux imports
import {useSelector} from 'react-redux';

// Component definition
const ProfileScreen = () => {
  // Fetching user info from Redux store
  const user = useSelector(state => state.user.userInfo);

  return (
    <View style={styles.container}>
      {/* Displaying user's email */}
      <Text style={styles.welcomeText}>Hello, {user?.email}</Text>
      {/* Displaying user's phone number */}
      <Text style={styles.welcomeText}>Hello, {user?.phoneNumber}</Text>
    </View>
  );
};

// Styles definition
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // Change the background color if needed
  },
  welcomeText: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  phoneText: {
    fontSize: 18,
    color: '#000',
  },
});

// Exporting the component
export default ProfileScreen;
