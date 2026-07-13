"use client";

import {
  hasValidationErrors,
  validateSettingsForm,
  type SettingsFormErrors,
  type SettingsFormValues,
} from "@/lib/settings-validation";
import { FormEvent, useId, useState } from "react";

export type { SettingsFormValues };

const defaultValues: SettingsFormValues = {
  fullName: "",
  email: "",
  password: "",
};

type SettingsFormProps = {
  initialValues?: Partial<SettingsFormValues>;
  onSubmit?: (values: SettingsFormValues) => void | Promise<void>;
};

const inputClassName =
  "w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:ring-2 dark:bg-zinc-950 dark:text-zinc-50";
const inputValidClassName =
  "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-200 dark:border-zinc-700 dark:focus:border-zinc-500 dark:focus:ring-zinc-800";
const inputInvalidClassName =
  "border-red-500 focus:border-red-500 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-900/40";

export default function SettingsForm({
  initialValues,
  onSubmit,
}: SettingsFormProps) {
  const formId = useId();
  const fullNameId = `${formId}-fullName`;
  const emailId = `${formId}-email`;
  const passwordId = `${formId}-password`;
  const fullNameErrorId = `${formId}-fullName-error`;
  const emailErrorId = `${formId}-email-error`;
  const passwordErrorId = `${formId}-password-error`;
  const formErrorId = `${formId}-form-error`;
  const successId = `${formId}-success`;

  const [values, setValues] = useState<SettingsFormValues>({
    ...defaultValues,
    ...initialValues,
  });
  const [errors, setErrors] = useState<SettingsFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = (key: keyof SettingsFormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) {
        return current;
      }
      const next = { ...current };
      delete next[key];
      return next;
    });
    setSuccessMessage(null);
    setSubmitError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateSettingsForm(values);
    if (hasValidationErrors(validationErrors)) {
      setErrors(validationErrors);
      setSuccessMessage(null);
      setSubmitError(null);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSuccessMessage(null);
    setSubmitError(null);

    try {
      if (onSubmit) {
        await onSubmit({
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          password: values.password,
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      setSuccessMessage("Settings saved successfully.");
    } catch {
      setSubmitError(
        "Something went wrong while saving your settings. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (field: keyof SettingsFormValues) =>
    `${inputClassName} ${errors[field] ? inputInvalidClassName : inputValidClassName}`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
      className="space-y-6"
    >
      {submitError ? (
        <p
          id={formErrorId}
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
        >
          {submitError}
        </p>
      ) : null}

      <div className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor={fullNameId}
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Full name
          </label>
          <input
            id={fullNameId}
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? fullNameErrorId : undefined}
            disabled={isSubmitting}
            placeholder="Jane Doe"
            className={getInputClassName("fullName")}
          />
          {errors.fullName ? (
            <p
              id={fullNameErrorId}
              role="alert"
              className="text-sm text-red-600 dark:text-red-400"
            >
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            htmlFor={emailId}
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Email
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? emailErrorId : undefined}
            disabled={isSubmitting}
            placeholder="jane@example.com"
            className={getInputClassName("email")}
          />
          {errors.email ? (
            <p
              id={emailErrorId}
              role="alert"
              className="text-sm text-red-600 dark:text-red-400"
            >
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            htmlFor={passwordId}
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Password{" "}
            <span className="font-normal text-zinc-500 dark:text-zinc-400">
              (optional)
            </span>
          </label>
          <input
            id={passwordId}
            type="password"
            name="password"
            value={values.password}
            onChange={(event) => updateField("password", event.target.value)}
            autoComplete="new-password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? passwordErrorId : undefined}
            disabled={isSubmitting}
            placeholder="Leave blank to keep current password"
            className={getInputClassName("password")}
          />
          {errors.password ? (
            <p
              id={passwordErrorId}
              role="alert"
              className="text-sm text-red-600 dark:text-red-400"
            >
              {errors.password}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
        {successMessage ? (
          <p
            id={successId}
            role="status"
            className="text-sm font-medium text-emerald-600 dark:text-emerald-400"
          >
            {successMessage}
          </p>
        ) : (
          <span className="hidden sm:block" aria-hidden="true" />
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
