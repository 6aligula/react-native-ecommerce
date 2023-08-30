import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile, logout } from '../store/actions/userActions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { USER_UPDATE_PROFILE_RESET } from '../store/constants/userConstants';
//import { listMyOrders } from '../actions/orderActions';
import styles from './styles/ProfileStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Message from '../components/Message';
import PasswordInput from '../components/PasswordInput';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';

const ProfileScreen = ({navigation}) => {
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
                setSuccessMessage('Perfil actualizado correctamente')
                //dispatch(listMyOrders())
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, userInfo, user, success]);

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

    return (
        <SafeAreaView>
            <ScrollView>
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
            </ScrollView>
        </SafeAreaView>
    );
}

export default ProfileScreen;