import queries from "../db/queries.js";
import bcrypt from "bcrypt";

async function register(
  username: string,
  password: string,
  confirmPassword: string,
) {
  const existingUser = await queries.findUserByUsername(username);

  if (!username) {
    throw new Error("MISSING_USERNAME");
  }

  if (!password) {
    throw new Error("MISSING_PASSWORD");
  }

  if (!confirmPassword) {
    throw new Error("MISSING_CONFIRM_PASSWORD");
  }

  if (password != confirmPassword) {
    throw new Error("PASSWORDS_DONT_MATCH");
  }

  if (username.length < 3 || username.length > 20) {
    throw new Error("USERNAME_LENGTH_ERROR");
  }

  if (password.length < 8) {
    throw new Error("PASSWORD_TOO_SHORT");
  }

  if (existingUser) {
    throw new Error("USERNAME_ALREADY_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await queries.createUser(username, hashedPassword);
  return user;
}

async function login(username: string, password: string) {
  if (!username) {
    throw new Error("MISSING_USERNAME");
  }

  if (!password) {
    throw new Error("MISSING_PASSWORD");
  }

  const user = await queries.findUserByUsername(username);

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("INVALID_CREDENTIALS");
  }

  return user;
}

export default { register, login };
