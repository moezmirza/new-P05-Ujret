// Renting Home Screen
// React imports
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import {Icon} from 'react-native-elements';

// Styles
import {
  registerMoreInfoScreenStyle,
  inputFieldStyles,
  H5SmallStyles,
  H3MainStyles,
  H4SubMainStyles,
  H6XSmallStyles,
  H7XXSmallStyles,
  P2MainStyles,
  P3SmallStyles,
} from '../themes/styles';

// Themes and Colors and constants
import {Spacing, Metrics} from '../themes/metrics';
import {ColorsLight} from '../themes/colors';

// Components
import TopBackStrip from '../components/molecules/top_back_button_strip';
import LargeBtn from '../components/atoms/buttons/large_btn';

// Redux
import {useSelector, useDispatch} from 'react-redux';

// APIs
import {fetchAllTools, fetchMyTools} from '../api_layer/renting_api';

// Utils
import {
  calculateElapsedTimeInDays,
  catListChangeToSmallCase,
} from '../utils/utilities';

// Screen Component definition
const RentingHomeScreen = ({navigation}) => {
  // State Variables
  const [refreshing, setRefreshing] = useState(false);
  const [myTools, setMyTools] = useState(false);
  const [availableFilters, setAvailableFilters] = useState('All');
  const [toolsList, setToolsList] = useState([]);
  const [filteredToolsList, setFilteredToolsList] = useState([]);
  // const [toolsLoading, setToolsLoading] = useState(true);

  // Redux state
  const userInfo = useSelector(state => state.user.userInfo);
  // console.log('userInfo on Renting Hone:', userInfo);

  // Fetch tools handler
  const handleFetchTools = async () => {
    console.log('handleFetchTools Called with userInfo.uid:', userInfo.uid); // user id
    try {
      const response = await fetchAllTools(userInfo.uid);

      // Check if response.data is an array
      if (Array.isArray(response.data)) {
        setToolsList(response.data);
        setFilteredToolsList(response.data);
        setMyTools(false);
      } else {
        throw new Error('Response is not a list');
      }
    } catch (error) {
      Alert.alert('Info', 'Error in handleFetchTools:');
    }
  };

  // Handle Fetch my Tools
  const handleFetchMyTools = async () => {
    console.log('handleFetchMyTools Called with userInfo.uid:', userInfo.uid); // user id
    try {
      const response = await fetchMyTools(userInfo.uid);

      // Check if response.data is an array
      if (Array.isArray(response.data)) {
        // console.log('My Tools:', response.data);
        setToolsList(response.data);
        setFilteredToolsList(response.data);
        setMyTools(true);
      } else {
        throw new Error('Response is not a list');
      }
    } catch (error) {
      Alert.alert('Info', 'Error in handleFetchMyTools:');
    }
  };

  // Handle Switching tools
  const handleSwitchTools = () => {
    if (myTools) {
      setFilteredToolsList([]);
      handleFetchTools();
    } else {
      setFilteredToolsList([]);
      handleFetchMyTools();
    }
  };

  // Handle Refreshing
  const handleRefreshing = () => {
    setRefreshing(true);
    if (myTools) {
      setFilteredToolsList([]);
      handleFetchMyTools();
    } else {
      setFilteredToolsList([]);
      handleFetchTools();
    }
    setRefreshing(false);
  };

  // Handle Tool Click
  const handleToolClick = tool => {
    console.log('Tool Clicked:', tool);
    if (tool.renterId === userInfo.uid) {
      navigation.navigate('EditRentingTool', {tool});
    } else {
      navigation.navigate('ToolDetailScreen', {tool});
    }
  };

  // Fetching tools using useEffect
  useEffect(() => {
    handleFetchTools();
  }, [navigation]);

  return (
    <ScrollView
      contentContainerStyle={styles.screenContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefreshing} />
      }>
      <TopBackStrip navigation={navigation} lastScreen={'Ujret'} />
      <Text style={styles.screenTitle}>Renting Home Screen</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn1}
          onPress={() => {
            navigation.navigate('AddRentingToolScreen');
          }}>
          <Text style={styles.btn1Text}>Add Tool</Text>
          <Icon
            name="plus"
            type="font-awesome-5"
            size={styles.btn1Text.fontSize}
            color={styles.btn1Text.color}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn1}
          onPress={() => {
            handleSwitchTools();
          }}>
          {/* If i in ny tools, then button will CTA All tools */}
          <Text style={styles.btn1Text}>
            {myTools ? 'All Tools' : 'My Tools'}
          </Text>
          <Icon
            name="list"
            type="font-awesome-5"
            size={styles.btn1Text.fontSize}
            color={styles.btn1Text.color}
          />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.filterContainer}>
        <Text>Filters</Text>
        <Text>Filters</Text>
      </View> */}
      {filteredToolsList.length === 0 ? (
        <Text style={{...styles.screenTitle, marginTop: 64}}>
          Loading Tools...
        </Text>
      ) : (
        <View style={styles.toolsContainer}>
          {filteredToolsList.map(tool => (
            <TouchableOpacity
              style={styles.singleTool}
              key={tool.id}
              onPress={() => {
                handleToolClick(tool);
              }}>
              <View style={styles.toolInfoRow}>
                <Text style={styles.label}>Tool Title</Text>
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
          ))}
        </View>
      )}
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
  toolsContainer: {
    marginTop: Metrics.basePadding + Metrics.mediumPadding,
    gap: Metrics.basePadding,
    justifyContent: 'center',
    alignItems: 'center',
    width: '98%',
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: Metrics.basePadding,
    justifyContent: 'space-between',
  },
  filterContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: Metrics.basePadding,
    justifyContent: 'space-between',
    backgroundColor: ColorsLight.primaryWhite,
    shadowColor: ColorsLight.primaryBlack,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: Metrics.basePadding,
    borderRadius: 100,
  },
  btn1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Metrics.mediumPadding,
    alignContent: 'center',
    backgroundColor: ColorsLight.green7,
    paddingVertical: Metrics.smallPadding,
    paddingHorizontal: Metrics.mediumPadding + Metrics.smallPadding,
    borderRadius: Metrics.buttonRadius,
    borderColor: ColorsLight.primaryGreen,
    borderWidth: 1,
    shadowColor: ColorsLight.primaryGreen,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  btn1Text: {
    ...H4SubMainStyles.textStyle,
    margin: 0,
    marginTop: 3,
    padding: 0,
    color: ColorsLight.primaryGreen,
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
});

// Exporting the component
export default RentingHomeScreen;
