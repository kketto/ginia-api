import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable } from 'typeorm'
import { IsInt, Length, IsDefined, IsNotEmpty, IsString, IsNumber, Max, Min, IsOptional } from "class-validator";
import { Category } from './Category';

@Entity()
export class Movie extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30, type: 'nvarchar', nullable: false })
    @IsNotEmpty()
    @IsString()
    title: string;

    @Column({ length: 100, type: 'varchar', nullable: false })
    @IsNotEmpty()
    @IsString()
    imageSrc: string;

    @Column({ length: 30, type: 'nvarchar', nullable: true })
    @IsString()
    @IsOptional()
    director: string;

    @Column({ type: 'int', nullable: false })
    @Max(3000)
    @Min(1900)
    @IsInt()
    @IsDefined()
    year: number;

    @Column({ type: 'nvarchar', nullable: true })
    @IsString()
    @IsOptional()
    cast: string;

    @Column({ type: 'nvarchar', nullable: true })
    @IsString()
    @IsOptional()
    description: string;

    @Column({ type: 'float', nullable: true, default: 0 })
    @IsNumber()
    @IsOptional()
    rating: number;

    @Column({ type: 'int', nullable: true, default: 0 })
    @IsNumber()
    @IsOptional()
    rateCount?: number;

    @Column({ type: 'varchar', nullable: true })
    @IsString()
    @IsOptional()
    videoSrc: string;

    @ManyToMany(type => Category, category => category.movies)
    @JoinTable()
    categories: Category[];
}