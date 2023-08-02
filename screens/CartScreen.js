import React, { useEffect } from 'react';
import { Button, Image, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/actions/cartActions';
//import {  useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles/CartStyles';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';

function CartScreen({ navigation, route }) {

  useAndroidBackButton(navigation);
  //const route = useRoute();
  //const navigation = useNavigation();

  //const { productId } = route.params;
  const qty = route.params?.qty || 1;

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  //console.log(JSON.stringify(cartItems, null, 2));
  cartItems.forEach(item => console.log(item?.product_id));

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
          <Text style={[styles.subtitle]}>Tu carrito está vacío</Text>
        ) : (
          <>
            {cartItems.map(item => (
              <View style={styles.container} key={item.product}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>€{item.price}</Text>
                <View style={styles.quantityContainer}>
                  <Picker
                    selectedValue={item.qty}
                    style={styles.quantityPicker}
                  // onValueChange={(value) => dispatch(addToCart(item.product, Number(value)))}
                  >
                    {[...Array(item.qty).keys()].map((x) => (
                      <Picker.Item key={x + 1} label={String(x + 1)} value={x + 1} />
                    ))}
                  </Picker>
                  <View style={styles.buttonContainer}>
                    <View style={styles.roundedButton}>
                      <Button
                        title='Eliminar'
                        onPress={() => removeFromCartHandler(item.product)}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ))}
            <View style={styles.container}>
              <Text style={styles.subtitle}>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) artículos
                € {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </Text>
              <View style={styles.buttonContainer}>
                <View style={styles.roundedButton}>
                  <Button
                    title='Pagar'
                    disabled={cartItems.length === 0}
                    onPress={checkoutHandler}
                  />
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )

}

export default CartScreen;