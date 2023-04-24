import React from 'react';
import { View, Text, Image } from 'react-native';
import Rating from '../components/Rating';
import styles from './styles/ProductStyle';
import { useColorSchemeContext } from '../ColorSchemeContext';

const Product = ({ product }) => {
  const {stylesGlobal} = useColorSchemeContext();
  return (
    <View style={[styles.card, stylesGlobal.background]}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={[styles.cardBody]}>
        <Text style={[styles.title, stylesGlobal.text]}>{product.name}</Text>
        <View style={styles.rating}>
          <Rating value={product.rating} />
          <Text style={stylesGlobal.text}>{`${product.numReviews} reviews`}</Text>
        </View>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </View>
  );
};
export default Product;
