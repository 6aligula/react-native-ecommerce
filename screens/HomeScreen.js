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
import { useColorSchemeContext } from '../ColorSchemeContext';

const HomeScreen = ({ navigation }) => {
  const { stylesGlobal } = useColorSchemeContext();

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

  return (
    <View style={[styles.container, stylesGlobal.background]}>
      <SearchBox navigation={navigation} />
      {/* {searchError && <Message variant="danger">{searchError}</Message>} */}
      <Text style={[styles.title, stylesGlobal.text]}>Últimos productos</Text>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        products && (
          <FlatList
            style={stylesGlobal.background}
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.productList}
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

    </View>
  );
};
export default HomeScreen;
