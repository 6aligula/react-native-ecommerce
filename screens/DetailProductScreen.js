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
import useAndroidBackButton from '../myHooks/useAndroidBackButton';

function DetailProductScreen({ navigation, route }) {
  useAndroidBackButton(navigation);

  const { productId } = route.params;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const calculateAvailableStock = () => {
    const itemInCart = cartItems.find(item => item.product === productId);
    const itemInCartQty = itemInCart ? itemInCart.qty : 0;
    return product.countInStock ? product.countInStock - itemInCartQty : 0;

  }

  const [qtyDetail, setQtyDetail] = useState(() => {
    const productInCart = cartItems.find(item => item.product === productId);
    return productInCart ? productInCart.qty : 0;
  });

  const handleAddToCart = (selectedQty) => {
    console.log("id: ", productId, "cantidad: ", selectedQty)
    dispatch(addToCart(productId, selectedQty));
  };

  useEffect(() => {
    console.log("id: ", productId, "1er usseEffect qty: ", qtyDetail)
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    const availableStock = calculateAvailableStock();
    console.log("id: ", productId, "2do useEffect qty: ", qtyDetail, 'disponible ', availableStock)

    // Si qtyDetail es cero (o no definido), lo establecemos al availableStock
    if (qtyDetail <= 0) {
      setQtyDetail(availableStock);
    } else if (typeof availableStock === "number" && !isNaN(availableStock) && availableStock < qtyDetail) {
      // Si qtyDetail es mayor que el availableStock, ajustamos qtyDetail
      console.log("id: ", productId, "dentro del if qty: ", qtyDetail, 'disponible ', availableStock)
      setQtyDetail(availableStock);
    }
  }, [product, cartItems]);

  const availableStock = calculateAvailableStock();

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
            {product && product.image ? (
              <Image source={{ uri: product.image }} style={styles.productImage} />
            ) : (
              <Loader />
            )}

            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.rating}>
              <Rating value={product.rating} />
              <Text style={styles.rating}>{`${product.numReviews} reviews`}</Text>
            </View>
            <Text style={styles.productPrice}>Precio: €{product.price}</Text>
            <Text style={styles.productDescription}>Descripción: {product.description}</Text>
            {/* Añade aquí el resto de los componentes relacionados con la lógica del componente */}
            <Text style={styles.productAvailability}>Disponibilidad: {availableStock > 0 ? `${availableStock} uds ` : 'Fuera de stock'}</Text>
            {availableStock > 0 && (
              <View style={styles.quantityContainer}>
                <Text style={styles.productDescription}>Selecciona la cantidad:</Text>
                <Picker
                  selectedValue={qtyDetail}
                  style={styles.quantityPicker}
                  onValueChange={(itemValue) => {
                    console.log("Picker cambió:", itemValue, 'qtyDetail: ', qtyDetail);
                    setQtyDetail(itemValue);
                  }}
                >
                  {[...Array(availableStock).keys()].map((x) => (
                    <Picker.Item key={x + 1} label={String(x + 1)} value={x + 1} />
                  ))}
                </Picker>
                <View style={styles.buttonContainer}>
                  <View style={styles.roundedButton}>
                    <Button
                      title="Añadir a la cesta"
                      onPress={() => handleAddToCart(qtyDetail)}
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
