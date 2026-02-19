import { Leaf, Award, ShieldCheck, Users, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailProps {
  onNavigate: (page: string) => void;
  productId?: number;
}

export function ProductDetail({ onNavigate, productId }: ProductDetailProps) {
  const product = {
    id: productId || 1,
    name: 'Eco Bamboo Toothbrush',
    image: 'https://images.unsplash.com/photo-1589365354848-78104c17f92d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBzdXN0YWluYWJsZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc2MDQ1MTI2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 8.99,
    category: 'Personal Care',
    description: 'Our eco-friendly bamboo toothbrush is made from 100% sustainable bamboo with BPA-free bristles. The handle is biodegradable and the packaging is plastic-free. Perfect for those looking to reduce their environmental impact while maintaining excellent oral hygiene.',
    certifications: [
      { name: 'Organic', icon: Award },
      { name: 'Vegan', icon: Leaf },
      { name: 'Fair Trade', icon: ShieldCheck },
      { name: 'Carbon Neutral', icon: Users }
    ],
    sustainabilityScore: 92,
    rating: 4.8,
    totalReviews: 124,
    ratingBreakdown: [
      { stars: 5, count: 95, percentage: 77 },
      { stars: 4, count: 20, percentage: 16 },
      { stars: 3, count: 6, percentage: 5 },
      { stars: 2, count: 2, percentage: 2 },
      { stars: 1, count: 1, percentage: 1 },
    ]
  };

  const reviews = [
    {
      id: 1,
      author: 'Sarah Green',
      avatar: 'SG',
      rating: 5,
      date: '2025-10-10',
      comment: 'Absolutely love this toothbrush! The bamboo handle feels great and I love that it\'s fully biodegradable. The bristles are soft yet effective. Highly recommend!',
      helpful: 24
    },
    {
      id: 2,
      author: 'Michael Chen',
      avatar: 'MC',
      rating: 5,
      date: '2025-10-08',
      comment: 'Great product. I\'ve been using it for 2 months now and it\'s holding up well. The packaging was completely plastic-free which is a huge plus.',
      helpful: 18
    },
    {
      id: 3,
      author: 'Emma Wilson',
      avatar: 'EW',
      rating: 4,
      date: '2025-10-05',
      comment: 'Good quality toothbrush. The only reason I didn\'t give 5 stars is that the bristles are a bit softer than I prefer, but overall great eco-friendly option.',
      helpful: 12
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Header */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Leaf
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-primary text-primary'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.totalReviews} reviews)
                </span>
              </div>
              <div className="text-3xl font-bold text-primary mb-4">
                ${product.price}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Certifications</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-accent p-3 rounded-lg"
                  >
                    <cert.icon className="w-5 h-5 text-primary" />
                    <span>{cert.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Sustainability Score</h3>
                <span className="text-2xl font-bold text-primary">
                  {product.sustainabilityScore}%
                </span>
              </div>
              <Progress value={product.sustainabilityScore} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                Based on materials, production, and environmental impact
              </p>
            </div>

            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => onNavigate('add-review')}
            >
              Add Your Review
            </Button>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Reviews Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-primary mb-2">
                  {product.rating}
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Leaf
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-primary text-primary'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  Based on {product.totalReviews} reviews
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardContent className="p-6 space-y-3">
                {product.ratingBreakdown.map((breakdown) => (
                  <div key={breakdown.stars} className="flex items-center gap-3">
                    <span className="text-sm w-12">{breakdown.stars} leaf{breakdown.stars > 1 ? 's' : ''}</span>
                    <Progress value={breakdown.percentage} className="flex-1" />
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {breakdown.count}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="bg-primary">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {review.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-semibold">{review.author}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {review.date}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Leaf key={i} className="w-4 h-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">{review.comment}</p>
                      <Button variant="ghost" size="sm">
                        👍 Helpful ({review.helpful})
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Reviews
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
