import { Injectable } from '@nestjs/common';

import { IOrder, IProduct, ICustomer } from '../Model/IOrder';
import { of, Observable } from 'rxjs';

/**
 * Data layer - mocked
 */
@Injectable()
export class Repository {
  fetchOrders(): Observable<IOrder[]> {
    return of(require('../Resources/Data/orders'));
  }

  fetchProducts(): Observable<IProduct[]> {
    return of(require('../Resources/Data/products'));
  }

  fetchCustomers(): Observable<ICustomer[]> {
    return of(require('../Resources/Data/customers'));
  }
}
