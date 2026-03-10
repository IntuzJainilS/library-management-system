import { Optional } from "sequelize";

export interface userattributes {
    user_id: string;
    full_name: string;
    email: string;
    password: string;
    mobile: number;
    gender: string;
    birthdate: Date;
    usertype: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
    deleted_at?: Date;
}

export interface UserCreationAttributes
    extends Optional<userattributes, 'user_id' | 'usertype' | 'status'> { }

export interface searchuserTypes extends userattributes {
    user_id: string,
    password: string,
    email: string,
    usertype: string;
} 