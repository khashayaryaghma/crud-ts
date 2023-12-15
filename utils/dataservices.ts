export async function getData(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function postData(url: string, data: any) {
  const res = await fetch(url, {
    method: "POST",
    body: data,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
}