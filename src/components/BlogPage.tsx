import { useState } from 'react';
import { Search, Plus, Eye, Heart, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

const blogPosts = [
  {
    id: 1,
    title: '10 Ways to Reduce Plastic in Your Daily Life',
    excerpt: 'Simple yet effective strategies to minimize plastic consumption and make a real difference for our planet.',
    author: 'Sarah Green',
    authorAvatar: 'SG',
    image: 'https://images.unsplash.com/photo-1625409588021-8c8a6ad82d99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBncmVlbiUyMGxlYXZlc3xlbnwxfHx8fDE3NjA0NTEyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Lifestyle',
    date: '2025-10-12',
    readTime: '5 min read',
    views: 1234,
    likes: 89,
    comments: 23
  },
  {
    id: 2,
    title: 'The Rise of Sustainable Fashion',
    excerpt: 'Exploring how the fashion industry is transforming towards more sustainable and ethical practices.',
    author: 'Emma Wilson',
    authorAvatar: 'EW',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGhvbWV8ZW58MXx8fHwxNzYwNDM1NDc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Fashion',
    date: '2025-10-10',
    readTime: '7 min read',
    views: 2156,
    likes: 156,
    comments: 45
  },
  {
    id: 3,
    title: 'Zero Waste Kitchen Essentials',
    excerpt: 'A comprehensive guide to building a sustainable kitchen with zero waste principles.',
    author: 'Michael Chen',
    authorAvatar: 'MC',
    image: 'https://images.unsplash.com/photo-1678025546757-666c1f397c2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NjAzNDI3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Home',
    date: '2025-10-08',
    readTime: '6 min read',
    views: 987,
    likes: 72,
    comments: 18
  },
  {
    id: 4,
    title: 'Green Energy at Home: A Beginner\'s Guide',
    excerpt: 'Learn how to transition to renewable energy sources and reduce your carbon footprint.',
    author: 'Alex Johnson',
    authorAvatar: 'AJ',
    image: 'https://images.unsplash.com/photo-1587310972467-27a5c504bfb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXVzYWJsZSUyMGJvdHRsZXN8ZW58MXx8fHwxNzYwNDUxMjY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Energy',
    date: '2025-10-05',
    readTime: '8 min read',
    views: 1543,
    likes: 124,
    comments: 31
  },
  {
    id: 5,
    title: 'Eco-Friendly Travel Tips',
    excerpt: 'Discover how to explore the world while minimizing your environmental impact.',
    author: 'Lisa Martinez',
    authorAvatar: 'LM',
    image: 'https://images.unsplash.com/photo-1525904097878-94fb15835963?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzYwNDUxMjY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Travel',
    date: '2025-10-03',
    readTime: '5 min read',
    views: 2341,
    likes: 198,
    comments: 52
  },
  {
    id: 6,
    title: 'Composting 101: From Scraps to Soil',
    excerpt: 'Everything you need to know to start composting at home and reduce food waste.',
    author: 'Tom Anderson',
    authorAvatar: 'TA',
    image: 'https://images.unsplash.com/photo-1589365354848-78104c17f92d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBzdXN0YWluYWJsZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc2MDQ1MTI2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Gardening',
    date: '2025-10-01',
    readTime: '6 min read',
    views: 876,
    likes: 64,
    comments: 15
  }
];

const categories = ['All', 'Lifestyle', 'Fashion', 'Home', 'Energy', 'Travel', 'Gardening'];

export function BlogPage({ onNavigate }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Eco Stories & Inspiration</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Read, share, and get inspired by sustainable living stories
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Share Your Story
          </Button>
        </div>

        {/* Search and Categories */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-primary text-primary-foreground' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <Card className="mb-12 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="grid md:grid-cols-2">
              <CardHeader className="p-0">
                <ImageWithFallback
                  src={filteredPosts[0].image}
                  alt={filteredPosts[0].title}
                  className="w-full h-full object-cover min-h-[300px]"
                />
              </CardHeader>
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge className="mb-4 w-fit">Featured Story</Badge>
                <h2 className="text-3xl font-bold mb-4">{filteredPosts[0].title}</h2>
                <p className="text-muted-foreground mb-6">{filteredPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="bg-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {filteredPosts[0].authorAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{filteredPosts[0].author}</div>
                    <div className="text-sm text-muted-foreground">
                      {filteredPosts[0].date} • {filteredPosts[0].readTime}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {filteredPosts[0].views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {filteredPosts[0].likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {filteredPosts[0].comments}
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="p-0">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-3">
                  {post.category}
                </Badge>
                <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-8 h-8 bg-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {post.authorAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{post.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {post.readTime}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {post.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {post.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {post.comments}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No stories found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
