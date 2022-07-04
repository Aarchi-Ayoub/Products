import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {request} from 'utils/interceptor';
import {useQuery} from 'react-query';
import FastImage from 'react-native-fast-image';
import {Swipeable} from 'react-native-gesture-handler';
// comp
import Product from '../Product';
// styles
import {styles} from './styles';

// Fetch data
const fetchProducts = skip => {
  return request({url: `/products?limit=10&skip=${skip}`});
};

export default ({navigation}) => {
  // Local state
  const [skip, setSkip] = useState(0);

  // Query
  const {data, isError, error, isLoading} = useQuery(
    ['fetch-products', skip],
    () => fetchProducts(skip),
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

  // Header
  const HeaderComponent = () => {
    return (
      <View>
        <Text style={styles.header}>Store Products</Text>
        <View style={skip > 0 && styles.paginateActions}>
          {skip > 0 && (
            <TouchableOpacity
              style={styles.previous}
              onPress={() => setSkip(skip - 10)}>
              <Text style={styles.paginate}>Back</Text>
            </TouchableOpacity>
          )}
          {data.data?.total > skip && (
            <TouchableOpacity
              style={styles.next}
              onPress={() => setSkip(skip + 10)}>
              <Text style={styles.paginate}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  // Close previous helpers
  let row = [];
  let prevOpenedRow;

  // Product item
  const renderItem = ({item, index}) => {
    // Close previous
    const closeRow = index => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };
    const renderLeftActions = () => {
      return (
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Delete item',
              'Are you sur that you want to delete this item',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
            )
          }
          style={styles.swip}>
          <FastImage
            style={styles.delete}
            source={require('assets/delete.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      );
    };
    return (
      <Swipeable
        key={item?.id}
        friction={2}
        leftThreshold={80}
        ref={ref => (row[index] = ref)}
        onSwipeableOpen={() => {
          closeRow(index);
          console.log('Swipeable', item?.id);
        }}
        renderLeftActions={renderLeftActions}>
        <Product data={item} navigation={navigation} />
      </Swipeable>
    );
  };

  // Separator
  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  // List more
  const onEndReached = () => {
    if (data.data?.total > skip) {
      setSkip(skip + 10);
    } else {
      return;
    }
  };

  // Empty list
  const ListEmptyComponent = () => {
    return (
      <View style={styles.empty}>
        <FastImage
          style={styles.file}
          source={require('assets/file.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.noData}>No data available...</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data.data?.products}
        extraData={data.data?.products}
        showsVerticalScrollIndicator={false}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item?.id}
        ListHeaderComponent={HeaderComponent}
        ListHeaderComponentStyle={styles.headerStlyes}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyComponent}
        onEndReached={() => onEndReached()}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};
