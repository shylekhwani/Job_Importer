import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Job Import Admin Dashboard</h1>

        <p className="mt-2 text-sm text-gray-600">
          This dashboard allows you to monitor job import runs from external
          feeds, including total, new, updated, and failed jobs.
        </p>
      </div>

      <Link
        href="/imports"
        className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        View Import History →
      </Link>
    </main>
  );
}
