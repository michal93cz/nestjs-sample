import { Module } from '@nestjs/common';
import { Repository } from './Service/Repository';
import { OrderMapper } from './Service/OrderMapper';

@Module({
  controllers: [],
  providers: [Repository, OrderMapper],
  exports: [OrderMapper],
})
export class OrderModule {
}
