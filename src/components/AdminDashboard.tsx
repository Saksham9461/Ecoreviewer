import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Users, Package, MessageSquare, TrendingUp, 
  CheckCircle2, XCircle, Clock, BarChart3 
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '5,234', icon: Users, change: '+12%', trend: 'up' },
    { label: 'Products', value: '1,456', icon: Package, change: '+8%', trend: 'up' },
    { label: 'Reviews', value: '12,458', icon: MessageSquare, change: '+23%', trend: 'up' },
    { label: 'Eco Score Avg', value: '84%', icon: TrendingUp, change: '+5%', trend: 'up' },
  ];

  const pendingProducts = [
    { id: 1, name: 'Bamboo Cutlery Set', submitter: 'Sarah Green', date: '2025-10-14' },
    { id: 2, name: 'Eco Laundry Detergent', submitter: 'Mike Chen', date: '2025-10-13' },
    { id: 3, name: 'Solar Garden Lights', submitter: 'Emma Wilson', date: '2025-10-13' },
  ];

  const pendingReviews = [
    { id: 1, product: 'Eco Bamboo Toothbrush', reviewer: 'John Doe', rating: 5, date: '2025-10-14' },
    { id: 2, product: 'Reusable Water Bottle', reviewer: 'Jane Smith', rating: 4, date: '2025-10-14' },
    { id: 3, product: 'Organic Cotton Tote', reviewer: 'Bob Johnson', rating: 5, date: '2025-10-13' },
  ];

  const userActivity = [
    { name: 'Mon', users: 420 },
    { name: 'Tue', users: 580 },
    { name: 'Wed', users: 650 },
    { name: 'Thu', users: 720 },
    { name: 'Fri', users: 890 },
    { name: 'Sat', users: 1020 },
    { name: 'Sun', users: 950 },
  ];

  const reviewStats = [
    { name: '5 Stars', value: 65 },
    { name: '4 Stars', value: 20 },
    { name: '3 Stars', value: 10 },
    { name: '2 Stars', value: 3 },
    { name: '1 Star', value: 2 },
  ];

  const categoryData = [
    { name: 'Personal Care', products: 320 },
    { name: 'Home', products: 280 },
    { name: 'Fashion', products: 240 },
    { name: 'Electronics', products: 180 },
    { name: 'Kitchen', products: 220 },
    { name: 'Other', products: 216 },
  ];

  const COLORS = ['#2d6a4f', '#52b788', '#74c69d', '#95d5b2', '#b7e4c7'];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage products, reviews, and users</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-primary/10 rounded-full p-2">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Product Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-accent rounded-lg">
                      <div>
                        <div className="font-semibold">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Submitted by {product.submitter} • {product.date}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-primary text-primary-foreground">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Review Moderation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingReviews.map((review) => (
                    <div key={review.id} className="flex items-center justify-between p-4 bg-accent rounded-lg">
                      <div>
                        <div className="font-semibold">{review.product}</div>
                        <div className="text-sm text-muted-foreground">
                          By {review.reviewer} • {review.rating} stars • {review.date}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-primary text-primary-foreground">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-accent rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                          U{i}
                        </div>
                        <div>
                          <div className="font-semibold">User {i}</div>
                          <div className="text-sm text-muted-foreground">
                            user{i}@example.com • Joined Oct 2025
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">Active</Badge>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* User Activity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Daily Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={userActivity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#2d6a4f" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Review Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Review Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={reviewStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {reviewStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Products by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="products" fill="#2d6a4f" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
