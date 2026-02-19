import { Leaf, Star, Award, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string, productId?: number) => void;
}

const featuredProducts = [
  {
    id: 1,
    name: 'Eco Bamboo Toothbrush',
    image: 'https://images.unsplash.com/photo-1589365354848-78104c17f92d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBzdXN0YWluYWJsZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc2MDQ1MTI2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    reviews: 124,
    certifications: ['Organic', 'Vegan'],
    price: '$8.99'
  },
  {
    id: 2,
    name: 'Reusable Water Bottle',
    image: 'https://images.unsplash.com/photo-1587310972467-27a5c504bfb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXVzYWJsZSUyMGJvdHRsZXN8ZW58MXx8fHwxNzYwNDUxMjY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    reviews: 89,
    certifications: ['BPA Free', 'Eco'],
    price: '$24.99'
  },
  {
    id: 3,
    name: 'Organic Cotton Tote',
    image: 'https://images.unsplash.com/photo-1678025546757-666c1f397c2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NjAzNDI3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4,
    reviews: 67,
    certifications: ['Organic', 'Fair Trade'],
    price: '$15.99'
  },
  {
    id: 4,
    name: 'Natural Cleaning Set',
    image: 'https://images.unsplash.com/photo-1525904097878-94fb15835963?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzYwNDUxMjY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    reviews: 156,
    certifications: ['Non-Toxic', 'Eco'],
    price: '$32.99'
  },
];

const trendingStories = [
  {
    id: 1,
    title: '10 Ways to Reduce Plastic in Your Daily Life',
    author: 'Sarah Green',
    image: 'https://images.unsplash.com/photo-1625409588021-8c8a6ad82d99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBncmVlbiUyMGxlYXZlc3xlbnwxfHx8fDE3NjA0NTEyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Lifestyle',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'The Rise of Sustainable Fashion',
    author: 'Emma Wilson',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGhvbWV8ZW58MXx8fHwxNzYwNDM1NDc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Fashion',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'Zero Waste Kitchen Essentials',
    author: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1678025546757-666c1f397c2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NjAzNDI3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Home',
    readTime: '6 min read'
  },
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent to-secondary/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                <Leaf className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Sustainable Living Platform</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                Review Green,<br />Inspire Clean
              </h1>
              <p className="text-xl text-muted-foreground">
                Discover, review, and share eco-friendly products that make a difference. Join our community of conscious consumers.
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={() => onNavigate('products')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Explore Products
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('blog')}
                >
                  Share Your Story
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1625409588021-8c8a6ad82d99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBncmVlbiUyMGxlYXZlc3xlbnwxfHx8fDE3NjA0NTEyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Eco friendly"
                className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Leaf, value: '10K+', label: 'Eco Products' },
              { icon: Star, value: '50K+', label: 'Reviews' },
              { icon: Award, value: '5K+', label: 'Active Users' },
              { icon: TrendingUp, value: '95%', label: 'Satisfaction' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-full mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Featured Eco Products</h2>
              <p className="text-muted-foreground mt-2">Discover top-rated sustainable products</p>
            </div>
            <Button variant="outline" onClick={() => onNavigate('products')}>
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('product-detail', product.id)}>
                <CardHeader className="p-0">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(product.rating)].map((_, i) => (
                      <Leaf key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    {product.certifications.map((cert) => (
                      <Badge key={cert} variant="secondary" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-lg font-semibold text-primary">{product.price}</div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('add-review');
                    }}
                  >
                    Add Review
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Stories */}
      <section className="py-16 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Trending Eco Stories</h2>
              <p className="text-muted-foreground mt-2">Get inspired by community stories</p>
            </div>
            <Button variant="outline" onClick={() => onNavigate('blog')}>
              View All
              <BookOpen className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingStories.map((story) => (
              <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="p-0">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.title}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <Badge className="mb-3">{story.category}</Badge>
                  <h3 className="font-semibold mb-3">{story.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{story.author}</span>
                    <span>{story.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Leaf className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Join the Green Revolution</h2>
          <p className="text-xl opacity-90 mb-8">
            Share your eco journey, inspire others, and make a positive impact on our planet
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => onNavigate('signup')}
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10"
              onClick={() => onNavigate('about')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
