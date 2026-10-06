import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../src/config/config.js";

import { describe, expect, test, beforeEach, vi } from "vitest";

import { cleanupDatabase } from "../helpers/cleanup.js";
import authService from "../../src/services/authService.js";
import authController from "../../src/controllers/authController.js";

describe("postLogin", () => {
  beforeEach(async () => {
    await cleanupDatabase();
  });
  test("should authenticate user and set a jwt cookie", async () => {
    const user = await authService.register("Thomas", "azertyui", "azertyui");

    const req = {
      body: {
        username: "Thomas",
        password: "azertyui",
      },
    } as Request;

    const res = {
      cookie: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await authController.postLogin(req, res);

    expect(res.cookie).toHaveBeenCalled();

    const token = vi.mocked(res.cookie).mock.calls[0]![1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    expect(decoded.userId).toBe(user.id);
  });
});
