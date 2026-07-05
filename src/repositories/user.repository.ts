import { prisma } from "../utils/prisma";
import type { Prisma, User } from "../../prisma/generated/prisma/client";

export class UserRepository {
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }
}
