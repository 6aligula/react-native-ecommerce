import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, ScrollView, Button, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { listProductDetails, checkAvailableStock } from '../store/actions/productActions';
import { addToCart } from '../store/actions/cartActions';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import styles from './styles/DetailProductStyle';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';

function DetailProductScreen({ navigation, route }) {
  useAndroidBackButton(navigation);
  const dispatch = useDispatch();
  const { productId } = route.params;
  const [qty, setQty] = useState(1);
  // const [cartChange, setCartChange] = useState(false);

  const availableStock = useSelector((state) => state.availableStock);
  const { loading_available, data } = availableStock;
  //let available_stock = availableStock ? availableStock.available_stock : null;
  //console.log('Type of available_stock:', typeof available_stock.available_stock);

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const handleAddToCart = async (productId, qty) => {
    await dispatch(addToCart(productId, qty));
    // setCartChange(!cartChange);
  };
  
  useEffect(() => {
    dispatch(checkAvailableStock(productId));
    dispatch(listProductDetails(productId));
    
  }, [dispatch, productId]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView>
        {loading ? (  
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <View style={styles.container}>
            <Text style={[styles.title]}>Detalles del producto</Text>

            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.rating}>
              <Rating value={product.rating} />
              <Text style={styles.rating}>{`${product.numReviews} reviews`}</Text>
            </View>
            <Text style={styles.productPrice}>Precio: €{product.price}</Text>
            <Text style={styles.productDescription}>Descripción: {product.description}</Text>
                <Text style={styles.productAvailability}>Disponibilidad: { data.available_stock > 0
                  ? `${data.available_stock} uds `
                  : 'Fuera de stock'}</Text>
            {data.available_stock  > 0 && (
                  <View style={styles.quantityContainer}>
                    <Text >Selecciona la cantidad:</Text>
                    <Picker
                      selectedValue={qty}
                      style={styles.quantityPicker}
                      onValueChange={(itemValue) => setQty(itemValue)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <Picker.Item key={x + 1} label={String(x + 1)} value={x + 1} />
                      ))}
                    </Picker>
                    <View style={styles.buttonContainer}>
                      <View style={styles.roundedButton}>
                        <Button
                          title="Añadir a la cesta"
                          onPress={() => handleAddToCart(productId, qty)}
                          color="white" // Cambia el color del texto a blanco
                        />
                      </View>
                    </View>
                  </View>
                )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailProductScreen;
