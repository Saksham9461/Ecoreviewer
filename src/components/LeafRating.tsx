import { Leaf } from 'lucide-react';

interface LeafRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  onChange?: (rating: number) => void;
  interactive?: boolean;
}

export function LeafRating({ 
  rating, 
  maxRating = 5, 
  size = 'md', 
  showNumber = false,
  onChange,
  interactive = false 
}: LeafRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, index) => (
        <Leaf
          key={index}
          className={`${sizeClasses[size]} ${
            index < rating
              ? 'fill-green-600 text-green-600'
              : 'text-gray-300'
          } ${interactive ? 'cursor-pointer hover:fill-green-400 hover:text-green-400' : ''}`}
          onClick={() => handleClick(index)}
        />
      ))}
      {showNumber && (
        <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>
      )}
    </div>
  );
}
