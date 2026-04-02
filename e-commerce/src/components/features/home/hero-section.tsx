import Link from 'next/link';
import Image from 'next/image';

import { ROUTES } from '@/constants/routes';

import { convertNumberToString } from '@/utils/text';

const stats = [
  {
    figures: 200,
    text: 'International Brands'
  },
  {
    figures: 2000,
    text: 'High-Quality Products'
  },
  {
    figures: 30000,
    text: 'Happy Customers'
  }
];

const HeroSection = () => {
  return (
    <section className="full-width content-grid bg-background-hero pt-12 pb-28">
      <div className="container m-auto flex justify-between gap-12 px-3 max-lg:flex-col lg:items-center lg:gap-8">
        <div className="max-w-[38rem] space-y-5 lg:space-y-12">
          <div className="space-y-5 lg:space-y-8">
            <h2 className="font-integral text-secondary text-4xl leading-[2.125rem] font-bold max-md:max-w-[22.5rem] md:text-5xl lg:text-[4rem] lg:leading-[4rem]">
              FIND ANY PRODUCT THAT YOU NEED
            </h2>

            <p className="text-primary text-sm max-md:max-w-[22.5rem] md:text-base">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>

            <Link
              href={ROUTES.SHOP}
              className="bg-secondary text-contained w-full rounded-xl px-14 py-4 text-sm font-semibold md:w-fit"
            >
              Shop Now
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 space-x-2 md:justify-between">
            {stats.map(({ figures, text }, i) => (
              <div
                key={i}
                className="border-border-foreground w-[9.7rem] border-r last:border-r-0 max-lg:nth-[2]:border-r-0"
              >
                <p className="text-2xl font-bold md:text-[2rem] lg:text-[2.5rem]">
                  {convertNumberToString(figures)}+
                </p>
                <p className="text-primary text-xs md:text-sm lg:text-base">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <figure className="basis-0.2 relative aspect-square w-full">
          <Image
            src={'/images/hero-image.jpg'}
            alt="Hero Image"
            fill
            priority
            sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (min-width: 1281px) 20vw'
            className='object-contain'
          />
        </figure>
      </div>
    </section>
  );
};
export default HeroSection;
