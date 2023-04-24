import { combineReducers } from 'redux';
import {cartReducer} from './cartReducers';
import {
    productListReducers,
    productDetailsReducers,
} from './productReducers'

const rootReducer = combineReducers({
    cart: cartReducer,
    productList: productListReducers,
    productDetails: productDetailsReducers,
});

export default rootReducer;