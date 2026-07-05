import type { AuthRepository } from "../repositories/auth.repository";
import type {
  LoginCredentials,
  AuthResponseData,
  UserJwtPayload,
} from "../types/auth";
import { StatusCode } from "../types/response";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  private generateTokens(payload: object) {
    const accessToken = jwt.sign(
      payload,
      String(process.env.ACCESS_TOKEN_SECRET),
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any,
      },
    );

    const refreshToken = jwt.sign(
      payload,
      String(process.env.REFRESH_TOKEN_SECRET),
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY as any,
      },
    );

    return { accessToken, refreshToken };
  }

  async login({ username, password }: LoginCredentials): Promise<{
    statusCode: StatusCode;
    success: boolean;
    message: string;
    data?: AuthResponseData;
  }> {
    const user = await this.authRepository.findUserByUsername(username);

    if (!user) {
      return {
        statusCode: StatusCode.UNAUTHORIZED,
        success: false,
        message: "Invalid username",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        statusCode: StatusCode.UNAUTHORIZED,
        success: false,
        message: "Invalid password",
      };
    }

    const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!tokenSecret) {
      throw new Error(
        "ACCESS_TOKEN_SECRET is missing in environmental variables",
      );
    }

    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshTokenSecret) {
      throw new Error(
        "REFRESH_TOKEN_SECRET is missing in environmental variables",
      );
    }

    const payload = {
      userid: user.userid,
      username: user.username,
      fullname: user.fullname,
      role: user.role,
    };
    const tokens = this.generateTokens(payload);

    return {
      statusCode: StatusCode.SUCCESS,
      success: true,
      message: "Login successful",
      data: {
        ...tokens,
        user: {
          userid: user.userid,
          username: user.username,
          fullname: user.fullname,
          role: user.role,
        },
      },
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<{
    statusCode: StatusCode;
    success: boolean;
    message: string;
    data?: { accessToken: string };
  }> {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
      ) as UserJwtPayload;

      const payload = {
        userid: decoded.userid,
        username: decoded.username,
        fullname: decoded.fullname,
        role: decoded.role,
      };

      const newAccessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any,
        },
      );

      return {
        statusCode: StatusCode.SUCCESS,
        success: true,
        message: "Token refreshed successfully",
        data: {
          accessToken: newAccessToken,
        },
      };
    } catch (error) {
      return {
        statusCode: StatusCode.UNAUTHORIZED,
        success: false,
        message: "Invalid or expired refresh token",
      };
    }
  }
}
