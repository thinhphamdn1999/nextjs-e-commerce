export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const res = await fetch(`https://dummyjson.com/products/${slug}`);
  const data = await res.json();

  return new Response(JSON.stringify(data), { status: res.status });
}
