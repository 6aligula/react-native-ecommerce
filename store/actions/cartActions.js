import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    UPDATE_RESERVED_QTY,

} from '../constants/cartConstants';
const configu = "http://192.168.1.141:8000"

export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const tokenOrUUID = await getStoredUUID();
        //console.log(tokenOrUUID);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-Guest-ID': tokenOrUUID,
            },
        };

        const body = JSON.stringify({ reserved_qty: qty });
        const { data } = await axios.post(
            `${configu}/api/products/reserve/${id}/`,
            body,
            config
        );
        console.log("reservado action: " + data.product.name);
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product_id: data.product._id,
                name: data.product.name,
                image: data.product.image,
                price: data.product.price,
                countInStock: data.product.countInStock,
                data_id: data._id,
                reserved_qty: data.reserved_qty,
                reserved_at: data.reserved_at,
                reservation_expires_at: data.reservation_expires_at,
                qty,
            },
        });
        //dispatch(updateReservedQty(id, data.reserved_qty));
        AsyncStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.log('Error del servidor:', error.response.data.detail);
        } else {
            console.log('Otro tipo de error:', error.message);
        }
    }
}
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    AsyncStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// export const updateReservedQty = (productId, reserved_qty) => {
//     return {
//         type: UPDATE_RESERVED_QTY,
//         payload: {
//             productId,
//             reserved_qty
//         }
//     }
// };

const generateAndStoreUUID = async () => {
    try {
        // Generate a new UUID
        const newUUID = uuidv4();

        // Store the UUID in AsyncStorage
        await AsyncStorage.setItem('@uuid', newUUID);

        return newUUID;
    } catch (e) {
        // Handle any errors here
        console.error(e);
    }
}

const getStoredUUID = async () => {
    try {
        // Try to get the stored UUID
        const storedUUID = await AsyncStorage.getItem('@uuid');

        // If there's no stored UUID, generate a new one
        if (storedUUID === null) {
            return await generateAndStoreUUID();
        }

        return storedUUID;
    } catch (e) {
        // Handle any errors here
        console.error(e);
    }
}

