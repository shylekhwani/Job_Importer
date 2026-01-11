const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchImports() {
  const res = await fetch(`${API_BASE_URL}/imports`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch imports");
  }

  return res.json();
}
