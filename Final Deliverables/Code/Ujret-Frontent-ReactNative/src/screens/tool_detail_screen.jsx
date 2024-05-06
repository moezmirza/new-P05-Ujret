// Renting Home Screen
// React imports
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

// Styles
import {
  H5SmallStyles,
  H3MainStyles,
  H4SubMainStyles,
  H7XXSmallStyles,
  P2MainStyles,
  P3SmallStyles,
  ujretStyles,
} from '../themes/styles';

// Themes and Colors and constants
import {Spacing, Metrics} from '../themes/metrics';
import {ColorsLight} from '../themes/colors';

// Components
import TopBackStrip from '../components/molecules/top_back_button_strip';

// Utils
import {
  calculateElapsedTimeInDays,
  catListChangeToSmallCase,
} from '../utils/utilities';

// Screen Component definition
const ToolDetailScreen = ({route, navigation}) => {
  // State Variables
  const {tool} = route.params;

  //
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

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <TopBackStrip navigation={navigation} />
      <Text style={styles.screenTitle}>Tool Details</Text>

      <TouchableOpacity style={styles.singleTool} key={tool.id}>
        <View style={styles.toolInfoRow}>
          <Text style={styles.label}>Renter</Text>
          <Text style={styles.toolTitle}>{tool.renterName}</Text>
        </View>
        <View style={styles.toolInfoRow}>
          <Text style={styles.label}>Tool</Text>
          <Text style={styles.toolTitle}>{tool.title}</Text>
        </View>
        <View style={styles.toolInfoRow}>
          <Text style={styles.label}>Tool Category</Text>
          <Text style={styles.category}>
            {catListChangeToSmallCase([tool.category])[0]}
          </Text>
        </View>
        <View style={styles.toolInfoRow}>
          <Text style={styles.label}>Rent per Hour</Text>
          <Text style={styles.rent}>
            PKR {tool.rent}/hr - PKR {tool.rent * 24}/day
          </Text>
        </View>
        <View style={styles.toolInfoRow}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.address}>{tool.address}</Text>
        </View>
        <View style={styles.toolInfoRow}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.address}>{tool.description}</Text>
        </View>
        <View style={styles.toolInfoRow}>
          <Text style={styles.label}>Created At</Text>
          <Text style={styles.createdAt}>
            {calculateElapsedTimeInDays(tool.createdAt)} Days ago
          </Text>
        </View>
        <View style={styles.toolInfoRow}>
          <Text style={styles.label}>Tool Availability</Text>
          <View style={styles.row}>
            <Text
              style={
                tool.status === 'AVAILABLE'
                  ? styles.availabilityYes
                  : styles.availabilityNo
              }>
              {tool.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.ctaContainer}>
        <Text style={{...styles.screenTitle, marginTop: 0}}>
          To Rent out the Tool.{'\n'} Contact {tool.renterName} Now
        </Text>
        <View style={styles.actionContainer}>
          <View>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                makeCall(tool.renterPhoneNumber);
              }}>
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
            <Text style={styles.createdAt}>Phone Call</Text>
          </View>

          <View>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                openWhatsApp(
                  `Hello ${tool.renterName}!\n I saw the tool ${tool.title} your Posted on *Ujret*, I want to Rent Out this Tool, Can you please share details.`,
                  tool.renterPhoneNumber,
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
            <Text style={styles.createdAt}>Whatsapp</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    backgroundColor: ColorsLight.primaryWhite,
    alignItems: 'center',
    padding: Metrics.baseMargin,
    zIndex: 0,
    paddingBottom: Metrics.baseMargin + Metrics.baseMargin,
  },
  screenTitle: {
    ...H3MainStyles.textStyle,
    width: Metrics.medium_inputFieldWidth,
    textAlign: 'center',
    marginTop: -Metrics.baseMargin + 5,
    zIndex: 1,
  },
  singleTool: {
    backgroundColor: ColorsLight.primaryWhite,
    padding: Metrics.large_padding,
    shadowColor: ColorsLight.primaryBlack,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: Metrics.buttonRadius,
    width: '100%',
    marginTop: Metrics.baseMargin + Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },
  toolInfoRow: {
    marginBottom: Metrics.small_margin,
  },
  label: {
    ...P3SmallStyles.textStyle,
    textAlign: 'left',
    color: ColorsLight.grey2,
    marginBottom: -Spacing.xx_small,
  },
  toolTitle: {
    ...H3MainStyles.textStyle,
    textAlign: 'left',
    color: ColorsLight.primaryBlack,
  },
  category: {
    ...H4SubMainStyles.textStyle,
    textAlign: 'left',
    color: ColorsLight.green6,
  },
  rent: {
    ...H4SubMainStyles.textStyle,
    textAlign: 'left',
    color: ColorsLight.green6,
  },
  address: {
    ...P2MainStyles.textStyle,
    color: ColorsLight.primaryBlack,
  },
  createdAt: {
    ...H7XXSmallStyles.textStyle,
    textAlign: 'left',
    color: ColorsLight.primaryBlack,
  },
  availabilityYes: {
    ...H5SmallStyles.textStyle,
    color: ColorsLight.green6,
    textAlign: 'left',
    backgroundColor: '#D1FFFF',
    paddingHorizontal: Spacing.x_small,
    marginTop: Spacing.x_small,
    borderRadius: 8,
  },
  availabilityNo: {
    ...H5SmallStyles.textStyle,
    color: ColorsLight.red1,
    backgroundColor: '#FFE0DF',
    paddingHorizontal: Spacing.x_small,
    marginTop: Spacing.x_small,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
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
  actionContainer: {
    flexDirection: 'row',
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Metrics.baseMargin,
  },
  ctaContainer: {
    backgroundColor: ColorsLight.primaryWhite,
    padding: Metrics.large_padding + Metrics.large_padding,
    shadowColor: ColorsLight.primaryBlack,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: Metrics.buttonRadius,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    // marginVertical: Metrics.baseMargin + Metrics.baseMargin,
  },
});

// Exporting the component
export default ToolDetailScreen;
