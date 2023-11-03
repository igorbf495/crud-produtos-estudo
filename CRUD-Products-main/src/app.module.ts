import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    ProductsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
