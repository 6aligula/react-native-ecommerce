import { combineReducers } from 'redux';
import {cartReducer} from './cartReducers';
import {
    productListReducers,
    productDetailsReducers,
    availableStockReducer,
} from './productReducers'

const rootReducer = combineReducers({
    availableStock : availableStockReducer,
    cart: cartReducer,
    productList: productListReducers,
    productDetails: productDetailsReducers,
});

export default rootReducer;