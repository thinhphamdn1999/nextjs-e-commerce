'use client';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/common/ui/carousel';

import { cn } from '@/lib/utils';

interface ProductImagesProps {
  images: string[];
}

export default function ProductImages({ images }: ProductImagesProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleThumbClick = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <div className="grid items-center gap-4 lg:grid-cols-[152px_1fr]">
      <Carousel
        className="mt-10 hidden max-w-xs flex-col lg:flex"
        opts={{
          align: 'start'
        }}
        orientation="vertical"
      >
        <CarouselContent className="mt-0 flex max-h-[200px] gap-2 lg:max-h-[300px] xl:max-h-[400px]">
          {images.map((imageUrl, index) => (
            <CarouselItem
              key={index}
              className={cn(
                'bg-background-image min-h-[167px] basis-1/5 cursor-pointer rounded-lg pt-1',
                current === index + 1 ? 'border-1 opacity-100' : 'opacity-50'
              )}
              onClick={() => handleThumbClick(index)}
            >
              <Image
                src={imageUrl}
                alt={`Product image ${index + 1}`}
                width={150}
                height={167}
                className="h-auto w-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Carousel setApi={setApi} className="flex items-center">
        <CarouselContent>
          {images.map((imageUrl, index) => (
            <CarouselItem key={index}>
              <div className="bg-background-image relative rounded-lg p-0">
                <Image
                  src={imageUrl}
                  alt={`Product image ${index + 1}`}
                  width={600}
                  height={600}
                  priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel className="mt-4 w-full lg:hidden">
        <CarouselContent className="my-1 ml-0 flex gap-2">
          {images.map((imageUrl, index) => (
            <CarouselItem
              key={index}
              className={cn(
                'bg-background-image basis-1/3 cursor-pointer rounded-lg p-0 pt-1',
                current === index + 1 ? 'border-1 opacity-100' : 'opacity-50'
              )}
              onClick={() => handleThumbClick(index)}
            >
              <div className="bg-background-image relative flex items-center justify-center rounded-lg">
                <Image
                  src={imageUrl}
                  alt={`Product image ${index + 1}`}
                  width={150}
                  height={150}
                  priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
