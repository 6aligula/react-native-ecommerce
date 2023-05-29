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
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,

    CHECK_AVAILABLE_STOCK_REQUEST,
    CHECK_AVAILABLE_STOCK_SUCCESS,
    CHECK_AVAILABLE_STOCK_FAIL,

} from '../constants/productConstants'

export const productListReducers = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
            }

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}

export const productDetailsReducers = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }

        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}
export const availableStockReducer = (state = {data: { data: [] } }, action) => {
    switch (action.type) {
        case CHECK_AVAILABLE_STOCK_REQUEST:
            return { loading_available: true, ...state }

        case CHECK_AVAILABLE_STOCK_SUCCESS:
            return { loading_available: false, data: action.payload }

        case CHECK_AVAILABLE_STOCK_FAIL:
            return { loading_available: false, error: action.payload }

        default:
            return state;
    }
};