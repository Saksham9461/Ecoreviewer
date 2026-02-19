import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Leaf, Upload, CheckCircle2 } from 'lucide-react';

interface AddReviewProps {
  onNavigate: (page: string) => void;
}

export function AddReview({ onNavigate }: AddReviewProps) {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState([4]);
  const [submitted, setSubmitted] = useState(false);

  const products = [
    'Eco Bamboo Toothbrush',
    'Reusable Water Bottle',
    'Organic Cotton Tote',
    'Natural Cleaning Set',
    'Solar Power Bank',
    'Biodegradable Phone Case',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onNavigate('products');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-secondary/20 flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Review Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for sharing your eco journey with the community.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => onNavigate('products')}>
                Browse Products
              </Button>
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Add Another
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary rounded-full p-2">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle>Add Your Review</CardTitle>
                <CardDescription>Share your experience with eco products</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Selection */}
              <div className="space-y-2">
                <Label htmlFor="product">Select Product *</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct} required>
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Choose a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product} value={product}>
                        {product}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Review Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Review Title *</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Sum up your experience"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Rating */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Your Rating *</Label>
                  <div className="flex items-center gap-2">
                    {[...Array(rating[0])].map((_, i) => (
                      <Leaf key={i} className="w-6 h-6 fill-primary text-primary" />
                    ))}
                    <span className="text-2xl font-bold text-primary ml-2">
                      {rating[0]}
                    </span>
                  </div>
                </div>
                <Slider
                  value={rating}
                  onValueChange={setRating}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>

              {/* Review Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Your Review *</Label>
                <Textarea
                  id="content"
                  placeholder="Share your detailed experience with this product..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Minimum 50 characters ({content.length}/50)
                </p>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Upload Photos (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={content.length < 50 || !selectedProduct}
                >
                  Submit Review
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onNavigate('products')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
