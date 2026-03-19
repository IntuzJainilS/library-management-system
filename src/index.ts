import express, {Request, Response} from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth_route"
import bookRoute from "./routes/book_routes"
import userRoute from "./routes/user_route"
import cors from 'cors';

dotenv.config();

const app = express()

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use("/api", authRoutes)
app.use("/api", bookRoute)
app.use("/api", userRoute)

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
