import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles/ShippingStyles';
import arbol from '../data/arbol.json'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../store/actions/cartActions';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';

const provincesAndCities = arbol.reduce((result, region) => {
    region.provinces.forEach(province => {
        result[province.label] = province.towns.map(town => town.label);
    });
    return result;
}, {});


function ShippingForm({ navigation }) {
    useAndroidBackButton(navigation);
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const dispatch = useDispatch();

    const initialProvince = Object.keys(provincesAndCities)[0];
    const initialCity = provincesAndCities[initialProvince][0];

    const [recipientName, setRecipientName] = useState('');
    const [province, setProvince] = useState(initialProvince);
    const [city, setCity] = useState(initialCity);
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (shippingAddress) {
            setRecipientName(shippingAddress.recipientName || '');
            setProvince(shippingAddress.province || initialProvince);
            setCity(shippingAddress.city || initialCity);
            setPostalCode(shippingAddress.postalCode || '');
            setStreetAddress(shippingAddress.streetAddress || '');
            setComment(shippingAddress.comment || '');
        }
    }, [shippingAddress, initialProvince, initialCity]);

    const handleSubmit = () => {
        dispatch(saveShippingAddress({ recipientName, province, city, postalCode, streetAddress, comment }));
        //console.log(recipientName, province, city, postalCode, streetAddress, comment);
        navigation.navigate('PlaceOrderScreen');
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView style={styles.formContainer}>
                <Text style={styles.title}>Dirección de envio</Text>
                <View style={styles.inputField}>
                    <Text style={styles.label}>Nombre del Destinatario:</Text>
                    <TextInput
                        value={recipientName}
                        onChangeText={setRecipientName}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputField}>
                    <Text style={styles.label}>Provincia:</Text>
                    <Picker
                        selectedValue={province}
                        style={styles.quantityPicker}
                        onValueChange={(itemValue) => {
                            setProvince(itemValue)
                            setCity('')

                        }}>
                        {Object.keys(provincesAndCities).map(provinceName => (
                            <Picker.Item key={provinceName} label={provinceName} value={provinceName} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.inputField}>
                    <Text style={styles.label}>Ciudad:</Text>
                    <Picker
                        selectedValue={city}
                        style={styles.quantityPicker}
                        onValueChange={(itemValue) => {
                            setCity(itemValue);
                        }}
                    >
                        {province ? provincesAndCities[province].map(cityName => (
                            <Picker.Item key={cityName} label={cityName} value={cityName} />
                        )) : null}
                    </Picker>
                </View>
                <View style={styles.inputField}>
                    <Text style={styles.label}>Código Postal:</Text>
                    <TextInput
                        value={postalCode}
                        onChangeText={setPostalCode}
                        style={styles.input}
                        keyboardType='numeric'
                    />
                </View>
                <View style={styles.inputField}>
                    <Text style={styles.label}>Dirección:</Text>
                    <TextInput
                        value={streetAddress}
                        onChangeText={setStreetAddress}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputField}>
                    <Text style={styles.label}>Comentario:</Text>
                    <TextInput
                        value={comment}
                        onChangeText={setComment}
                        style={styles.input}
                        multiline
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.roundedButton}>
                        <Button
                            title='Siguiente'
                            onPress={handleSubmit}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}

export default ShippingForm;
