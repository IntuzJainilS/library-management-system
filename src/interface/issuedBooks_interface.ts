export interface issuedbooks{
    id?: string;
    user_id: string;
    book_id: string;
    issued_date: number;
    return_date?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deleted_at?: Date;  
}