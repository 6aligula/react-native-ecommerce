import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import styles from './styles/PlaceOrderScreenStyles';
import Message from '../components/Message';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';

const PlaceOrderScreen = ({navigation}) => {
    useAndroidBackButton(navigation);

    //const orderCreate = useSelector(state => state.orderCreate);
    //const { order, error, success } = orderCreate;

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    //cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
    cart.taxPrice = Number((0.021) * cart.itemsPrice).toFixed(2);
    cart.totalPrice = (Number(cart.itemsPrice)).toFixed(2);
    //cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);
    
    // if (!cart.paymentMethod) {
    //     navigation.navigate('Payment');
    // }

    // useEffect(() => {
    //     if (success) {
    //         navigation.navigate('Order', { id: order._id });
    //         dispatch({ type: ORDER_CREATE_RESET });
    //     }
    // }, [success, navigation, dispatch]);

    // const placeOrder = () => {
    //     dispatch(createOrder({
    //         orderItems: cart.cartItems,
    //         shippingAddress: cart.shippingAddress,
    //         paymentMethod: cart.paymentMethod,
    //         itemsPrice: cart.itemsPrice,
    //         shippingPrice: cart.shippingPrice,
    //         taxPrice: cart.taxPrice,
    //         totalPrice: cart.totalPrice,
    //     }));
    // };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.addressSection}>
                    <Text style={styles.addressTitle}>Dirección de Envio</Text>
                    <Text style={styles.addressDetails}>{cart.shippingAddress.streetAddress}, {cart.shippingAddress.province}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode} </Text>
                </View>

                {/* Payment Method */}
                {/* <View style={styles.paymentSection}>
                    <Text style={styles.paymentTitle}>Metodo de pago</Text>
                    <Text style={styles.paymentDetails}>{cart.paymentMethod}</Text>
                </View> */}

                {/* Order Items */}
                <View style={styles.orderSection}>
                    <Text style={styles.orderTitle}>Productos a pedir</Text>
                    {cart.cartItems.length === 0 ? (
                        <Message variant='info'>Tu cesta esta vacia</Message>
                    ) : (
                        cart.cartItems.map((item, index) => (
                            <View key={index} style={styles.itemContainer}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>{item.qty} X €{item.price} = €{(item.qty * item.price).toFixed(2)}</Text>
                            </View>
                        ))
                    )}
                </View>

                {/* Order Summary */}
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryTitle}>Resumen del pedido</Text>
                    <Text style={styles.summaryItem}>Articulos: €{cart.itemsPrice}</Text>
                    {/* <Text style={styles.summaryItem}>Envio: €{cart.shippingPrice}</Text> */}
                    
                    <Text style={styles.summaryItem}>Total: €{cart.totalPrice}</Text>
                    {/* {error && <Message variant='danger'>{error}</Message>} */}
                    {/* <TouchableOpacity style={styles.placeOrderButton} disabled={cart.Items === 0} onPress={placeOrder}>
                        <Text style={styles.placeOrderButtonText}>Proceder a pagar</Text>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
        </View>
    );
};

export default PlaceOrderScreen;
