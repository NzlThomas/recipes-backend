import "dotenv/config";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}

const JWT_SECRET: string = jwtSecret;

export { JWT_SECRET };
