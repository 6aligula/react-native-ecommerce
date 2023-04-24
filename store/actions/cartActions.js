import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants';
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${Config.API_BASE_URL}/api/products/${id}/`);

  dispatch({
      type: CART_ADD_ITEM,
      payload: {
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          qty
      }
  })

  AsyncStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}