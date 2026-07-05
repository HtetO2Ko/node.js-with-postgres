import { prisma } from "../utils/prisma";
import type { User } from "../../prisma/generated/prisma/client";

export class AuthRepository {
  async findUserByUsername(username: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        username,
        isDeleted: false,
      },
    });
  }

  async findUserById(userid: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        userid,
        isDeleted: false,
      },
    });
  }
}
