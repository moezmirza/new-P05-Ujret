// Service Provider Info Screen

// Import React and Component
import {useEffect, useState} from 'react';
import {View, Button, Text, Alert} from 'react-native';

// Components
import PrimaryButton from '../components/atoms/buttons/primary_button';
import LargeBtn from '../components/atoms/buttons/large_btn';
import ServiceButton from '../components/atoms/buttons/service_button';
import {Module_list} from '../components/molecules/modules_list';
import TopBackStrip from '../components/molecules/top_back_button_strip';

// Themes
import {ColorsLight} from '../themes/colors';
import {Metrics} from '../themes/metrics';

// Redux
import {useSelector} from 'react-redux';
import {selectHandymenCategories} from '../stores/handymen_categories_slice';

// MultiSelect
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Styles
import {
  H6XSmallStyles,
  H5SmallStyles,
  H3MainStyles,
  inputFieldStyles,
  registerMoreInfoScreenStyle,
} from '../themes/styles';
import {serviveModeScreen} from '../themes/allscreens/service_mode_screen';

// Utilities
import {catListChangeToSmallCase} from '../utils/utilities';

// Component definition
const ServiceProviderInfo = ({navigation}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Get from Redux Store
  const categoriesList = useSelector(selectHandymenCategories);
  const handymanInfo = useSelector(state => state.handyman.handymanInfo);

  useEffect(() => {
    console.log('categoriesList:', categoriesList);
    console.log('handymanInfo on service_provider_info Sreen:', handymanInfo);
  }, []);

  // Updating selected categories if handynan exists
  useEffect(() => {
    if (handymanInfo) {
      const list1 = catListChangeToSmallCase(handymanInfo.categories);
      setSelectedCategories(getCategoriesIdsFromNames(categoriesList, list1));
    }
  }, [handymanInfo]);

  // Function to get Names of selected categories
  const getSelectedCategoriesNames = (originalArray, idsArray) => {
    const selectedCategories = originalArray.filter(item =>
      idsArray.includes(item.id),
    );
    return selectedCategories.map(item => item.name);
  };

  // Function to get IDs of redux saved handynan.categories according to the categoriesList
  const getCategoriesIdsFromNames = (originalArray, namesArray) => {
    const selectedCategories = originalArray.filter(item =>
      namesArray.includes(item.name),
    );
    return selectedCategories.map(item => item.id);
  };

  const handleSubmitNext = () => {
    const selectedCategoriesNames = getSelectedCategoriesNames(
      categoriesList,
      selectedCategories,
    );
    console.log('Selected: ', selectedCategoriesNames);
    if (selectedCategoriesNames.length === 0) {
      Alert.alert(
        'Input Warning',
        'Please select at least one category from Handymen dropdown',
      );
    } else {
      navigation.navigate(
        handymanInfo ? 'UpdateProfessionalInfoScreen' : 'ProfessionalInfo',
        {
          categories: selectedCategoriesNames,
        },
      );
    }
  };

  // Rendering UI
  return (
    <View style={[serviveModeScreen.container, {padding: Metrics.baseMargin}]}>
      {/* <Text style={{...H6XSmallStyles.textStyle, color: ColorsLight.red1}}>
        You are not registered as Service Provider
      </Text> */}
      <TopBackStrip
        navigation={navigation}
        lastScreen={'EditProfile'}></TopBackStrip>
      <Text
        style={{
          ...H3MainStyles.textStyle,
          marginTop: -20,
          color: ColorsLight.primaryBlack,
        }}>
        {handymanInfo ? 'Update' : 'Create'} Services Profile
      </Text>
      <Text
        style={{
          ...H3MainStyles.textStyle,
          marginLeft: Metrics.large_margin,
          marginRight: Metrics.large_margin,
          marginTop: Metrics.medium_margin,
        }}>
        You are currently working in the selected categories, You can Update
        your niche Below.
      </Text>

      {/* MultiSelect for selecting Handymen Services */}
      <View
        style={{
          ...inputFieldStyles.outerContainer,
          marginTop: 30,
          marginBottom: 10,
        }}>
        <SectionedMultiSelect
          items={categoriesList}
          IconRenderer={Icon}
          uniqueKey="id"
          subKey="items"
          selectedItems={selectedCategories}
          selectText={Module_list[0].name}
          searchPlaceholderText="Search Handyman Services..."
          value={selectedCategories.join(', ')}
          onSelectedItemsChange={setSelectedCategories}
          styles={{
            selectToggle: {
              display: 'flex',
              backgroundColor: ColorsLight.green7,
              width: '100%',
              height: 60,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 15,
              paddingVertical: 20,
              marginBottom: 10,
              borderRadius: 10,
              borderWidth: 1.3,
              borderColor: ColorsLight.primaryGreen,
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 3,
            },
            selectToggleText: {
              ...inputFieldStyles.textInputStyles.font,
              color: ColorsLight.primaryGreen,
            },
            chipText: {...inputFieldStyles.textInputStyles.font},
          }}
        />
      </View>
      {/* {Module_list.slice(1, 4).map((item, index) => {
        return (
          <ServiceButton
            key={`module-${index}`}
            labelText={item.name}
            // onPress={}
          />
        );
      })} */}
      <View style={registerMoreInfoScreenStyle.buttonsContainer}>
        {/* Large button for login */}
        <LargeBtn variant={'action'} text={'Next'} onPress={handleSubmitNext} />
      </View>
    </View>
  );
};

export default ServiceProviderInfo;
