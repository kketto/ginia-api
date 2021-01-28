import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinColumn } from 'typeorm'
import { Movie } from './Movie';

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30, type: 'nvarchar', nullable: false })
    label: string;

    @Column({ length: 30, type: 'varchar', nullable: false, unique: true })
    slug: string

    @ManyToMany(type => Movie, movie => movie.categories)
    movies: Movie[];
}