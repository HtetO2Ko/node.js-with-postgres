import "dotenv/config";
import http from "http";
import app from "./app";

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

process.on("unhandledRejection", (reason: unknown) => {
  console.error("❌ UNHANDLED REJECTION! Shutting down gracefully...");
  console.error(reason);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (error: Error) => {
  console.error("❌ UNCAUGHT EXCEPTION! Shutting down gracefully...");
  console.error(error);
  server.close(() => {
    process.exit(1);
  });
});

server.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`,
  );
});
