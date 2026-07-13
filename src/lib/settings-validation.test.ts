import { describe, expect, it } from "vitest";
import {
  hasValidationErrors,
  validateSettingsForm,
} from "./settings-validation";

describe("validateSettingsForm", () => {
  it("returns no errors for valid values without password", () => {
    const errors = validateSettingsForm({
      fullName: "Jane Doe",
      email: "jane@example.com",
      password: "",
    });

    expect(errors).toEqual({});
    expect(hasValidationErrors(errors)).toBe(false);
  });

  it("returns no errors for valid values with password", () => {
    const errors = validateSettingsForm({
      fullName: "Jane Doe",
      email: "jane@example.com",
      password: "securepass",
    });

    expect(errors).toEqual({});
  });

  it("requires full name", () => {
    const errors = validateSettingsForm({
      fullName: "",
      email: "jane@example.com",
      password: "",
    });

    expect(errors.fullName).toBe("Full name is required.");
  });

  it("rejects full name shorter than 3 characters", () => {
    const errors = validateSettingsForm({
      fullName: "Jo",
      email: "jane@example.com",
      password: "",
    });

    expect(errors.fullName).toBe("Full name must be at least 3 characters.");
  });

  it("trims whitespace before validating full name length", () => {
    const errors = validateSettingsForm({
      fullName: "  Jo  ",
      email: "jane@example.com",
      password: "",
    });

    expect(errors.fullName).toBe("Full name must be at least 3 characters.");
  });

  it("requires email", () => {
    const errors = validateSettingsForm({
      fullName: "Jane Doe",
      email: "",
      password: "",
    });

    expect(errors.email).toBe("Email is required.");
  });

  it("rejects invalid email format", () => {
    const errors = validateSettingsForm({
      fullName: "Jane Doe",
      email: "not-an-email",
      password: "",
    });

    expect(errors.email).toBe("Please enter a valid email address.");
  });

  it("rejects password shorter than 8 characters when provided", () => {
    const errors = validateSettingsForm({
      fullName: "Jane Doe",
      email: "jane@example.com",
      password: "short",
    });

    expect(errors.password).toBe("Password must be at least 8 characters.");
  });

  it("allows empty password", () => {
    const errors = validateSettingsForm({
      fullName: "Jane Doe",
      email: "jane@example.com",
      password: "",
    });

    expect(errors.password).toBeUndefined();
  });

  it("returns multiple errors for multiple invalid fields", () => {
    const errors = validateSettingsForm({
      fullName: "",
      email: "bad",
      password: "123",
    });

    expect(errors.fullName).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.password).toBeDefined();
    expect(hasValidationErrors(errors)).toBe(true);
  });
});
