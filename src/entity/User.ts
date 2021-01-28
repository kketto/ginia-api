import { IsString, MinLength, MaxLength, IsEnum, IsOptional, } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

export enum UserRole {
    Admin,
    User,
    Boss,
    MegaAdmin
}
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30, type: 'varchar', nullable: false, unique: true })
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    userName: string;

    @Column({ type: 'varchar', nullable: false })
    @IsString()
    @MinLength(6)
    @MaxLength(30)
    password: string;

    @Column({ length: 30, type: 'nvarchar', nullable: false })
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    fullName: string;

    @Column({ type: "int", default: UserRole.User })
    @IsEnum(UserRole)
    @IsOptional()
    role: UserRole;
}