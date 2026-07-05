import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rootRouter from "./routes/index";
import { sendResponse } from "./utils/response.util";
import { StatusCode } from "./types/response";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(compression());

app.use("/api/v1", rootRouter);

app.get("/", (_req, res) => {
  sendResponse(res, {
    statusCode: StatusCode.SUCCESS,
    success: true,
    message: "Law Diary API V1.0.0 is active and running securely.",
  });
});

app.use((_req, res) => {
  sendResponse(res, {
    statusCode: StatusCode.NOT_FOUND,
    success: false,
    message: "Resource not found on this server",
  });
});

export default app;
