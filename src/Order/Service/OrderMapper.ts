import { Injectable, Inject } from '@nestjs/common';
import { Observable, combineLatest } from 'rxjs';

import { Repository } from './Repository';
import { IBestSellers, IBestBuyers } from 'src/Report/Model/IReports';
import { IOrder, IProduct, ICustomer } from '../Model/IOrder';

@Injectable()
export class OrderMapper {
  @Inject() repository: Repository;

  getBestSellers(date: string): Observable<IBestSellers> {
    const orders$: Observable<IOrder[]> = this.repository.fetchOrders();
    const products$: Observable<IProduct[]> = this.repository.fetchProducts();

    return combineLatest(
      orders$,
      products$,
      (orders: IOrder[], products: IProduct[]): IBestSellers => {
        const dayOrders = this.getOrdersByDayDate(orders, date);
        const productsQuantity = this.getProductsQuantity(dayOrders);
        const [ productId, quantity ] = this.getBest(productsQuantity);
        const { name, price } = products.filter(({ id }: IProduct) => productId === id)[0];

        return {
          productName: name,
          quantity,
          totalPrice: quantity * price,
        };
      }
    );
  }

  getBestBuyer(date: string): Observable<IBestBuyers> {
    const orders$: Observable<IOrder[]> = this.repository.fetchOrders();
    const products$: Observable<IProduct[]> = this.repository.fetchProducts();
    const customers$: Observable<ICustomer[]> = this.repository.fetchCustomers();

    return combineLatest(
      orders$,
      products$,
      customers$,
      (orders: IOrder[], products: IProduct[], customers: ICustomer[]): IBestBuyers => {
        const dayOrders = this.getOrdersByDayDate(orders, date);
        const customersProducts = this.getCustomerProducts(dayOrders);
        const customersTotalPrice = this.getCustomerTotalPrice(customersProducts, products);
        const [ customerId, totalPrice ] = this.getBest(customersTotalPrice);
        const customerName = customers.reduce(
          (acc, { id, firstName, lastName }) => id === customerId ? acc = firstName + ' ' + lastName : acc,
          ''
        );

        return {
          customerName,
          totalPrice
        };
      }
    );
  }

  private getOrdersByDayDate(orders: IOrder[], date: string): IOrder[] {
    return orders.filter(({ createdAt }: IOrder) => createdAt === date);
  }

  private getProductsQuantity(orders: IOrder[]): Map<number, number> {
    return orders
      .reduce((acc: number[], { products }: IOrder) => acc.concat(products), [])
      .reduce((acc, key) => acc.get(key) ? acc.set(key, acc.get(key) + 1) : acc.set(key, 1), new Map());
  }

  private getBest(unsortedMap: Map<number, number>): [ number, number ] {
    return [ ...unsortedMap.entries() ].sort((a, b) => b[1] - a[1])[0];
  }

  private getCustomerProducts(orders: IOrder[]): Map<number, number[]> {
    return orders.reduce((acc, { customer, products }: IOrder) => acc.set(customer, products), new Map());
  }

  private getCustomerTotalPrice(customersProducts: Map<number, number[]>, products: IProduct[]): Map<number, number> {
    const productPriceMap = products.reduce((acc, { id, price }: IProduct) => acc.set(id, price), new Map());

    const result = new Map();

    customersProducts.forEach((customerProducts: number[], customer: number) => {
      const totalPrice = customerProducts.map(id => productPriceMap.get(id)).reduce((acc, price) => acc + price, 0);

      result.set(customer, totalPrice);
    });

    return result;
  }
}
