"use client";

import { FormEvent, useState } from "react";

export type SettingsFormValues = {
  displayName: string;
  email: string;
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  profileVisibility: "public" | "private" | "team";
};

const defaultValues: SettingsFormValues = {
  displayName: "",
  email: "",
  language: "en",
  timezone: "UTC",
  emailNotifications: true,
  pushNotifications: false,
  marketingEmails: false,
  profileVisibility: "team",
};

type SettingsFormProps = {
  initialValues?: Partial<SettingsFormValues>;
  onSubmit?: (values: SettingsFormValues) => void | Promise<void>;
};

export default function SettingsForm({
  initialValues,
  onSubmit,
}: SettingsFormProps) {
  const [values, setValues] = useState<SettingsFormValues>({
    ...defaultValues,
    ...initialValues,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const updateField = <K extends keyof SettingsFormValues>(
    key: K,
    value: SettingsFormValues[K],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    setSavedMessage(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSavedMessage(null);

    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
      setSavedMessage("Settings saved successfully.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setValues({ ...defaultValues, ...initialValues });
    setSavedMessage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Profile
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Update your account details and contact information.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Display name
            </span>
            <input
              type="text"
              name="displayName"
              value={values.displayName}
              onChange={(event) =>
                updateField("displayName", event.target.value)
              }
              placeholder="Jane Doe"
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email address
            </span>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="jane@example.com"
              required
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
            />
          </label>
        </div>
      </section>

      <section className="space-y-6 border-t border-zinc-200 pt-10 dark:border-zinc-800">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Preferences
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Customize language, timezone, and profile visibility.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Language
            </span>
            <select
              name="language"
              value={values.language}
              onChange={(event) => updateField("language", event.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Timezone
            </span>
            <select
              name="timezone"
              value={values.timezone}
              onChange={(event) => updateField("timezone", event.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">London</option>
            </select>
          </label>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Profile visibility
          </legend>
          <div className="flex flex-wrap gap-4">
            {(
              [
                { value: "public", label: "Public" },
                { value: "team", label: "Team only" },
                { value: "private", label: "Private" },
              ] as const
            ).map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"
              >
                <input
                  type="radio"
                  name="profileVisibility"
                  value={option.value}
                  checked={values.profileVisibility === option.value}
                  onChange={() =>
                    updateField("profileVisibility", option.value)
                  }
                  className="h-4 w-4 accent-zinc-900 dark:accent-zinc-100"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <section className="space-y-6 border-t border-zinc-200 pt-10 dark:border-zinc-800">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Notifications
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Choose how you want to be notified about activity.
          </p>
        </div>

        <div className="space-y-4">
          {(
            [
              {
                key: "emailNotifications" as const,
                label: "Email notifications",
                description: "Receive updates about your account by email.",
              },
              {
                key: "pushNotifications" as const,
                label: "Push notifications",
                description: "Get real-time alerts in your browser.",
              },
              {
                key: "marketingEmails" as const,
                label: "Marketing emails",
                description: "Product news, tips, and promotional content.",
              },
            ] as const
          ).map((item) => (
            <label
              key={item.key}
              className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-zinc-200 px-4 py-3 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900/50"
            >
              <span>
                <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-sm text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </span>
              </span>
              <input
                type="checkbox"
                name={item.key}
                checked={values[item.key]}
                onChange={(event) =>
                  updateField(item.key, event.target.checked)
                }
                className="mt-1 h-4 w-4 shrink-0 rounded accent-zinc-900 dark:accent-zinc-100"
              />
            </label>
          ))}
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 border-t border-zinc-200 pt-8 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
        {savedMessage ? (
          <p
            role="status"
            className="text-sm font-medium text-emerald-600 dark:text-emerald-400"
          >
            {savedMessage}
          </p>
        ) : (
          <span className="hidden sm:block" />
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
