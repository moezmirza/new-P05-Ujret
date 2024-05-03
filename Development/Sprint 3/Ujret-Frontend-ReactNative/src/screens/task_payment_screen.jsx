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
import UserAvatar from '../components/atoms/image_container/user_avatar';
import H3Main from '../components/atoms/headings/h3_main';
import {Colors, ColorsLight} from '../themes/colors';
import H2Large from '../components/atoms/headings/h2_large';
import H4SubMain from '../components/atoms/headings/h4_sub_main';
import {Metrics} from '../themes/metrics';
import {useSelector} from 'react-redux';

const TaskPaymentScreen = ({navigation}) => {
  const taskInfo = useSelector(state => state.task.taskInfo);

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
          marginBottom={Metrics.x_x_large_margin}>
          Thank you For Using Ujret
        </H3Main>
        <View>
          <H4SubMain
            color={ColorsLight.primaryGreen}
            marginBottom={Metrics.medium_margin}>
            Pay {taskInfo.handymanName.split(' ')[0]}
          </H4SubMain>
          <H2Large color={ColorsLight.primaryBlack}>
            PKR {taskInfo.bidPrice}
          </H2Large>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <LargeBtn
          variant={'action'}
          text={'Payment Done'}
          onPress={() => {
            navigation.navigate('UserAddReview');
          }}
        />
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

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 40,
    marginVertical: 10,
  },
  taskerNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
  },
  actionText: {
    color: 'white',
    marginTop: 5,
  },

  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D5C5E',
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  actionText: {
    color: 'white',
    marginTop: 5,
  },
});

export default TaskPaymentScreen;
