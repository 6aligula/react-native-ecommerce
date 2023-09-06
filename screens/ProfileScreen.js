import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile, logout } from '../store/actions/userActions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { USER_UPDATE_PROFILE_RESET } from '../store/constants/userConstants';
import { listMyOrders } from '../store/actions/orderActions';
import styles from './styles/ProfileStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Message from '../components/Message';
import PasswordInput from '../components/PasswordInput';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';
import Loader from '../components/Loader';

const ProfileScreen = ({ navigation }) => {
    useAndroidBackButton(navigation);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success, errorProfile } = userUpdateProfile;

    const orderListMy = useSelector(state => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    const logoutHandler = () => {
        dispatch(logout());
        navigation.reset({
            index: 1,
            routes: [
                { name: 'LoginScreen' },
                { name: 'HomeScreen' },
            ],
        });
    };

    useFocusEffect(
        React.useCallback(() => {
            if (!userInfo) {
                navigation.navigate('LoginScreen');
            } else {
                if (!user || !user.name || success || userInfo._id !== user._id) {
                    dispatch({ type: USER_UPDATE_PROFILE_RESET });
                    dispatch(getUserDetails('profile'));
                    setSuccessMessage('Perfil actualizado correctamente');
                    dispatch(listMyOrders());
                } else {
                    //console.log('else anidado: ', orders)
                    dispatch(listMyOrders());
                    setName(user.name);
                    setEmail(user.email);
                }
            }
            // Agrega cualquier otro código de limpieza que necesites aquí
            return () => { };
        }, [dispatch, userInfo, user, success])
    );


    const submitHandler = () => {
        const trimmedPassword = password.trim();
        const trimmedConfirmPassword = confirmPassword.trim();
        if (trimmedPassword !== trimmedConfirmPassword) {
            setMessage('Las contraseñas no coinciden');

        } else {
            //console.log('actualizando');
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }));
            setMessage('');
        }
    };
    // orders.forEach(order => {
    //     console.log("Order:", order._id, "isPaid:", order.isPaid, "paidAt:", order.paidAt, "isDelivered:", order.isDelivered, "deliveredAt:", order.deliveredAt);
    // });
    //console.log("Orders from state:", orders[0].isPaid, orders[0].paidAt, "isDelivered:", orders[0].isDelivered, orders[0].deliveredAt);
    //console.log("Orders from state:", orders);

    const renderOrderItem = ({ item: order }) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('OrderScreen', { orderId: order._id, fromProfile: true });
            }}
        >
            <View style={[styles.row, styles.rowCell]}>
                <Text style={[styles.cell, styles.cellID]}>{order._id}</Text>
                <Text style={[styles.cell, styles.cellFecha]}>{order.createAt.substring(0, 10)}</Text>
                <Text style={[styles.cell, styles.cellTotal]}>{order.totalPrice}</Text>
                <Text style={[styles.cell, styles.cellPagado]}>
                    {order.isPaid ? (order.paidAt ? order.paidAt.substring(0, 10) : 'Pagado sin fecha') : '❌'}
                </Text>
                <Text style={[styles.cell, styles.cellEnviado]}>
                    {order.isDelivered ? (order.deliveredAt ? order.deliveredAt.substring(0, 10) : 'Enviado sin fecha') : '❌'}</Text>
            </View>

        </TouchableOpacity>
    );

    const renderOrderHeader = () => (
        <View>
            <Text style={styles.title}>Mis Pedidos</Text>
            <View style={styles.row}>
                <Text style={[styles.headerCell, styles.cellID]}>ID</Text>
                <Text style={[styles.headerCell, styles.cellFecha]}>Fecha</Text>
                <Text style={[styles.headerCell, styles.cellTotal]}>Total</Text>
                <Text style={[styles.headerCell, styles.cellPagado]}>Pagado</Text>
                <Text style={[styles.headerCell, styles.cellEnviado]}>Enviado</Text>
            </View>
        </View>
    );

    const UserProfileHeader = () => (
        <View style={styles.container}>
            <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
                <FontAwesome name="lock" size={20} color="white" />
                <Text style={styles.logoutText}>Salir</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Perfil de Usuario</Text>
            {message && <Message variant='danger'>{message}</Message>}
            {errorProfile && <Message variant='danger'>{errorProfile}</Message>}
            {successMessage && <Message variant='success'>{successMessage}</Message>}
            {loading && <Text>Cargando...</Text>}

            <TextInput
                style={[styles.inputField, styles.input]}
                placeholder="Introduce nombre"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={[styles.inputField, styles.input]}
                placeholder="Introduce email"
                value={email}
                onChangeText={setEmail}
            />
            <PasswordInput
                value={password}
                onChangeText={setPassword}
                placeholder="Introduce contraseña"
            />
            <PasswordInput
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Button title="Actualizar" onPress={submitHandler} />
        </View>
    );

    const CombinedHeader = () => (
        <View>
            <UserProfileHeader />
            {renderOrderHeader()}
        </View>
    );
    return (
        <SafeAreaView style={styles.safeArea}>

            {loadingOrders ? (
                <Loader />
            ) : errorOrders ? (
                <Message variant='danger'>{errorOrders}</Message>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item._id}
                    renderItem={renderOrderItem}
                    ListHeaderComponent={CombinedHeader}
                />
            )}

        </SafeAreaView>
    );
}

export default ProfileScreen;