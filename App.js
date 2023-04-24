import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';
import { ColorSchemeProvider } from './ColorSchemeContext';

import CustomHeader from './components/CustomHeader';
import HomeScreen from './screens/HomeScreen';
import DetailProductScreen from './screens/DetailProductScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createStackNavigator();

const App = () => {

  return (
    <Provider store={store}>
      <ColorSchemeProvider>
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
          </Stack.Navigator>
        </NavigationContainer>
      </ColorSchemeProvider>

    </Provider>
  );
};

export default App;
