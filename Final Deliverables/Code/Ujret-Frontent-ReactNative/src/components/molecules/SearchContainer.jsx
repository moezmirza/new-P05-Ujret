import React from 'react';
import {View, Image, TextInput, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import H4SubMain from '../atoms/headings/h4_sub_main';
import P2Main from '../atoms/paragraphs/p2_main';
import {ColorsLight} from '../../themes/colors';
import {ujretStyles, H4SubMainStyles, P2MainStyles} from '../../themes/styles';
import {HandymanHome} from '../../themes/styles';

const SearchContainer = ({username, setSearchText, searchText}) => {
  return (
    <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 0.5, y: 1.0}}
      locations={[0, 0.6]}
      colors={ujretStyles.moduleCon.gradientColors}
      style={HandymanHome.searchContainer}>
      <Text
        style={{
          ...H4SubMainStyles.textStyle,
          textAlign: 'left',
          color: ColorsLight.primaryWhite,
        }}>
        Hey, {username}
      </Text>
      <Text
        style={{
          ...P2MainStyles.textStyle,
          textAlign: 'left',
          color: ColorsLight.grey3,
        }}>
        Which service you're looking for?
      </Text>
      {/* <View style={HandymanHome.searchbar}>
        <Image
          source={require('../../assets/icons/search.png')}
          style={HandymanHome.searchIcon}
        />
        <TextInput
          placeholder="Search ..."
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
      </View> */}
    </LinearGradient>
  );
};

export default SearchContainer;
