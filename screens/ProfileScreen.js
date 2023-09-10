import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile, logout } from '../store/actions/userActions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { USER_UPDATE_PROFILE_RESET } from '../store/constants/userConstants';
import { listMyOrders } from '../store/actions/orderActions';
import styles from './styles/ProfileStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Message from '../components/Message';
import PasswordInput from '../components/PasswordInput';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';
import Loader from '../components/Loader';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = ({ navigation }) => {
    useAndroidBackButton(navigation);

    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
        confirmPassword: '',
        //... otros campos si es necesario
    });

    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success, errorProfile } = userUpdateProfile;


    const logoutHandler = () => {
        dispatch(logout());
        navigation.reset({
            index: 1,
            routes: [
                { name: 'HomeScreen' },
                { name: 'LoginScreen' },
            ],
        });
    };

    const navigateToMyOrders = () => {
        navigation.navigate('MyOrdersScreen');
    }

    useEffect(() => {
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
                setFormData({
                    name: user.name,
                    email: user.email
                });
            }
        }
        return () => {
        }
    }, [dispatch, userInfo, user, success])


    const submitHandler = () => {
        const trimmedPassword = formData.password.trim();
        const trimmedConfirmPassword = formData.confirmPassword.trim();
        if (trimmedPassword !== trimmedConfirmPassword) {
            setMessage('Las contraseñas no coinciden');

        } else {
            //console.log('actualizando');
            dispatch(updateUserProfile({
                ...formData,
                'id': user._id,
            }));
            setMessage('');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
                            <FontAwesome name="lock" size={20} color="white" />
                            <Text style={styles.logoutText}>Salir</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.myOrdersButton} onPress={navigateToMyOrders}>
                            <FontAwesome name="list-ul" size={20} color="white" />
                            <Text style={styles.logoutText}>Mis Pedidos</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.title}>Perfil de Usuario</Text>
                    {message && <Message variant='danger'>{message}</Message>}
                    {errorProfile && <Message variant='danger'>{errorProfile}</Message>}
                    {successMessage && <Message variant='success'>{successMessage}</Message>}
                    {loading && <Text>Cargando...</Text>}

                    <TextInput
                        style={[styles.inputField, styles.input]}
                        placeholder="Introduce nombre"
                        value={formData.name}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, name: value }))}
                    />
                    <TextInput
                        style={[styles.inputField, styles.input]}
                        placeholder="Introduce email"
                        value={formData.email}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, email: value }))}
                        key="uniqueKeyEmail"
                    />
                    <PasswordInput
                        value={formData.password}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, password: value }))}
                        placeholder="Introduce contraseña"
                        key="uniqueKeyPass"
                    />
                    <PasswordInput
                        placeholder="Confirmar contraseña"
                        value={formData.confirmPassword}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, confirmPassword: value }))}
                        key="uniqueKeyConfir"
                    />
                    <Button title="Actualizar" onPress={submitHandler} />
                </View>

            </ScrollView>

        </SafeAreaView>
    );
}
export default ProfileScreen;