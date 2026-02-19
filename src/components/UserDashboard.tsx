import { Avatar, AvatarFallback } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Leaf, Award, TrendingUp, Star, Calendar } from 'lucide-react';

export function UserDashboard() {
  const ecoScore = 78;

  const reviews = [
    { id: 1, product: 'Eco Bamboo Toothbrush', rating: 5, date: '2025-10-10', comment: 'Amazing quality, highly recommend!' },
    { id: 2, product: 'Reusable Water Bottle', rating: 4, date: '2025-10-05', comment: 'Great product, keeps water cold all day.' },
    { id: 3, product: 'Organic Cotton Tote', rating: 5, date: '2025-09-28', comment: 'Perfect size and very durable.' },
  ];

  const stories = [
    { id: 1, title: 'My Journey to Zero Waste', views: 234, date: '2025-10-08' },
    { id: 2, title: 'Switching to Eco-Friendly Cleaning', views: 189, date: '2025-09-22' },
  ];

  const achievements = [
    { name: 'Eco Warrior', icon: Leaf, description: '50+ reviews', unlocked: true },
    { name: 'Green Hero', icon: Award, description: '10 stories shared', unlocked: true },
    { name: 'Planet Saver', icon: TrendingUp, description: 'Eco score > 75', unlocked: true },
    { name: 'Community Leader', icon: Star, description: '1000+ followers', unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">Jay Desai</h1>
                <p className="text-muted-foreground mb-4">
                  Passionate about sustainable living and eco-friendly products. Making the world greener, one review at a time! 🌱
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <div>
                    <div className="font-semibold">42</div>
                    <div className="text-sm text-muted-foreground">Reviews</div>
                  </div>
                  <div className="border-l border-border pl-4">
                    <div className="font-semibold">12</div>
                    <div className="text-sm text-muted-foreground">Stories</div>
                  </div>
                  <div className="border-l border-border pl-4">
                    <div className="font-semibold">256</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                </div>
              </div>
              <div className="bg-accent rounded-xl p-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-3">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - ecoScore / 100)}`}
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div>
                      <div className="text-3xl font-bold text-primary">{ecoScore}</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-primary">Eco Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="reviews" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="reviews">My Reviews</TabsTrigger>
            <TabsTrigger value="stories">My Stories</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold mb-2">{review.product}</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Leaf key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {review.date}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Stories Tab */}
          <TabsContent value="stories" className="space-y-4">
            {stories.map((story) => (
              <Card key={story.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{story.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{story.views} views</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {story.date}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">Published</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className={achievement.unlocked ? 'border-primary' : 'opacity-60'}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-full ${achievement.unlocked ? 'bg-primary' : 'bg-muted'}`}>
                        <achievement.icon className={`w-6 h-6 ${achievement.unlocked ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <Badge variant="default" className="bg-primary">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
