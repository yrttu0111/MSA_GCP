/*
GCP 에 product log 를 저장하기 위한 subscriber

*/

import { Product } from 'src/apis/products/entities/product.entity';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { BigQuery } from '@google-cloud/bigquery';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }
  listenTo() {
    return Product;
  }
  afterInsert(event: InsertEvent<Product>): void | Promise<any> {
    console.log(event);

    const bigQuery = new BigQuery({
      keyFilename: process.env.GCP_BIGQUERYKYEFILE,
      projectId: process.env.GCP_PROJECTID,
    });
    event.entity;

    bigQuery
      .dataset('mybigquery03')
      .table('productlog')
      .insert([
        {
          id: event.entity.id,
          name: event.entity.name,
          description: event.entity.description,
          price: event.entity.price,
          isSoldout: event.entity.isSoldout,
        },
      ]);
  }
}
