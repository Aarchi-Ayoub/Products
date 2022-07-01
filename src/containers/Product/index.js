import React from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';

export default ({data}) => {
  console.log(data);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data?.title}</Text>
      <View style={styles.row}>
        <FastImage
          style={styles.thumbnail}
          source={{
            uri: data?.thumbnail,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.text}>
          <Text style={styles.description}>{data?.description}</Text>
          <Text style={styles.price}>{data?.price} $</Text>
        </View>
      </View>
      <View style={styles.starRow}>
        <Text style={styles.rating}>{data?.rating}</Text>
        <FastImage
          style={styles.star}
          source={require('assets/star.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </View>
  );
};
