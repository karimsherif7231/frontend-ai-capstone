import SettingsForm from "@/components/SettingsForm";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12 sm:px-8">
        <Link
          href="/"
          className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← Back to home
        </Link>

        <header className="mt-6 mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Settings
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Manage your profile, preferences, and notification settings.
          </p>
        </header>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-950">
          <SettingsForm
            initialValues={{
              displayName: "Jane Doe",
              email: "jane@example.com",
            }}
          />
        </div>
      </main>
    </div>
  );
}
