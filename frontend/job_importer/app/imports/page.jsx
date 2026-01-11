import ImportTable from "@/src/components/ui/importTable";
import { fetchImports } from "@/src/lib/api";

export default async function ImportsPage() {
  let imports = [];

  try {
    imports = await fetchImports();
  } catch (error) {
    return (
      <div>
        <h2 className="text-lg font-semibold">Import History</h2>
        <p className="mt-4 text-sm text-red-600">
          Failed to load import history.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Import History</h2>

      {imports.length === 0 ? (
        <p className="text-sm text-gray-600">No import history found.</p>
      ) : (
        <ImportTable imports={imports} />
      )}
    </div>
  );
}
