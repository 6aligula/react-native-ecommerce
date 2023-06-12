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

    CHECK_AVAILABLE_STOCK_REQUEST,
    CHECK_AVAILABLE_STOCK_SUCCESS,
    CHECK_AVAILABLE_STOCK_FAIL,

} from '../constants/productConstants';
const configu = "http://192.168.1.141:8000"

export const listProducts = (keyword = '', page = 1) => async (dispatch) => {
    try {
        console.log("url: ", `${Config.API_BASE_URL}/api/products/`);
        dispatch({ type: PRODUCT_LIST_REQUEST })

        // Cambiamos la estructura de la URL de la llamada al backend
        const url = `http://192.168.1.141:8000/api/products/?${keyword ? `keyword=${keyword}` : ''}&page=${page}`;

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

        const { data } = await axios.get(`${configu}/api/products/${id}/`)

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

export const checkAvailableStock = (id) => async (dispatch) => {
    try {
        dispatch({ type: CHECK_AVAILABLE_STOCK_REQUEST })
        const { data } = await axios.get(`${configu}/api/products/getavailable/${id}/`);
        //console.log("Response data: ", data); 
        dispatch({
            type: CHECK_AVAILABLE_STOCK_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.log("Error en details: ", error);
        dispatch({
            type: CHECK_AVAILABLE_STOCK_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
};

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