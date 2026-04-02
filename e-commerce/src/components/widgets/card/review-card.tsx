import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/common/ui/card';
import StarRating from '@/components/features/shopping/product/star-rating';
import GreenCheck from '@/components/common/icons/green-check';

interface ReviewCardProps {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  rating,
  comment,
  date,
  reviewerName,
  reviewerEmail
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="bottom-px rounded-[1.25rem] border-black/10">
      <CardHeader className="space-y-0 pt-2 pb-4">
        <StarRating rating={rating} rate={false} />

        <CardTitle className="flex items-center justify-start gap-2">
          <span>{reviewerName}</span>
          <GreenCheck />
        </CardTitle>
        <CardDescription>{reviewerEmail}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-primary">&quot;{comment}&quot;</p>
      </CardContent>
      <CardFooter>
        <p className="text-primary text-base font-medium">
          Posted on {formattedDate}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
