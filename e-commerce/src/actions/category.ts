'use server';

import { Category } from '@/types/category';
import apiService from '@/utils/api-service';

const getCategoryList = async () => {
  const res = await apiService.get<Category[]>('api/category', {
    cache: 'force-cache'
  });

  if (res.error) {
    throw new Error('Failed to fetch categories');
  }

  if (!res.data || res.data.length === 0) {
    return [];
  }

  const categories = res.data;
  return categories;
};

export { getCategoryList };
