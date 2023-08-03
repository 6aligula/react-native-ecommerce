import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find(x => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product
              ? { ...item, qty: x.qty + item.qty }
              : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
    case CART_REMOVE_ITEM:
      const itemIdToRemove = action.payload.id;
      const qtyToRemove = action.payload.qty;
      const existItemToRemove = state.cartItems.find(x => x.product === itemIdToRemove);

      if (existItemToRemove) {
        const newQty = existItemToRemove.qty - qtyToRemove;
        if (newQty <= 0) {
          // Eliminar completamente el ítem si la cantidad es 0 o menor
          return {
            ...state,
            cartItems: state.cartItems.filter(x => x.product !== itemIdToRemove)
          };
        } else {
          // Reducir la cantidad del ítem
          return {
            ...state,
            cartItems: state.cartItems.map(x =>
              x.product === itemIdToRemove
                ? { ...x, qty: newQty } // Nota: aquí usamos x en lugar de itemToRemove ya que no tenemos acceso a todo el objeto del ítem
                : x
            ),
          };
        }
      } else {
        return state; // No hay cambios si el ítem no se encuentra
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      }

    default:
      return state
  }

}
