import { Controller, Get, Param, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';

import { OrderMapper } from '../../Order/Service/OrderMapper';
import { IBestBuyers, IBestSellers } from '../Model/IReports';

@Controller()
export class ReportController {
  @Inject() orderMapper: OrderMapper;

  @Get('/report/products/:date')
  bestSellers(@Param('date') date: string): Observable<IBestSellers> {
    return this.orderMapper.getBestSellers(date);
  }

  @Get('/report/customer/:date')
  bestBuyers(@Param('date') date: string): Observable<IBestBuyers> {
    return this.orderMapper.getBestBuyer(date);
  }
}
