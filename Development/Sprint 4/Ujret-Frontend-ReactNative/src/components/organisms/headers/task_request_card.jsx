import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements'; // Import Icon from react-native-elements
import {catListChangeToSmallCase} from '../../../utils/utilities';
import {ColorsLight} from '../../../themes/colors';
// Themes and Styles Import
import {
  H3MainStyles,
  H4SubMainStyles,
  H5SmallStyles,
  P2MainStyles,
} from '../../../themes/styles';

// Define the given colors directly in the component for simplicity
const Colors = {
  primaryColor: '#0D5C5E',
  secondaryColor: '#0A7A7B',
  background: '#FFFFFF',
  text: '#000000',
  activeDot: '#FF6347',
  inactiveDot: '#0D5C5E',
  inputColor: '#EAFFF9',
  borderColor: '#ddd',
  greyColor: 'grey',
};

const TaskRequestCard = ({task, onViewDetails}) => {
  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        <Text style={styles.name}>
          {task.service_seeker_name.split(' ')[0]}
        </Text>
        <Text style={styles.detail}>PKR {task.budget}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.timeText}>{task.timeElapsed} m ago</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.description}>
          Tasks To Do:{' '}
          {catListChangeToSmallCase(task.sub_categories).join(', ')}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonAccept}
          onPress={() => {
            onViewDetails();
          }}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: ColorsLight.primaryWhite,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: ColorsLight.grey3,
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    verticalAlign: 'middle',
  },
  name: {
    ...H3MainStyles.textStyle,
    color: ColorsLight.primaryBlack,
    margin: 0,
  },
  price: {
    ...H3MainStyles.textStyle,
    color: Colors.primaryColor,
    margin: 0,
  },
  starContainer: {
    flexDirection: 'row',
    marginRight: 8,
    verticalAlign: 'middle',
  },
  timeText: {
    ...H5SmallStyles.textStyle,
    color: ColorsLight.primaryBlack,
    margin: 0,
  },
  detail: {
    ...H5SmallStyles.textStyle,
    color: ColorsLight.primaryBlack,
    margin: 0,
    alignSelf: 'center',
  },
  description: {
    ...P2MainStyles.textStyle,
    color: Colors.greyColor,
    margin: 0,
    marginBottom: 16,
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonAccept: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primaryColor,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskRequestCard;
