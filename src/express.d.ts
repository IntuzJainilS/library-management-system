import { Request } from 'express';

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }

    export interface Response {}
  }
}

// declare namespace Express {
//     export interface Request {
//       user: {
//         id: string;
//       };
//     }
//   }