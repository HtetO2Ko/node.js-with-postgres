import type { UserRepository } from "../repositories/user.repository";
import { StatusCode } from "../types/response";
import type { User } from "../../prisma/generated/prisma/client";
import bcrypt from "bcryptjs";
import type { AuthRepository } from "../repositories/auth.repository";
import type { CreateUserPayload } from "../types/user";

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
  ) {}

  async createUser(payload: CreateUserPayload): Promise<{
    statusCode: StatusCode;
    success: boolean;
    message: string;
    data?: Omit<User, "password">;
  }> {
    const existingUser = await this.authRepository.findUserByUsername(
      payload.username,
    );
    if (existingUser) {
      return {
        statusCode: StatusCode.CONFLICT,
        success: false,
        message: "Username is already registered",
      };
    }

    const hashedPassword = await bcrypt.hash(payload.password, 12);

    const newUser = await this.userRepository.createUser({
      username: payload.username,
      fullname: payload.fullname,
      password: hashedPassword,
      role: payload.role,
    });

    const { password, ...safeUserOutput } = newUser;

    return {
      statusCode: StatusCode.CREATED,
      success: true,
      message: "User created successfully by administrator",
      data: safeUserOutput,
    };
  }
}
