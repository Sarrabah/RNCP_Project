import type { Rule } from "antd/es/form";

export const validatePassword = (_: Rule, value: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!value) {
      reject(new Error("Password is required"));
      return;
    }

    if (value.length < 6) {
      reject(new Error("Password must be at least 6 characters long"));
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      reject(
        new Error(
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        ),
      );
      return;
    }

    resolve();
  });
};

export const validateName = (_: Rule, value: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!value) {
      reject(new Error("Name is required"));
      return;
    }

    if (value.length < 2) {
      reject(new Error("Name must be at least 2 characters long"));
      return;
    }

    if (value.length > 50) {
      reject(new Error("Name must be less than 50 characters"));
      return;
    }

    resolve();
  });
};

export const validateRequired =
  (fieldName: string) =>
  (_: Rule, value: unknown): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!value || (typeof value === "string" && value.trim() === "")) {
        reject(new Error(`${fieldName} is required`));
        return;
      }
      resolve();
    });
  };
