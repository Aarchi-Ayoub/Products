import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import {request} from 'utils/interceptor';
import {useQuery} from 'react-query';
import Product from '../Product';

// Fetch data
const fetchProducts = skip => {
  return request({url: `/products?limit=10&skip=${skip}`});
};
export default () => {
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

  // Product
  const renderItem = item => {
    return <Product data={item} />;
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
  return (
    <View style={styles.container}>
      <FlatList
        data={data.data?.products}
        extraData={data.data?.products}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => item?.id}
        ListHeaderComponent={HeaderComponent}
        ListHeaderComponentStyle={styles.headerStlyes}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onEndReached={() => onEndReached()}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};
