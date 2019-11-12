import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { ReportModule } from './../src/Report/ReportModule';

describe('SalesReportRestApi', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ReportModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404);
  });

  describe('Best-selling products on a given day', () => {
    it('/report/products/{{ 2019-08-07 }} (GET)', () => {
      return request(app.getHttpServer())
        .get('/report/products/2019-08-07/')
        .expect({
          productName: 'Black sport shoes',
          quantity: 2,
          totalPrice: 220
        });
    });

    it('/report/products/{{ 2019-08-08 }} (GET)', () => {
      return request(app.getHttpServer())
        .get('/report/products/2019-08-08/')
        .expect({
          productName: 'Black sport shoes',
          quantity: 1,
          totalPrice: 110
        });
    });
  });

  describe('Best buyer, customer who spent most money on a given day', () => {
    it('/report/customer/{{ 2019-08-08 }} (GET)', () => {
      return request(app.getHttpServer())
        .get('/report/customer/2019-08-08/')
        .expect({
          customerName: 'Jane Doe',
          totalPrice: 110
        });
    });

    it('/report/customer/{{ 2019-08-07 }} (GET)', () => {
      return request(app.getHttpServer())
        .get('/report/customer/2019-08-07/')
        .expect({
          customerName: 'John Doe',
          totalPrice: 135.75
        });
    });
  });
});
