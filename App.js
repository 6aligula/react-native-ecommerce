import React, { useState, useEffect } from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { ColorSchemeProvider } from './ColorSchemeContext';

import CustomHeader from './components/CustomHeader';
import HomeScreen from './screens/HomeScreen';
import DetailProductScreen from './screens/DetailProductScreen';
import SearchScreen from './screens/SearchScreen';
import CartScreen from './screens/CartScreen';
import ShippingForm from './screens/ShippingForm';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import Loader from './components/Loader';

const Stack = createStackNavigator();

const App = () => {
  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () => {
    // Aquí, idealmente, debes llamar a tu servidor y obtener la publishableKey.
    // Por ahora, solo voy a asumir que la obtienes como una constante.
    // Recomiendo fuertemente no hardcodear esta clave y obtenerla desde tu servidor.
    const key = "pk_test_51NcQayAlhoy5s1XNgSgghu6BM1VNvHVo8l4zf9BFt0MWrWg3XeIj5C4hta5Jw5c6IUTc2Q7DpYgWQArc5viSdlq700B5alYwO4";  // remplaza "tu_publishable_key" por tu clave de Stripe
    setPublishableKey(key);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);


  return (
    <Provider store={store}>
      <ColorSchemeProvider>
        <PersistGate loading={<Loader/>} persistor={persistor}>
          <StripeProvider
            publishableKey={publishableKey}
            merchantIdentifier="merchant.identifier"
            urlScheme="your-url-scheme"
          >
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={({ navigation }) => ({
                    header: () => <CustomHeader locationHome={true} navigation={navigation} />,
                  })}
                />
                <Stack.Screen
                  name="DetailProductScreen"
                  component={DetailProductScreen}
                  options={({ navigation }) => ({
                    header: () => <CustomHeader navigation={navigation} />,
                  })}
                />
                <Stack.Screen
                  name="SearchScreen"
                  component={SearchScreen}
                  options={({ navigation }) => ({
                    header: () => <CustomHeader navigation={navigation} />,
                  })}
                />
                <Stack.Screen
                  name="CartScreen"
                  component={CartScreen}
                  options={({ navigation }) => ({
                    header: () => <CustomHeader navigation={navigation} />,
                  })}
                />
                <Stack.Screen
                  name="ShippingForm"
                  component={ShippingForm}
                  options={({ navigation }) => ({
                    header: () => <CustomHeader navigation={navigation} />,
                  })}
                />
                <Stack.Screen
                  name="LoginScreen"
                  component={LoginScreen}
                  options={({ navigation }) => ({
                    header: () => <CustomHeader navigation={navigation} />,
                  })}
                />
                <Stack.Screen
                  name="RegisterScreen"
                  component={RegisterScreen}
                  options={({ navigation }) => ({
                    header: () => <CustomHeader navigation={navigation} />,
                  })}
                />
                <Stack.Screen
                  name="ProfileScreen"
                  component={ProfileScreen}
                  options={({ navigation }) => ({
                    header: () => <CustomHeader navigation={navigation} />,
                  })}
                />
                <Stack.Screen
                  name="PlaceOrderScreen"
                  component={PlaceOrderScreen}
                  options={({ navigation }) => ({
                    header: () => <CustomHeader navigation={navigation} />,
                  })}
                />
                <Stack.Screen
                  name="OrderScreen"
                  component={OrderScreen}
                  options={({ navigation }) => ({
                    header: () => <CustomHeader navigation={navigation} />,
                  })}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </StripeProvider>

        </PersistGate>

      </ColorSchemeProvider>

    </Provider>
  );
};

export default App;
