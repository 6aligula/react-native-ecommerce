import axios from 'axios';
import Config from 'react-native-config';

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

} from '../constants/productConstants';

export const listProducts = (keyword = '', page = 1) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const url = `${Config.API_BASE_URL}/api/products/?${keyword ? `keyword=${keyword}` : ''}&page=${page}`;

        const { data } = await axios.get(url);
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`${Config.API_BASE_URL}/api/products/${id}/`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}