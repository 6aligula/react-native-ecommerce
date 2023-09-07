import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { listProducts } from '../store/actions/productActions';
import SearchBox from '../components/SearchBox'
import styles from './styles/HomeStyles';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';
import { BackHandler } from 'react-native';
import { useColorSchemeContext } from '../ColorSchemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  useAndroidBackButton(navigation, () => {
    BackHandler.exitApp();
  });
  const {stylesGlobal}  = useColorSchemeContext();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;
  
  useFocusEffect(
    React.useCallback(() => {
      dispatch(listProducts('', 1));
    }, [dispatch])
  );


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetailProductScreen', { productId: item._id })}>
      <Product product={item} />
    </TouchableOpacity>
  );

  const CombinedHeader = () => (
    <View style={styles.container}>
      <SearchBox navigation={navigation} />
      <Text style={[styles.title, stylesGlobal.text]}>Últimos productos</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, stylesGlobal.background]}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        products && (
          <FlatList
            //style={stylesGlobal.background}
            data={products}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            ListHeaderComponent={CombinedHeader}
            numColumns={2}
          />
        )
      )}
      {!loading && products && products.length > 0 && (
        <Paginate
          pages={pages}
          page={page}
          onPageChange={(selectedPage) => dispatch(listProducts(" ", selectedPage))}
        />
      )}

    </SafeAreaView>
  );
};
export default HomeScreen;
