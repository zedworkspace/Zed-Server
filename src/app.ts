import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouters";
import projectRouter from "./routes/projectRouters";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api", authRouter);
app.use("/api/v1/projects", projectRouter);

app.use(globalErrorHandler);
export default app;
