import React, { useEffect } from 'react';
import { Button, Image, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/actions/cartActions';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles/CartStyles';

function CartScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const productId = route.params?.id || null;
  const qty = route.params?.qty || 1;

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  //console.log(JSON.stringify(cartItems, null, 2));
  cartItems.forEach(item => console.log(item?.product_id));

  // useEffect(() => {
  //   dispatch(checkAvailableStock(cartItems[0]?.product_id));

  // }, [dispatch, productId]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigation.navigate('Shipping');
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView>
        <Text style={[styles.title]}>Cesta</Text>
        {cartItems.length === 0 ? (
          <Text>
            Tu carrito esta vacio
          </Text>
        ) : (
          cartItems.map(item => (
            <View style={styles.container} key={item.product}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>€{item.price}</Text>
              <View style={styles.quantityPicker}>
                <Picker
                  selectedValue={item.qty}
                // onValueChange={(value) => dispatch(addToCart(item.product, Number(value)))}
                >
                  {[...Array(item.qty).keys()].map((x) => (
                    <Picker.Item key={x + 1} label={String(x + 1)} value={x + 1} />
                  ))}
                </Picker>
              </View>

              <View style={styles.buttonContainer}>
                <View style={styles.roundedButton}>
                  <Button 
                  style={styles.roundedButton} 
                  title='Remove' 
                  onPress={() => removeFromCartHandler(item.product)} 
                  />
                  
                </View>
              </View>

            </View>
          ))
        )}
        <Text>
          Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) articulos
          € {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
        </Text>
        <Button
          title='Pagar'
          disabled={cartItems.length === 0}
          onPress={checkoutHandler}
        />
      </ScrollView>

    </SafeAreaView>
  )
}

export default CartScreen;