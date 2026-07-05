import type { Request, Response } from "express";
import type { UserService } from "../services/user.service";
import { sendResponse } from "../utils/response.util";
import { StatusCode } from "../types/response";

export class UserController {
  constructor(private userService: UserService) {}

  createUser = async (req: Request, res: Response) => {
    try {
      const { username, fullname, password, role } = req.body;

      if (!username || !fullname || !password || !role) {
        return sendResponse(res, {
          statusCode: StatusCode.BAD_REQUEST,
          success: false,
          message:
            "Missing parameters. username, fullname, password, and role are required.",
        });
      }

      const result = await this.userService.createUser({
        username,
        fullname,
        password,
        role,
      });
      return sendResponse(res, result);
    } catch (error: any) {
      return sendResponse(res, {
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Internal Server Error during user creation",
        error: process.env.NODE_ENV === "production" ? null : error.message,
      });
    }
  };
}
