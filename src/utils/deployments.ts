// src/utils/deployments.ts
export async function fetchDeployments(): Promise<any[]> {
  const res = await fetch('/deployments.json');
  if (!res.ok) return [];
  return await res.json();
}
