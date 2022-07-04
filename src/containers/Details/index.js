import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import {useQuery} from 'react-query';

import styles from './styles';

import {request} from 'utils/interceptor';
import Config from 'config/api';
const {API} = Config;

// Fetch data
const fetchProduct = id => {
  return request({url: `/products/${id}`});
};

export default props => {
  // Get the passing id
  const itemId = props?.route?.params?.itemId;

  // Query
  const {data, isError, error, isLoading} = useQuery(
    ['fetch-product', itemId],
    () => fetchProduct(itemId),
  );

  // Loading case
  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={'red'} size="large" />
      </View>
    );
  }
  // Error case
  if (isError) {
    return (
      <View style={styles.loader}>
        <Text style={styles.error}>Error :{error?.message || error}</Text>
      </View>
    );
  }

  // Extract product data
  const {data: product} = data;

  // Swiper Image
  const swiperRender = () => {
    return (
      <Swiper
        height={500}
        loadMinimalLoader={<ActivityIndicator size={'large'} color="red" />}
        style={styles.wrapper}
        paginationStyle={styles.paginationStyle}
        loop={true}>
        {product?.images?.map((img, i) => {
          return (
            <FastImage
              style={styles.image}
              source={{
                uri: img,
              }}
              key={i}
              resizeMode={FastImage.resizeMode.contain}
            />
          );
        })}
      </Swiper>
    );
  };

  // Product infos
  const infosRender = () => {
    return (
      <View style={styles.content}>
        <Text style={styles.desc}>
          <Text style={styles.label}>Brand :</Text>
          {'   ' + product?.brand}
        </Text>
        <Text style={styles.desc}>
          <Text style={styles.label}>Category :</Text>
          {'   ' + product?.category}
        </Text>
        <Text style={styles.desc}>
          <Text style={styles.label}>Description :</Text>
          {'   ' + product?.description}
        </Text>
        <Text style={styles.desc}>
          <Text style={styles.label}>Discount :</Text>
          <Text style={styles.discount}>
            {'   -' + product?.discountPercentage + '%'}
          </Text>
        </Text>
        <Text style={styles.desc}>
          <Text style={styles.label}>Price :</Text>
          {'   ' + product?.price}$
        </Text>
      </View>
    );
  };

  // Share Product
  const shareRender = () => {
    // Share action
    const onShare = async () => {
      try {
        const result = await Share.share({
          message: `${API}/products/${product?.id}`,
        });
        // Handel share action response
        switch (result.action) {
          case Share.sharedAction:
            Alert.alert('Share with success');
            break;
          case Share.dismissedAction:
            Alert.alert('Share was canceled');
            break;
          default:
            break;
        }
      } catch (error) {
        alert(error.message);
      }
    };
    // Type of share
    const shareAction = arg => {
      const {type, data} = arg;
      switch (type) {
        case 'call':
          Linking.openURL(`tel:${data}`);
          break;
        case 'chat':
          Linking.openURL(`sms:${data}`);
          break;
        case 'share':
          onShare();
          break;
        default:
          break;
      }
    };
    return (
      <View style={styles.options}>
        <TouchableOpacity
          onPress={() => shareAction({type: 'call', data: '+212690091821'})}
          style={styles.option}>
          <FastImage
            style={styles.opt}
            source={require('assets/call.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => shareAction({type: 'chat', data: '+212690091821'})}
          style={styles.option}>
          <FastImage
            style={styles.opt}
            source={require('assets/chat.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => shareAction({type: 'share', data: product?.id})}
          style={styles.option}>
          <FastImage
            style={styles.opt}
            source={require('assets/share.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      {swiperRender()}
      {infosRender()}
      {shareRender()}
    </ScrollView>
  );
};
