import React from 'react';
import { View, Text } from 'react-native';
import { CardField } from '@stripe/stripe-react-native';

const StripePaymentComponent = () => {

    const handlePlaceOrder = async () => {
        // Lógica para comunicarte con tu servidor, crear un PaymentIntent, obtener el client_secret y confirmar el pago.
    };

    return (
        <View style={{ flexDirection: 'column' }}>
            <CardField
                postalCodeEnabled={false}
                placeholders={{ number: '4242 4242 4242 4242' }}
                cardStyle={{
                    backgroundColor: '#F0F0F0',
                    textColor: '#333333'
                }}
                style={{ width: '100%', height: 50, marginVertical: 30 }}
                onCardChange={(cardDetails) => {
                    console.log('cardDetails', cardDetails);
                }}
                onFocus={(focusedField) => {
                    console.log('focusField', focusedField);

                }}
            />
        </View>
    );
}

export default StripePaymentComponent;