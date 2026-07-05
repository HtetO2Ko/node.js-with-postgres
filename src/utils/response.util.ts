import type { Response } from "express";
import { StatusCode } from "../types/response";

export const sendResponse = (
  res: Response,
  {
    statusCode = StatusCode.SUCCESS,
    success = true,
    message = "Success",
    data = null,
    error = null,
  }: {
    statusCode?: StatusCode;
    success?: boolean;
    message?: string;
    data?: any;
    error?: any;
  },
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    error: error,
  });
};
