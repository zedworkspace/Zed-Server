import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouters";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
  }));

app.use('/api',authRouter)



app.use(globalErrorHandler);

export default app;