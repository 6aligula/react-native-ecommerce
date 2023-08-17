import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile, logout } from '../store/actions/userActions';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { USER_UPDATE_PROFILE_RESET } from '../store/constants/userConstants';
//import { listMyOrders } from '../actions/orderActions';
import styles from './styles/ProfileStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Message from '../components/Message';

const ProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const navigation = useNavigation();


    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    // const orderListMy = useSelector(state => state.orderListMy);
    // const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    const logoutHandler = () => {
        dispatch(logout());
        navigation.replace('LoginScreen');
    };

    useEffect(() => {
        if (!userInfo) {
            navigation.navigate('LoginScreen');
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                //dispatch(listMyOrders())
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, userInfo, user, success]);

    const submitHandler = () => {
        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            Alert.alert('Error', message);
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

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
                        <FontAwesome name="lock" size={20} color="white" />
                        <Text style={styles.logoutText}>Salir</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Perfil de Usuario</Text>
                    {message && <Text style={styles.errorMessage}>{message}</Text>}
                    {error && <Text style={styles.errorMessage}>{error}</Text>}
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
                    <TextInput
                        style={[styles.inputField, styles.input]}
                        placeholder="Introduce contraseña"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={[styles.inputField, styles.input]}
                        placeholder="Confirmar contraseña"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <Button title="Actualizar" onPress={submitHandler} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ProfileScreen;