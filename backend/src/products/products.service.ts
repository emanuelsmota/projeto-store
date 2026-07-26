import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) { }

  async findAll() {
    return await this.repository.find({ relations: { category: true } });
  }

  async findOne(id: number) {
    const produto = await this.repository.findOne({
      where: { id: id },
      relations: { category: true },
    });;
    if (!produto) {
      throw new NotFoundException('Esse produto não existe');
    }
    return produto;
  }

  async create(createProductDto: CreateProductDto) {
    const novoProduto = this.repository.create(createProductDto);
    return await this.repository.save(novoProduto);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const produto = await this.repository.preload({
      id: id,
      ...updateProductDto,
    });
    if (!produto) {
      throw new NotFoundException('Esse produto não existe');
    }
    return await this.repository.save(produto);
  }

  async remove(id: number) {
    const produto = await this.findOne(id);
    await this.repository.remove(produto);
    return { message: 'Produto removido com sucesso!' };
  }
}



