import React, { useReducer, useContext, createContext } from 'react';
import { reducer, cartItemsTotalPrice } from './cart.reducer';
// import { useStorage } from '../../utils/use-storage';
const CartContext = createContext({});
const INITIAL_STATE = {
  isOpen: false,
  items: [],
  isRestaurant: false,
  coupon: null,
  productInfo: [],
  searchText: "",
};

const useCartActions = (initialCart = INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, initialCart);
  const saveProductHandler = (allProduct) => {
    // console.log(allProduct);
    dispatch({ type: 'SAVE_PRODUCT', payload: {allProduct} });
  };

  const getSearchTextHandler = (text) => {
    console.log(text);
    dispatch({ type: 'GET_SEARCH_TEXT', payload: {text} });
  };

  const addItemHandler = (item, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
  };

  const removeItemHandler = (item, quantity = 1) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { ...item, quantity } });
  };

  const clearItemFromCartHandler = (item) => {
    dispatch({ type: 'CLEAR_ITEM_FROM_CART', payload: item });
  };

  const clearCartHandler = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  const toggleCartHandler = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };
  const couponHandler = (coupon) => {
    dispatch({ type: 'APPLY_COUPON', payload: coupon });
  };
  const removeCouponHandler = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };
  const rehydrateLocalState = (payload) => {
    dispatch({ type: 'REHYDRATE', payload });
  };
  const toggleRestaurant = () => {
    dispatch({ type: 'TOGGLE_RESTAURANT' });
  };
  const isInCartHandler = (_id) => {
    return state.items?.some((item) => item._id === _id);
  };
  const getItemHandler = (_id) => {
    return state.items?.find((item) => item._id === _id);
  };
  const getCartItemsPrice = () => cartItemsTotalPrice(state.items).toFixed(2);
  const getCartItemsTotalPrice = () =>
    cartItemsTotalPrice(state.items, state.coupon).toFixed(2);

  const getDiscount = () => {
    const total = cartItemsTotalPrice(state.items);
    const discount = state.coupon
      ? (total * Number(state.coupon?.discountInPercent)) / 100
      : 0;
    return discount.toFixed(2);
  };
  const getItemsCount = state.items?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  return {
    state,
    getItemsCount,
    rehydrateLocalState,
    saveProductHandler,
    getSearchTextHandler,
    addItemHandler,
    removeItemHandler,
    clearItemFromCartHandler,
    clearCartHandler,
    isInCartHandler,
    getItemHandler,
    toggleCartHandler,
    getCartItemsTotalPrice,
    getCartItemsPrice,
    couponHandler,
    removeCouponHandler,
    getDiscount,
    toggleRestaurant,
  };
};

export const CartProvider = ({ children }) => {
  const {
    state,
    rehydrateLocalState,
    getItemsCount,
    addItemHandler,
    saveProductHandler,
    getSearchTextHandler,
    removeItemHandler,
    clearItemFromCartHandler,
    clearCartHandler,
    isInCartHandler,
    getItemHandler,
    toggleCartHandler,
    getCartItemsTotalPrice,
    couponHandler,
    removeCouponHandler,
    getCartItemsPrice,
    getDiscount,
    toggleRestaurant,
  } = useCartActions();
  // const { rehydrated, error } = useStorage(state, rehydrateLocalState);

  return (
    <CartContext.Provider
      value={{
        isOpen: state.isOpen,
        items: state.items,
        productInfo: state.productInfo,
        searchText: state.searchText,
        coupon: state.coupon,
        isRestaurant: state.isRestaurant,
        cartItemsCount: state.items?.length,
        itemsCount: getItemsCount,
        saveProduct: saveProductHandler,
        getSearchText: getSearchTextHandler,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        removeItemFromCart: clearItemFromCartHandler,
        clearCart: clearCartHandler,
        isInCart: isInCartHandler,
        getItem: getItemHandler,
        toggleCart: toggleCartHandler,
        calculatePrice: getCartItemsTotalPrice,
        calculateSubTotalPrice: getCartItemsPrice,
        applyCoupon: couponHandler,
        removeCoupon: removeCouponHandler,
        calculateDiscount: getDiscount,
        toggleRestaurant,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
