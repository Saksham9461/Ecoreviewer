import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Users, 
  MessageSquare, 
  TrendingUp,
  Trash2,
  Edit,
  Eye
} from 'lucide-react';
import { LeafRating } from '../components/LeafRating';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { toast } from 'sonner@2.0.3';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  ecoScore: number;
}

interface Review {
  id: string;
  productName: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export function AdminDashboard() {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'products' | 'reviews'>('products');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (!isAdmin) {
      navigate('/');
      toast.error('Access denied. Admin only.');
      return;
    }
    fetchData();
  }, [currentUser, isAdmin, navigate]);

  const fetchData = async () => {
    try {
      // Fetch products
      const productsQuery = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const productsSnapshot = await getDocs(productsQuery);
      const productsData = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);

      // Fetch reviews
      const reviewsQuery = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
      const reviewsSnapshot = await getDocs(reviewsQuery);
      const reviewsData = reviewsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await deleteDoc(doc(db, 'products', productId));
      setProducts(products.filter(p => p.id !== productId));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    try {
      await deleteDoc(doc(db, 'reviews', reviewId));
      setReviews(reviews.filter(r => r.id !== reviewId));
      toast.success('Review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };

  const stats = [
    {
      icon: Package,
      label: 'Total Products',
      value: products.length,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: MessageSquare,
      label: 'Total Reviews',
      value: reviews.length,
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: TrendingUp,
      label: 'Avg Rating',
      value: products.length > 0 
        ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)
        : '0.0',
      color: 'bg-yellow-100 text-yellow-600'
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage products, reviews, and monitor platform activity</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex gap-4 px-6">
              <button
                onClick={() => setActiveTab('products')}
                className={`py-4 px-6 font-semibold border-b-2 transition ${
                  activeTab === 'products'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Products ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-6 font-semibold border-b-2 transition ${
                  activeTab === 'reviews'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Reviews ({reviews.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : activeTab === 'products' ? (
              <div className="space-y-4">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.brand} • {product.category}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <LeafRating rating={product.rating} size="sm" />
                          <span className="text-sm text-gray-500">
                            {product.reviewCount} reviews
                          </span>
                          <span className="text-sm font-semibold text-green-600">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                            {product.ecoScore}% Eco
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/products/${product.id}`)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No products yet</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-gray-800">{review.userName}</span>
                            <LeafRating rating={review.rating} size="sm" />
                          </div>
                          <p className="text-sm text-green-600 font-semibold mb-1">
                            {review.productName}
                          </p>
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition ml-4"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No reviews yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
