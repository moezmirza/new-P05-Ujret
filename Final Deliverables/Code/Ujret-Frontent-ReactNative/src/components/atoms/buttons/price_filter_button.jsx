import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

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

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  filterbutton: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
  },
  filterbuttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const PriceFilterAtom = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [price, setPrice] = useState(250); // Default value set to midpoint of range

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{padding: 10, backgroundColor: Colors.secondaryColor}}>
        <Text style={{color: Colors.background}}>Select Price</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPressOut={closeModal}>
          <View style={styles.modalView} onStartShouldSetResponder={() => true}>
            <Text style={{fontSize: 20, marginBottom: 10}}>
              Select Price Range
            </Text>
            <View style={styles.sliderContainer}>
              <Text style={{fontSize: 16, color: Colors.greyColor}}>
                Current Price: ${price}
              </Text>
              <Slider
                style={{width: '100%', height: 40}}
                value={price}
                onValueChange={setPrice}
                minimumValue={50}
                maximumValue={500}
                step={5}
                minimumTrackTintColor={Colors.primaryColor}
                maximumTrackTintColor={Colors.inactiveDot}
                thumbTintColor={Colors.activeDot}
              />
            </View>
            <TouchableOpacity onPress={closeModal} style={styles.filterbutton}>
              <Text style={styles.filterbuttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PriceFilterAtom;
