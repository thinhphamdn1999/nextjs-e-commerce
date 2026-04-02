import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useEffect
} from 'react';
import _ from 'lodash';
import { CART_STORAGE } from '@/constants/storage';
import { Cart, CartItem } from '@/types/cart';
import { Product } from '@/types/products';

import { calculateTotalPrice } from '@/utils/calculate';
import useSessionStorage from './use-session-storage';

interface CartContextProps {
  cart: Cart;
  addToCart: (newItem: Product, quantity: number) => void;
  updateQuantity: (itemId: number, newQuantity: number) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  findItemInCart: (itemId: number) => CartItem | undefined;
  updateDiscount: (discount: number) => void;
}

const CartContext = createContext<CartContextProps>({
  cart: { items: [], totalPrice: 0, subTotalPrice: 0, discount: 0, fee: 0 },
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  findItemInCart: () => undefined,
  updateDiscount: () => {}
});

const initialCart: Cart = {
  items: [],
  totalPrice: 0,
  subTotalPrice: 0,
  discount: 0,
  fee: 25 // Default fee, can be adjusted when has api
};

// Cart action type constants
export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  UPDATE_DISCOUNT: 'UPDATE_DISCOUNT',
  GET_CART: 'GET_CART'
} as const;

type CartAction =
  | {
      type: typeof CART_ACTIONS.ADD_ITEM;
      payload: { product: Product; quantity: number };
    }
  | { type: typeof CART_ACTIONS.REMOVE_ITEM; payload: { itemId: number } }
  | {
      type: typeof CART_ACTIONS.UPDATE_QUANTITY;
      payload: { itemId: number; quantity: number };
    }
  | { type: typeof CART_ACTIONS.CLEAR_CART }
  | {
      type: typeof CART_ACTIONS.UPDATE_DISCOUNT;
      payload: { discount: number };
    }
  | { type: typeof CART_ACTIONS.GET_CART; payload: { cart: Cart } };

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      let newItems;

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            thumbnail: product.thumbnail,
            quantity,
            category: product.category,
            discountPercentage: product.discountPercentage,
            price: product.price
          }
        ];
      }

      const { subTotal, total } = calculateTotalPrice(
        newItems,
        state.discount,
        state.fee
      );

      return {
        ...state,
        items: newItems,
        subTotalPrice: subTotal,
        totalPrice: total
      };
    }
    case CART_ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter(
        (item) => item.id !== action.payload.itemId
      );
      const { subTotal, total } = calculateTotalPrice(
        newItems,
        state.discount,
        state.fee
      );

      return {
        ...state,
        items: newItems,
        subTotalPrice: subTotal,
        totalPrice: total
      };
    }
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { itemId, quantity } = action.payload;

      if (quantity <= 0) {
        const newItems = state.items.filter((item) => item.id !== itemId);
        const { subTotal, total } = calculateTotalPrice(
          newItems,
          state.discount,
          state.fee
        );

        return {
          ...state,
          items: newItems,
          subTotalPrice: subTotal,
          totalPrice: total
        };
      } else {
        const newItems = state.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );
        const { subTotal, total } = calculateTotalPrice(
          newItems,
          state.discount,
          state.fee
        );

        return {
          ...state,
          items: newItems,
          subTotalPrice: subTotal,
          totalPrice: total
        };
      }
    }
    case CART_ACTIONS.CLEAR_CART: {
      return { ...initialCart };
    }
    case CART_ACTIONS.UPDATE_DISCOUNT: {
      const { discount } = action.payload;
      const { subTotal, total } = calculateTotalPrice(
        state.items,
        discount,
        state.fee
      );

      return { ...state, discount, subTotalPrice: subTotal, totalPrice: total };
    }
    case CART_ACTIONS.GET_CART: {
      return action.payload.cart;
    }
    default:
      return state;
  }
}

const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Use useSessionStorage to get/set cart in sessionStorage
  const { storedValue, setValue } = useSessionStorage<Cart>(
    CART_STORAGE,
    initialCart
  );

  // Initialize reducer with value from sessionStorage
  const [cart, dispatch] = useReducer(cartReducer, storedValue);

  // Sync cart state to sessionStorage whenever cart changes
  useEffect(() => {
    if (!_.isEqual(cart, initialCart)) {
      setValue(cart);
    }
  }, [cart, setValue]);

  // Load cart from sessionStorage when component mounts
  useEffect(() => {
    if (storedValue) {
      dispatch({ type: CART_ACTIONS.GET_CART, payload: { cart: storedValue } });
    }
  }, [storedValue]);

  const findItemInCart = useCallback(
    (itemId: number) => cart.items.find((item) => item.id === itemId),
    [cart.items]
  );

  const addToCart = useCallback((newItem: Product, quantity: number) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product: newItem, quantity }
    });
  }, []);

  const removeFromCart = useCallback((itemId: number) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { itemId } });
  }, []);

  const updateQuantity = useCallback((itemId: number, newQuantity: number) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { itemId, quantity: newQuantity }
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    setValue(initialCart); // Clear session storage as well
  }, [setValue]);

  const updateDiscount = useCallback((discount: number) => {
    dispatch({ type: CART_ACTIONS.UPDATE_DISCOUNT, payload: { discount } });
  }, []);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      findItemInCart,
      updateDiscount
    }),
    [
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      findItemInCart,
      updateDiscount
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default useCartContext;
