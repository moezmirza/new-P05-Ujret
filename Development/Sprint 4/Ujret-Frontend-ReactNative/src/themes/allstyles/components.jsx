import {Colors} from '../colors';
import {ColorsLight} from '../colors';
import {Metrics, Spacing} from '../metrics';
import {StyleSheet, Dimensions, Platform, View} from 'react-native';
import {Fonts} from '../fonts';
const {width: screenWidth} = Dimensions.get('window');
// styles of atoms,
export const avatarStyles = StyleSheet.create({
  avatar: {
    width: screenWidth * 0.36,
    height: screenWidth * 0.36,
    borderRadius: (screenWidth * 0.36) / 2,
    padding: Metrics.mediumPadding,
    marginBottom: Metrics.small_margin,
    marginTop: Metrics.small_margin,
    alignSelf: 'center',
  },
});
export const cancelButton = StyleSheet.create({
  button: {
    width: 136,
    height: 37,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: ColorsLight.red1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  text: {
    borderColor: ColorsLight.red1,
    color: ColorsLight.red1,
    fontWeight: 'bold',
  },
});

export const deleteButton = StyleSheet.create({
  button: {
    width: 136,
    height: 37,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsLight.red1,
  },
  text: {
    color: Colors.background,
    fontWeight: 'bold',
  },
});

export const confirmButton = StyleSheet.create({
  button: {
    width: 136,
    height: 37,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
  },
  text: {
    color: Colors.background,
    fontWeight: 'bold',
  },
});

//molecules
export const editProfileItems = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1.3,
    borderColor: Colors.secondaryColor,
    backgroundColor: Colors.background,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 10,
  },
  listItemText: {
    flex: 1, // Take up all available space
    marginLeft: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  iconStyle: {
    // If you need the icon size to be responsive, use a ratio of screenWidth
  },
  chevronIconStyle: {
    // Same for the chevron icon
  },
});
export const filterContainer = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ColorsLight.primaryWhite,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 6,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    marginTop: 16,
    padding: 16,
    paddingHorizontal: 24,
    width: '97%',
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.inputColor,
    borderRadius: Metrics.small_buttonRadius,
    paddingVertical: Metrics.smallPadding,
    paddingHorizontal: Metrics.smallPadding,
    marginHorizontal: Metrics.small_margin,
  },
  activeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
    borderRadius: Metrics.small_buttonRadius,
    paddingVertical: Metrics.smallPadding,
    paddingHorizontal: Metrics.smallPadding,
    marginHorizontal: Metrics.small_margin,
  },
  text: {
    fontFamily: Fonts.primary,
    fontSize: Fonts.size.medium,
    color: Colors.text,
    fontWeight: Fonts.weight.regular,
    marginLeft: Metrics.small_margin,
  },
  activeText: {
    fontFamily: Fonts.primary,
    fontSize: Fonts.size.medium,
    color: ColorsLight.primaryWhite,
    fontWeight: Fonts.weight.bold,
    marginLeft: Metrics.small_margin,
  },
  modalView: {
    marginTop: Metrics.screenHeight / 2,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: Metrics.screenWidth - 40,
    alignSelf: 'center',
  },
  filterbutton: {
    marginTop: 20,
    backgroundColor: Colors.primaryColor,
    borderRadius: Metrics.buttonRadius,
    padding: 10,
  },
  filterbuttonText: {
    fontFamily: Fonts.primary,
    fontSize: Fonts.size.medium,
    color: ColorsLight.primaryWhite,
    textAlign: 'center',
  },
});

export const genderInput = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: ColorsLight.grey2,
    borderRadius: Metrics.small_buttonRadius,
    marginBottom: Metrics.medium_margin,
    // Additional styles
  },
  picker: {
    height: 50, // Set your desired picker height
    width: '100%',
    // Additional styles
  },
  // ... other styles ...
});

// styles of Organisms,
export const taskOffersCard = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: ColorsLight.primaryWhite,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 6,
    borderRadius: 24,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: '1.5%',
    alignItems: 'flex-start',
  },
  avatar: {
    width: screenWidth * 0.22,
    height: screenWidth * 0.22,
    borderRadius: (screenWidth * 0.22) / 2,
    alignSelf: 'flex-start',
  },

  eachContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '100%',
  },
});

export const datetime = StyleSheet.create({
  main: {
    alignItems: 'start',
    justifyContent: 'start',
    alignSelf: 'flex-start',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  select: {
    color: Colors.primaryColor,
    // marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.secondaryColor,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 1005,
  },
  pickerContainer: {
    alignSelf: 'flex-start',
  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: 20,
  },
  timeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    padding: 10,
    borderRadius: 5,
    flexGrow: 1,
    marginRight: 10,
  },
  selectButton: {},
  amPmContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  amPmButton: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  amPmButtonActive: {
    backgroundColor: Colors.primaryColor,
  },
  amPmText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.background,
  },
});

export const bottomsheet = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: ColorsLight.primaryWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: ColorsLight.backgroundColor,
    width: '100%',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: ColorsLight.green3,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 60,
    height: 40,
    marginHorizontal: 4,
    textAlign: 'center',
    borderRadius: 4,
    color: ColorsLight.primaryBlack,
    fontSize: 16,
  },
  resendTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendButtonText: {
    fontSize: 16,
    color: ColorsLight.primaryBlack,
  },
  resendText: {
    fontSize: 16,
    color: ColorsLight.grey2,
  },
});

export const popupModel = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%', // Adjust as needed
  },
});
