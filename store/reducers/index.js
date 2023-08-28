import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import { combineReducers } from 'redux';
import { cartReducer } from './cartReducers';
import {
    productListReducers,
    productDetailsReducers,
} from './productReducers';
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
} from './userReducers';
import { orderCreateReducer } from './orderReducer';
import { persistReducer} from 'redux-persist';

const cartPersistConfig = {
    key: 'cart',
    storage: AsyncStorage,
    whitelist: ['cartItems'] // Asumo que 'cartItems' es lo que quieres persistir, modifícalo según tus necesidades.
};

const userPersistConfig = {
    key: 'user',
    storage: EncryptedStorage,
    whitelist: ['userInfo', 'userDetails']
};

const rootReducer = combineReducers({
    cart: persistReducer(cartPersistConfig, cartReducer),
    productList: productListReducers,
    productDetails: productDetailsReducers,
    userLogin : persistReducer(userPersistConfig, userLoginReducer),
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    orderCreate: orderCreateReducer, 
});

export default rootReducer;