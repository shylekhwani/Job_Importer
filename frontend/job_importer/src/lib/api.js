const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchImports(page = 1, limit = 10) {
  const res = await fetch(
    `${API_BASE_URL}/imports?page=${page}&limit=${limit}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch imports");
  }

  return res.json();
}
