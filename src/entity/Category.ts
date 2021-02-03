import { IsAscii, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, } from 'typeorm'
import { Movie } from './Movie';

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30, type: 'nvarchar', nullable: false })
    @IsNotEmpty()
    @MaxLength(30)
    @IsString()
    label: string;


    @Column({ length: 30, type: 'varchar', nullable: false, unique: true })
    @IsNotEmpty()
    @MaxLength(30)
    @IsAscii()
    slug: string;

    @ManyToMany(type => Movie, movie => movie.categories)
    movies: Movie[];
}