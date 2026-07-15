import { Injectable, NotFoundException } from '@nestjs/common';
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
    const produto = this.products.find((produto) => produto.id === id);
    if(!produto){
      throw new NotFoundException('Esse produto não existe')
    }
    return produto
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const produto = this.findOne(id);
    Object.assign(produto , updateProductDto)
    return produto
  }

  remove(id: number) {
    this.findOne(id);
    this.products = this.products.filter((produto) => produto.id !== id);
    return { message: 'Produto removido com sucesso!'};
  }
}
