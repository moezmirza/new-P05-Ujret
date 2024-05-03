import React, {useState, useEffect} from 'react';
import {
  Linking,
  SafeAreaView,
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LargeBtn from '../components/atoms/buttons/large_btn';
import TopBackStrip from '../components/molecules/top_back_button_strip';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import UserAvatar from '../components/atoms/image_container/user_avatar';
import H3Main from '../components/atoms/headings/h3_main';
import {Colors, ColorsLight} from '../themes/colors';
import H2Large from '../components/atoms/headings/h2_large';
import H4SubMain from '../components/atoms/headings/h4_sub_main';
import {Metrics} from '../themes/metrics';
import {ujretStyles} from '../themes/styles';

// Redux
import {useSelector} from 'react-redux';

// APIS
import {markTaskCompleted} from '../api_layer/tasks_apis';

const TaskAcceptScreen = ({navigation}) => {
  // Extract the task data from the Redux store
  const taskInfo = useSelector(state => state.task.taskInfo);
  const userInfo = useSelector(state => state.user.userInfo);
  // console.log('Task data on Task Accept Screen: \n', taskInfo);
  // console.log('User data on Task Accept Screen: \n', userInfo);

  // Open WhatsApp with a predefined message
  const openWhatsApp = (text, phoneNumber) => {
    // The number must be in international format
    const url = `whatsapp://send?text=${encodeURIComponent(
      text,
    )}&phone=${phoneNumber}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'WhatsApp is not installed');
    });
  };

  // Placeholder function for the call action
  const makeCall = phoneNumber => {
    let url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to make a call');
    });
  };

  //  function for handling task completion
  const handleTaskCompletion = async (taskId, userId) => {
    // Placeholder for the task completion logic
    console.log('Task Completed with ID: ', taskId, userId);
    try {
      const response = await markTaskCompleted(taskId, userId);
      console.log('Task Completion Response: ', response);
      if (response.status_code === 200) {
        // Navigation to the task completion screen
        navigation.navigate('TaskPaymentScreen');
      } else {
        Alert.alert(
          'Setting Up Task Completion Failed',
          'Task could not be marked as completed',
        );
      }
    } catch (error) {
      Alert.alert('Task Completion Failed', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TopBackStrip navigation={navigation} variant={'green'} />
      </View>
      <View
        style={{
          width: '50%',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <H3Main
          color={Colors.primaryColor}
          marginBottom={Metrics.medium_margin}>
          Your Tasker
        </H3Main>
        <H2Large
          color={ColorsLight.primaryBlack}
          marginBottom={Metrics.medium_margin}>
          {taskInfo.handymanName.split(' ')[0]}
        </H2Large>
        <H4SubMain color={Colors.primaryColor}>
          Is Reaching Your Destination...
        </H4SubMain>
      </View>
      <View>
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={makeCall}>
            <LinearGradient
              start={{x: 0.0, y: 0.0}}
              end={{x: 1.0, y: 1.0}}
              colors={ujretStyles.moduleCon.gradientColors}
              style={{
                padding: Metrics.mediumPadding,
                borderRadius: 30,
              }}>
              <Ionicons name="call-outline" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              openWhatsApp(
                `Hello ${
                  taskInfo.handymanName.split(' ')[0]
                } ! \n I accepted your Bid offer at *Ujret*, When You'll reach at the address ?`,
                taskInfo.handymanPhoneNumber,
              );
            }}>
            <LinearGradient
              start={{x: 0.0, y: 0.0}}
              end={{x: 1.0, y: 1.0}}
              colors={ujretStyles.moduleCon.gradientColors}
              style={{
                padding: Metrics.mediumPadding,
                borderRadius: 30,
              }}>
              <Ionicons name="logo-whatsapp" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <H4SubMain
          color={ColorsLight.grey2}
          marginLeft={'25%'}
          marginRight={'25%'}
          marginTop={Metrics.medium_margin}
          marginBottom={Metrics.medium_margin}>
          Confirm Below if Task Completed
        </H4SubMain>
        <View style={{alignItems: 'center'}}>
          <LargeBtn
            variant={'action'}
            text={'Task Completed'}
            onPress={() => {
              /* Handle task completion here */
              handleTaskCompletion(taskInfo.taskId, userInfo.uid);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: Metrics.baseMargin,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
  },

  yourTaskerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  content: {
    // flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  statusText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  taskerNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    width: '40%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  actionText: {
    color: 'white',
    marginTop: 5,
  },
});

export default TaskAcceptScreen;
