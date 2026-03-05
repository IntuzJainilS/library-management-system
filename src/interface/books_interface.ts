export interface BookAttributes {
    id?: string;
    title:string;
    authorname: string;
    image: string;
    quantity: number;
    // user_id:string;
    createdAt?: Date;
    updatedAt?: Date;
    deleted_at?: Date;
}