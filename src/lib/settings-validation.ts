export type SettingsFormValues = {
  fullName: string;
  email: string;
  password: string;
};

export type SettingsFormErrors = Partial<
  Record<keyof SettingsFormValues, string>
>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSettingsForm(
  values: SettingsFormValues,
): SettingsFormErrors {
  const errors: SettingsFormErrors = {};
  const fullName = values.fullName.trim();
  const email = values.email.trim();

  if (!fullName) {
    errors.fullName = "Full name is required.";
  } else if (fullName.length < 3) {
    errors.fullName = "Full name must be at least 3 characters.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.password && values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

export function hasValidationErrors(errors: SettingsFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
