import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, ColorsLight} from '../../../themes/colors';

const TaskDetailCard = ({task, onSelect}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onSelect}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{task.description}</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{task.category}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Service seeker Name:</Text>
          <Text style={styles.value}>{task.service_seeker_name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{task.service_seeker_number}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Subcategories:</Text>
          <Text style={styles.value}>{task.sub_categories.join(', ')}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Budget:</Text>
          <Text style={styles.value}>{`PKR ${task.budget}`}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Duration:</Text>
          <Text style={styles.value}>{`${task.duration} Hour(s)`}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Scheduled Time:</Text>
          <Text style={styles.value}>
            {new Date(task.scheduledTime).toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{task.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 16,
    margin: 16,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 2},
  },
  cardContent: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.text,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    color: Colors.greyColor,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primaryColor,
  },
});

export default TaskDetailCard;
