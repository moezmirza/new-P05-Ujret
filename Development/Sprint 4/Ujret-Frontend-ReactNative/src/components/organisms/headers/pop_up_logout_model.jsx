import React from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import OnboardingContent from '../../molecules/intro_screen_content';
import CancelButton from '../../atoms/buttons/pop_up_secondary_button';
import LogoutButton from '../../atoms/buttons/pop_up_primary_button';
import {popupModel} from '../../../themes/allstyles/components';

const LogoutConfirmationModal = ({visible, onConfirm, onCancel}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancel}>
      <View style={popupModel.centeredView}>
        <View style={popupModel.modalView}>
          <OnboardingContent
            headerText="Logout Confirmation"
            subHeaderText="Are you sure you want to log out?"
          />
          <View style={popupModel.buttonContainer}>
            <CancelButton onPress={onCancel} />
            <LogoutButton onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default LogoutConfirmationModal;
