import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import authService from "../services/authService.js";
import { JWT_SECRET } from "../config/config.js";
import { cookieOptions } from "../config/cookies.js";

async function postRegister(req: Request, res: Response) {
  try {
    const { username, password, confirmPassword } = req.body;

    const user = await authService.register(
      username,
      password,
      confirmPassword,
    );

    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
}

async function postLogin(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const user = await authService.login(username, password);

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({ user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
}

async function postLogout(req: Request, res: Response) {
  try {
    res
      .clearCookie("token", cookieOptions)
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed" });
  }
}

export default { postRegister, postLogin, postLogout };
