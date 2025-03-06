import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouters";
import projectRouter from "./routes/projectRouters";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import profileRouter from "./routes/profileRoutes";
import channelRouter from "./routes/channelRoutes";
import messageRouter from "./routes/messageRoutes";
import memberRouter from "./routes/membersRoutes";
import boardRouter from "./routes/boardRouters";
import listRouter from "./routes/listRouter";
import cardRouter from "./routes/cardRouter";
import inviteRouter from "./routes/inviteRoutes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api", authRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/invite", inviteRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", channelRouter);
app.use("/api/v1", messageRouter);
app.use("/api/v1", memberRouter);
app.use("/api/v1/boards", boardRouter);
app.use("/api/v1/lists", listRouter);
app.use("/api/v1/cards", cardRouter);

app.use(globalErrorHandler);
export default app;
