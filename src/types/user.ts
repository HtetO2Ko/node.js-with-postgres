import type { Role } from "../../prisma/generated/prisma/client";

export interface CreateUserPayload {
  username: string;
  fullname: string;
  password: string;
  role: Role;
}
