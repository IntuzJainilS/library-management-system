export interface userattributes{
    user_id:string;
    full_name: string;
    email: string;
    password: string;
    mobile: number;
    gender:string;
    birthdate: Date;
    usertype: string;
    status:string;
    createdAt?: Date;
    updatedAt?: Date;
    deleted_at?: Date; 
}