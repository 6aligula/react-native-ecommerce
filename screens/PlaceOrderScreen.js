import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Button, ScrollView, Image } from 'react-native';
import StripePaymentComponent from '../components/StripePaymentComponent';
import { createOrder } from '../store/actions/orderActions';
import { ORDER_CREATE_RESET } from '../store/constants/orderConstants';
import styles from './styles/PlaceOrderScreenStyles';
import Message from '../components/Message';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';

const PlaceOrderScreen = ({ navigation }) => {
    useAndroidBackButton(navigation);
    const [totalPrice, setTotalPrice] = useState(0);

    //const orderCreate = useSelector(state => state.orderCreate);
    //const { order, error, success } = orderCreate;

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    
    useEffect(() => {
        const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
        setTotalPrice(Number(itemsPrice).toFixed(2));
    }, [cart.cartItems]);

    // useEffect(() => {
    //     if (success) {
    //         navigation.navigate('Order', { id: order._id });
    //         dispatch({ type: ORDER_CREATE_RESET });
    //     }
    // }, [success, navigation, dispatch]);
    userInfo = ''
    const placeOrder = () => {
        let orderData = {
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            shippingPrice: cart.shippingPrice,
            totalPrice: totalPrice,
        };
        if (!userInfo) {
            orderData.email = email;  // Usa el email introducido previamente
        }
        dispatch(createOrder(orderData));
    };

    const handlePayment = async () => {
        // Llama a la función handlePlaceOrder de StripePaymentComponent para procesar el pago.
        // Luego, puedes confirmar el pedido, guardarlo en tu base de datos y navegar a la pantalla de confirmación.
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.addressSection}>
                        <Text style={styles.addressTitle}>Dirección de Envio</Text>
                        <Text style={styles.addressDetails}>{cart.shippingAddress.address}, {cart.shippingAddress.province}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode} </Text>
                        <Text style={styles.addressDetails}>{cart.shippingAddress.recipientName}, {cart.shippingAddress.email} {cart.shippingAddress.mobil} {cart.shippingAddress.comment} </Text>
                    </View>

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
                        <Text style={styles.summaryItem}>Total: €{totalPrice}</Text>
                    </View>

                </ScrollView>
                <View style={styles.summaryContainer}>
                    {/* <Text style={styles.summaryTitle}>Datos de tarjeta</Text>
                    <StripePaymentComponent /> */}
                    <View style={styles.buttonContainer}>
                        <View style={styles.roundedButton}>
                            <Button
                                title='Proceder al Pago'
                                onPress={placeOrder}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default PlaceOrderScreen;
