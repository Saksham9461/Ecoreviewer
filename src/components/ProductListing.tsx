import { useState } from 'react';
import { Search, SlidersHorizontal, Leaf } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductListingProps {
  onNavigate: (page: string, productId?: number) => void;
}

const allProducts = [
  {
    id: 1,
    name: 'Eco Bamboo Toothbrush',
    image: 'https://images.unsplash.com/photo-1589365354848-78104c17f92d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBzdXN0YWluYWJsZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc2MDQ1MTI2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    reviews: 124,
    certifications: ['Organic', 'Vegan'],
    price: 8.99,
    category: 'Personal Care'
  },
  {
    id: 2,
    name: 'Reusable Water Bottle',
    image: 'https://images.unsplash.com/photo-1587310972467-27a5c504bfb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXVzYWJsZSUyMGJvdHRsZXN8ZW58MXx8fHwxNzYwNDUxMjY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    reviews: 89,
    certifications: ['BPA Free', 'Eco'],
    price: 24.99,
    category: 'Kitchen'
  },
  {
    id: 3,
    name: 'Organic Cotton Tote',
    image: 'https://images.unsplash.com/photo-1678025546757-666c1f397c2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NjAzNDI3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4,
    reviews: 67,
    certifications: ['Organic', 'Fair Trade'],
    price: 15.99,
    category: 'Fashion'
  },
  {
    id: 4,
    name: 'Natural Cleaning Set',
    image: 'https://images.unsplash.com/photo-1525904097878-94fb15835963?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzYwNDUxMjY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    reviews: 156,
    certifications: ['Non-Toxic', 'Eco'],
    price: 32.99,
    category: 'Home'
  },
  {
    id: 5,
    name: 'Solar Power Bank',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGhvbWV8ZW58MXx8fHwxNzYwNDM1NDc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4,
    reviews: 92,
    certifications: ['Solar', 'Eco'],
    price: 45.99,
    category: 'Electronics'
  },
  {
    id: 6,
    name: 'Biodegradable Phone Case',
    image: 'https://images.unsplash.com/photo-1625409588021-8c8a6ad82d99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBncmVlbiUyMGxlYXZlc3xlbnwxfHx8fDE3NjA0NTEyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    reviews: 78,
    certifications: ['Biodegradable', 'Vegan'],
    price: 19.99,
    category: 'Electronics'
  },
];

export function ProductListing({ onNavigate }: ProductListingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesRating = selectedRating === 'all' || product.rating >= parseInt(selectedRating);
    const matchesCertifications = selectedCertifications.length === 0 || 
      selectedCertifications.some(cert => product.certifications.includes(cert));
    
    return matchesSearch && matchesCategory && matchesRating && matchesCertifications;
  });

  const categories = ['all', ...Array.from(new Set(allProducts.map(p => p.category)))];
  const certifications = Array.from(new Set(allProducts.flatMap(p => p.certifications)));

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Eco Products</h1>
          <p className="text-muted-foreground">Discover sustainable products reviewed by our community</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search eco products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="mb-3 block">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat === 'all' ? 'All Categories' : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-3 block">Minimum Rating</Label>
                  <Select value={selectedRating} onValueChange={setSelectedRating}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="4">4+ Leaves</SelectItem>
                      <SelectItem value="5">5 Leaves</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-3 block">Certifications</Label>
                  <div className="space-y-2">
                    {certifications.slice(0, 4).map((cert) => (
                      <div key={cert} className="flex items-center">
                        <Checkbox
                          id={cert}
                          checked={selectedCertifications.includes(cert)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCertifications([...selectedCertifications, cert]);
                            } else {
                              setSelectedCertifications(selectedCertifications.filter(c => c !== cert));
                            }
                          }}
                        />
                        <Label htmlFor={cert} className="ml-2 cursor-pointer">
                          {cert}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results */}
        <div className="mb-4 text-muted-foreground">
          Showing {filteredProducts.length} products
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onNavigate('product-detail', product.id)}
            >
              <CardHeader className="p-0">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2">{product.category}</Badge>
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(product.rating)].map((_, i) => (
                    <Leaf key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {product.certifications.map((cert) => (
                    <Badge key={cert} variant="secondary" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
                <div className="text-lg font-semibold text-primary">${product.price}</div>
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Leaf className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
}
