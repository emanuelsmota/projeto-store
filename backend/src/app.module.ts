import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqljs',
    location: 'db.sqlite',
    autoSave: true,
    entities: [Product],
    synchronize: true,
  }),ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
