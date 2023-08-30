import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles/OrderStyles';
// import { getOrderDetails, payOrder, deliverOrder } from '../store/actions/orderActions';
import { getOrderDetails } from '../store/actions/orderActions';
//import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../store/constants/orderConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import StripePaymentComponent from '../components/StripePaymentComponent';
// Importa otros componentes de React Native que necesites

const OrderScreen = ({ navigation, route }) => {
    useAndroidBackButton(navigation);

    const id = route.params.id
    const dispatch = useDispatch();

    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, error, loading } = orderDetails;

    // const orderPay = useSelector(state => state.orderPay);
    // const { loading: loadingPay, success: successPay } = orderPay;

    // const orderDeliver = useSelector(state => state.orderDeliver);
    // const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    let itemsPrice;
    if (order && order.orderItems) {
        itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    }

    useEffect(() => {

        if (!userInfo) {
            navigation.navigate('LoginScreen');
        }

        if (!order || order._id !== Number(id)) {
            // dispatch({ type: ORDER_PAY_RESET })
            // dispatch({ type: ORDER_DELIVER_RESET })

            dispatch(getOrderDetails(id))

        }

    }, [dispatch, order, id, userInfo])

    // useEffect(() => {

    //     if (!userInfo) {
    //         navigation.navigate('LoginScreen');
    //     }

    //     if (!order || successPay || order._id !== Number(id) || successDeliver) {
    //         dispatch({ type: ORDER_PAY_RESET })
    //         dispatch({ type: ORDER_DELIVER_RESET })

    //         dispatch(getOrderDetails(id))

    //     } else if (!order.isPaid) {
    //         setSdkReady(true)
    //     }

    // }, [dispatch, order, id, successPay, successDeliver, userInfo])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }
    return loading ? (
        <Loader />
    ) : error ? (
        <View>
            {error && <Message variant='danger'>{error}</Message>}
        </View>
    ) : (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Pedido: {order._id}</Text>
                <View>
                    <View>
                        <Text style={styles.subTitle}>Dirección de Envio</Text>
                        <Text style={styles.description}>Destinatario: {order.user.name}</Text>
                        <Text style={styles.description}>Email: {order.user.email}</Text>
                        <Text style={styles.description}>Dirección: {order.shippingAddress.province}, {order.shippingAddress.city}, {order.shippingAddress.address}, {order.shippingAddress.postalCode}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {order.isDelivered ? (
                            <Message variant='success'>Enviado {order.deliveredAt.substring(0, 10)}</Message>
                        ) : (
                            <Message variant='info'>No enviado {order.deliveredAt}</Message>
                        )}
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {order.isPaid ? (
                        <Message variant='success'>Pagado {order.paidAt.substring(0, 10)}</Message>
                    ) : (
                        <Message variant='info'>Sin pagar {order.paidAt}</Message>
                    )}
                </View>

                <View>
                    <Text style={styles.subTitle}>Productos a enviar</Text>
                    {order.orderItems.length === 0 ? <Message variant='danger'>
                        Tu pedido esta vacio
                    </Message> : (
                        <View>
                            {order.orderItems.map((item, index) => (
                                <View key={index}>
                                    <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 5 }} />
                                    <TouchableOpacity onPress={() => navigation.navigate('DetailProductScreen', { productId: item.product })}>
                                        <Text style={styles.productName}>{item.name}</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.productName}>
                                        {item.qty}uds X  {item.price}€ = {(item.qty * item.price).toFixed(2)}€
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                <View>
                    <Text style={styles.subTitle}>Resumen del pedido</Text>
                    <Text style={styles.description}>Articulos: {itemsPrice}€</Text>
                    <Text style={styles.description}>Envio: {order.shippingPrice}€</Text>
                    <Text style={styles.description}>Total: {order.totalPrice}€</Text>
                </View>
                <View>
                
                    {/* {!order.isPaid && (
                        <View>
                            {loadingPay && <Loader />}

                            {sdkReady ? (
                                <StripePaymentComponent/>
                            ) : (
                                <Loader />
                            )}
                        </View>
                    )} */}
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

export default OrderScreen;
