import StarSVG from '@/components/common/icons/star';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  className?: string;
  rate?: boolean;
}

const StarRating = ({ rating, className, rate = true }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div
      className={cn(
        'my-3 flex items-center justify-start gap-2 md:my-3.5',
        className
      )}
    >
      <div className={cn('flex gap-2')}>
        {/* FULL STARS */}
        {[...Array(fullStars)].map((_, index) => (
          <StarSVG key={`full-${index}`} className="fill-star" />
        ))}

        {/* HALF STAR */}
        {hasHalfStar && (
          <div className="relative">
            <StarSVG
              className="fill-star"
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            />
            <StarSVG className="stroke-star absolute top-0 left-0 fill-none" />
          </div>
        )}

        {/* EMPTY STARS */}
        {[...Array(5 - Math.ceil(rating))].map((_, index) => (
          <StarSVG key={`empty-${index}`} className="stroke-star fill-none" />
        ))}
      </div>

      {/* RATING */}
      {rate && (
        <p className="text-primary">
          <span className="text-secondary">{rating}</span>/5
        </p>
      )}
    </div>
  );
};

export default StarRating;
