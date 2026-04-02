export async function GET() {
  const res = await fetch('https://dummyjson.com/products/categories');
  const data = await res.json();

  return new Response(JSON.stringify(data));
}
