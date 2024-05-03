import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import {HandymanHome} from '../../themes/styles';
import {useNavigation} from '@react-navigation/native';

const ServiceItem = ({item}) => {
  const navigation = useNavigation();
  if (!item) {
    return null;
  }
  const handleServicePress = () => {
    if (item.name === 'More') {
      // setShowMore(!showMore);
      console.log('show more Selected');
    } else {
      // Navigate to the ServiceDetail screen with the service data
      navigation.navigate('ServiceDetail', {service: item});
    }
  };
  return (
    <TouchableOpacity
      onPress={handleServicePress}
      style={HandymanHome.serviceItem}>
      <View
        style={[
          HandymanHome.serviceItemImageWrapper,
          item.name === 'More' &&
            HandymanHome.serviceItemImageWrapperPrimaryGreen,
        ]}>
        <Image
          // source={require('../../assets/icons/Electrician_icon.png')}
          // source={{ uri: item.icon }}
          source={item.icon}
          style={HandymanHome.serviceItemImage}
        />
      </View>
      <Text style={HandymanHome.serviceName}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default ServiceItem;
