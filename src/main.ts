import { NestFactory } from '@nestjs/core';
import { ReportModule } from './Report/ReportModule';

async function main() {
  const app = await NestFactory.create(ReportModule);
  await app.listen(3000);
}
main();
