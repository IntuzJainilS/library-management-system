import express, {Request, Response} from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db";

dotenv.config();

const app = express()

app.use(express.json())
const port = process.env.PORT ; 

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

connectDB().then(() => {
    app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})
