import axios from 'axios';
import Config from 'react-native-config';

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,

} from '../constants/productConstants';

export const listProducts = (keyword = '', page = 1) => async (dispatch) => {
    try {
        //console.log("data: ", Config.API_BASE_URL);
        dispatch({ type: PRODUCT_LIST_REQUEST })

        // Cambiamos la estructura de la URL de la llamada al backend
        const url = `${Config.API_BASE_URL}/api/products/?${keyword ? `keyword=${keyword}` : ''}&page=${page}`;

        const { data } = await axios.get(url);
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
        // Devuelve una promesa que se resuelve con los datos de los productos
        //return Promise.resolve(data);

    } catch (error) {
        //console.log("Error completo: ", error);
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
        // Devuelve una promesa que se rechaza con el error
        //return Promise.reject(error);
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        //console.log("products con id: ", `${Config.API_BASE_URL}/api/products/${id}/`);
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`${Config.API_BASE_URL}/api/products/${id}/`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log("Error en details: ", error);
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// export const createProductReview = (productId, review) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: PRODUCT_CREATE_REVIEW_REQUEST

//         })

//         const {
//             userLogin: { userInfo },
//         } = getState()

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const { data } = await axios.post(
//             `/api/products/${productId}/reviews/`,
//             review,
//             config
//         )

//         dispatch({
//             type: PRODUCT_CREATE_REVIEW_SUCCESS,
//             payload: data,
//         })


//     } catch (error) {
//         dispatch({
//             type: PRODUCT_CREATE_REVIEW_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         })
//     }
// }