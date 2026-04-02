import { ROUTES } from '@/constants/routes';
import { MetadataRoute } from 'next';

export const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: [ROUTES.LOGIN, ROUTES.HOME, ROUTES.SHOP],
    disallow: [ROUTES.CART, ROUTES.PROFILE]
  },
  sitemap: `${process.env.BASE_URL}/sitemap.xml`
});

export default robots;
