export interface IOrder {
  number: string;
  customer: number;
  createdAt: string;
  products: number[];
}

export interface ICustomer {
  id: number;
  firstName: string;
  lastName: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
}
