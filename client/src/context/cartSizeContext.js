import { createContext, useEffect, useReducer } from 'react';

export const CartSizeContext = createContext();

export const cartSizeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART_SIZE':
      return { cartSize: action.payload };
    default:
      return state;
  }
};

export const CartSizeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartSizeReducer, {
    cartSize: null,
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    dispatch({ type: 'SET_CART_SIZE', payload: cart && cart.length });
  }, []);

  return (
    <CartSizeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartSizeContext.Provider>
  );
};
