import { prisma } from "../../lib/prisma.js";

export async function cleanupDatabase() {
  return prisma.user.deleteMany();
}
