import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

// const persistConfig = {
//     key: 'cart',
//     storage: AsyncStorage,
// };

const rootReducer = combineReducers({
    cart: cartReducer,
    productList: productListReducers,
    productDetails: productDetailsReducers,
    userLogin : userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    orderCreate: orderCreateReducer, 
});

export default rootReducer;