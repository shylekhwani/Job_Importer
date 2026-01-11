export default function ImportTable({ imports }) {
  return (
    <div className="overflow-x-auto rounded-md border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2">Source</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">New</th>
            <th className="px-4 py-2">Updated</th>
            <th className="px-4 py-2">Failed</th>
            <th className="px-4 py-2">Imported At</th>
          </tr>
        </thead>

        <tbody>
          {imports.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="px-4 py-2 max-w-xs truncate">{item.sourceFile}</td>
              <td className="px-4 py-2">{item.totalFetched}</td>
              <td className="px-4 py-2 text-green-600">{item.newJobs}</td>
              <td className="px-4 py-2 text-blue-600">{item.updatedJobs}</td>
              <td className="px-4 py-2 text-red-600">{item.failedJobs}</td>
              <td className="px-4 py-2">
                {new Date(item.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
