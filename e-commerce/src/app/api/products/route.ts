import { Product } from '@/types/products';
import { NextRequest } from 'next/server';

// This is a mock API endpoint that fetches product data from a dummy JSON API.
// In a real-world application, you would replace this with your actual API endpoint or build your own API in your backend.
// The mock API return 200 products, and you can filter them by price, categories, brands, and pagination.
const getAllProducts = async ({
  sortBy,
  order
}: {
  sortBy: string;
  order: string;
}) => {
  const res = await fetch(
    `https://dummyjson.com/products?limit=200&skip=0&sortBy=${sortBy}&order=${order}`
  );
  const json = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return json;
};

const paginateProducts = (products: Product[], limit = 10, offset = 0) => {
  const startIndex = Math.max(0, offset);
  const endIndex = Math.min(products.length, startIndex + limit);

  return products.slice(startIndex, endIndex);
};

function filterByPrice(
  products: Product[],
  minPrice: number,
  maxPrice: number
) {
  return products.filter(({ price }) => {
    return price >= minPrice && price <= maxPrice;
  });
}

function filterByCategories(products: Product[], categories: string | null) {
  if (!categories) return products;

  return products.filter(({ category }) => categories.includes(category));
}

function filterByBrands(products: Product[], brands: string[]) {
  if (brands.length === 0) return products;

  return products.filter(({ brand }) => brands.includes(brand));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const minPrice = searchParams.get('minPrice') || '0';
  const maxPrice = searchParams.get('maxPrice') || '100000';
  const categories = searchParams.get('category');
  const brands = searchParams.getAll('brands');
  const limit = searchParams.get('limit') || '9';
  const offset = searchParams.get('offset') || '0';
  const sortBy = searchParams.get('sortBy') || 'price';
  const order = searchParams.get('order') || 'asc';

  const res = await getAllProducts({ sortBy, order });

  let products = res.products as Product[];
  products = filterByBrands(products, brands);
  products = filterByCategories(products, categories);
  products = filterByPrice(products, parseInt(minPrice), parseInt(maxPrice));
  const total = products.length;

  products = paginateProducts(products, parseInt(limit), parseInt(offset));

  const response = {
    pagination: {
      total,
      limit: parseInt(limit),
      offset: parseInt(offset)
    },
    data: {
      products
    }
  };

  return new Response(JSON.stringify(response), { status: 200 });
}
