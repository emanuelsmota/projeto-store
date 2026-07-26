import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';

import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    price: number;
    @Column()
    description: string;
    @Column()
    stock: number;
    @Column({ nullable: true })
    imageUrl: string;
    @ManyToOne(() => Category, (category) => category.products)
    category: Category;
}
