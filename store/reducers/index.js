import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cartReducer } from './cartReducers';
import {
    productListReducers,
    productDetailsReducers,
} from './productReducers'

// const persistConfig = {
//     key: 'cart',
//     storage: AsyncStorage,
// };

const rootReducer = combineReducers({
    cart: cartReducer,
    productList: productListReducers,
    productDetails: productDetailsReducers,
});

export default rootReducer;