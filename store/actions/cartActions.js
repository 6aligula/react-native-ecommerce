import axios from 'axios';
import Config from 'react-native-config';

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch) => {
  const { data } = await axios.get(`${Config.API_BASE_URL}/api/products/${id}/`);
  //console.log(`url:  ${Config.API_BASE_URL}`);

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
}

export const removeFromCart = (id) => (dispatch) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    //AsyncStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
// export const removeFromCart = (id) => (dispatch, getState) => {
//     // const currentItem = getState().cart.cartItems.find(x => x.product === id);
//     // const updatedCountInStock = getState().productDetails.product.countInStock + currentItem.qty;
  
//     dispatch({
//       type: CART_REMOVE_ITEM,
//       payload: id,
//     });
  
//     // dispatch({
//     //   type: PRODUCT_STOCK_UPDATE,
//     //   payload: {
//     //     productId: id,
//     //     countInStock: updatedCountInStock
//     //   }
//     // });
  
//     AsyncStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
//   };
