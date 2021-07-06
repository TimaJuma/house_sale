import { PrismaClient } from "../prisma";

export interface Context {
  uid: string | null;
  prisma: PrismaClient;
}

export interface Authenticated extends Context {
  uid: string;
}
