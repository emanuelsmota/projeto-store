import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  create(createProductDto: CreateProductDto) {
    const novoProduto = {
      id: this.products.length + 1,
      name: createProductDto.name,
      price: createProductDto.price,
      description: createProductDto.description,
      stock: createProductDto.stock,
    };
    this.products.push(novoProduto);
    return novoProduto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((produto) => produto.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
