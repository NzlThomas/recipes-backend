import { prisma } from "../../lib/prisma.js";

async function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
  });
}

async function createUser(username: string, password: string) {
  return prisma.user.create({
    data: { username, password },
  });
}

export default { findUserByUsername, createUser };
