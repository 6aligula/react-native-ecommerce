import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, ScrollView, Button, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { listProductDetails } from '../store/actions/productActions';
import { addToCart } from '../store/actions/cartActions';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import styles from './styles/DetailProductStyle';
import { useColorSchemeContext } from '../ColorSchemeContext';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';

function DetailProductScreen({ navigation, route }) {
  useAndroidBackButton(navigation);

  const { stylesGlobal } = useColorSchemeContext();
  const { productId } = route.params;
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const handleAddToCart = (productId, qty) => {
    console.log(productId, " ", qty);
    dispatch(addToCart(productId, qty));
    //navigation.navigate("CartScreen", {product: productId, qty: qty});
  };

  useEffect(() => {
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
            {/* Añade aquí el resto de los componentes relacionados con la lógica del componente */}
            <Text style={styles.productAvailability}>Disponibilidad: {product.countInStock > 0 ? `${product.countInStock} uds ` : 'Fuera de stock'}</Text>
            {product.countInStock > 0 && (
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
