import { Module } from '@nestjs/common';

import { ReportController } from './Controller/ReportController';
import { OrderModule } from '../Order/OrderModule';

@Module({
  imports: [OrderModule],
  controllers: [ReportController],
  providers: [],
})
export class ReportModule {}
