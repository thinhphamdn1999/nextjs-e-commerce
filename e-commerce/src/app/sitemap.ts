import { MetadataRoute } from 'next';
import { ROUTES } from '@/constants/routes';

export const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: `${process.env.BASE_URL}${ROUTES.HOME}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1
    },
    {
      url: `${process.env.BASE_URL}${ROUTES.LOGIN}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }
  ];
};

export default sitemap;
