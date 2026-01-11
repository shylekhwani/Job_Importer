"use client";
import { useState, useEffect } from "react";
import ImportTable from "@/src/components/ui/ImportTable";
import { fetchImports } from "@/src/lib/api";
import Pagination from "@/src/components/ui/Pagination";

export default function ImportsPage() {
  const [imports, setImports] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetchImports(page, limit);
        setImports(res.data);
        setPagination(res.pagination);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Import History</h2>

      {loading ? (
        <p className="text-sm text-gray-600">Loading...</p>
      ) : imports.length === 0 ? (
        <p className="text-sm text-gray-600">No import history found.</p>
      ) : (
        <>
          <ImportTable imports={imports} />
          {pagination && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
