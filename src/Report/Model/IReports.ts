/**
 * bestseller products
 */
export interface IBestSellers {
  productName: string;
  quantity: number;
  totalPrice: number;
}

/**
 * Customer best buyers
 */
export interface IBestBuyers {
  customerName: string; // customer full name
  totalPrice: number; // total amount spent on all products
}
