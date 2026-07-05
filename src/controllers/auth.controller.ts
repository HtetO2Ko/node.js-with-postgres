import type { Request, Response } from "express";
import type { AuthService } from "../services/auth.service";
import { sendResponse } from "../utils/response.util";
import { StatusCode } from "../types/response";

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return sendResponse(res, {
          statusCode: StatusCode.BAD_REQUEST,
          success: false,
          message: "Username and password are required",
        });
      }

      const result = await this.authService.login({ username, password });
      return sendResponse(res, result);
    } catch (error: any) {
      return sendResponse(res, {
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Internal Server Error during login",
        error: process.env.NODE_ENV === "production" ? null : error.message,
      });
    }
  };

  refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return sendResponse(res, {
          statusCode: StatusCode.BAD_REQUEST,
          success: false,
          message: "Refresh token parameter is missing",
        });
      }

      const result = await this.authService.refreshAccessToken(refreshToken);
      return sendResponse(res, result);
    } catch (error: any) {
      return sendResponse(res, {
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Logout",
        error: process.env.NODE_ENV === "production" ? null : error.message,
      });
    }
  };
}
