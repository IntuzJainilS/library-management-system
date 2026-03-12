import { Request } from 'express';

declare global {
  namespace Express {
    export interface Request {
      user?: {id:string;};
    }

    export interface Response {}
  }
}