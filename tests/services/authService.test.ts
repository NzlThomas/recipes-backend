import bcrypt from "bcrypt";

import { beforeEach, describe, expect, test } from "vitest";

import authService from "../../src/services/authService.js";
import { cleanupDatabase } from "../helpers/cleanup.js";

describe("register", () => {
  beforeEach(async () => {
    await cleanupDatabase();
  });

  test("throws error when username is missing", async () => {
    await expect(
      authService.register("", "azertyui", "azertyui"),
    ).rejects.toThrow("MISSING_USERNAME");
  });

  test("throws error when password is missing", async () => {
    await expect(
      authService.register("Thomas", "", "azertyui"),
    ).rejects.toThrow("MISSING_PASSWORD");
  });

  test("throws error when confirm password is missing", async () => {
    await expect(
      authService.register("Thomas", "azertyui", ""),
    ).rejects.toThrow("MISSING_CONFIRM_PASSWORD");
  });

  test.each([
    ["T", "azertyui", "azertyui"],
    ["UnUsernameTropLong12345", "azertyui", "azertyui"],
  ])(
    "username should be between 3 and 20 characters",
    async (username, password, confirmPassword) => {
      await expect(
        authService.register(username, password, confirmPassword),
      ).rejects.toThrow("USERNAME_LENGTH_ERROR");
    },
  );

  test("password should be at least 8 characters long", async () => {
    await expect(authService.register("Thomas", "a", "a")).rejects.toThrow(
      "PASSWORD_TOO_SHORT",
    );
  });

  test("password and confirm password should match", async () => {
    await expect(
      authService.register("Thomas", "azertyui", "qwertyui"),
    ).rejects.toThrow("PASSWORDS_DONT_MATCH");
  });

  test("can create user with username and password", async () => {
    const result = await authService.register("Thomas", "azertyui", "azertyui");
    expect(result).toHaveProperty("username", "Thomas");

    expect(result.password).not.toBe("azertyui");
    expect(await bcrypt.compare("azertyui", result.password)).toBe(true);
  });

  test("cannot create user with used username", async () => {
    await authService.register("Thomas", "azertyui", "azertyui");

    await expect(
      authService.register("Thomas", "qwertyui", "qwertyui"),
    ).rejects.toThrow("USERNAME_ALREADY_EXISTS");
  });
});
