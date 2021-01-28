import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity()
export class Slide extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, type: 'varchar', nullable: false })
    src: string;

    @Column({ length: 30, type: 'nvarchar', nullable: true })
    alt: string;

    @Column({ length: 100, type: 'varchar', nullable: true })
    path: string
}