'use server'

import { notFound } from 'next/navigation';

import { Product } from '@/types/products';
import apiService from '@/utils/api-service';

const getProductDetail = async (slug: string) => {
  const res = await apiService.get<Product>(`api/products/${slug}`, {
    next: {
      revalidate: 3600 // Revalidate every 1 hour
    }
  });

  if (res.error && res.status !== 404) {
    throw new Error('Failed to fetch product details');
  }

  if (!res.data) {
    notFound();
  }

  return res.data as Product;
};

export { getProductDetail };
