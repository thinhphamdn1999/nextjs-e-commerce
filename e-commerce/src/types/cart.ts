export interface CartItem {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  quantity: number;
  price: number;
  discountPercentage?: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
  subTotalPrice: number;
  discount: number;
  fee: number;
}

export interface CartItemPayload {
  productId: number;
  quantity: number;
}

export interface CartPayload {
  items: CartItemPayload[];
  userId?: string;
}

export interface CartDB {
  id: string;
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  userId?: string;
}

export interface CartResponse {
  data: CartDB;
  message: string;
}
