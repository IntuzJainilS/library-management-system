export interface issuedbooks{
    id: string;
    user_id: string;
    book_id: string;
    issued_date: Date;
    return_date: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deleted_at?: Date;  
}