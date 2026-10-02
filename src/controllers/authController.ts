import type { Request, Response } from "express";
import authService from "../services/authService.js";

async function postRegister(req: Request, res: Response) {
  const { username, password, confirmPassword } = req.body;

  const user = await authService.register(username, password, confirmPassword);

  res.status(201).json({
    user: {
      id: user.id,
      username: user.username,
    },
  });
}

export default { postRegister };
