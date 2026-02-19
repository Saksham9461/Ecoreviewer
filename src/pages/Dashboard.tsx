import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router';
import { 
  Leaf, 
  TrendingUp, 
  MessageSquare, 
  Award, 
  Calendar,
  Star
} from 'lucide-react';
import { LeafRating } from '../components/LeafRating';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';

interface Review {
  id: string;
  productId: string;
  productName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export function Dashboard() {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const [recentReviews, setRecentReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    fetchUserReviews();
  }, [currentUser, navigate]);

  const fetchUserReviews = async () => {
    if (!currentUser) return;
    
    try {
      const q = query(
        collection(db, 'reviews'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const snapshot = await getDocs(q);
      const reviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setRecentReviews(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) return null;

  const ecoLevel = 
    userData.ecoScore >= 1000 ? 'Eco Champion' :
    userData.ecoScore >= 500 ? 'Eco Warrior' :
    userData.ecoScore >= 200 ? 'Eco Enthusiast' :
    'Eco Beginner';

  const stats = [
    {
      icon: Leaf,
      label: 'Eco Score',
      value: userData.ecoScore,
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: MessageSquare,
      label: 'Reviews Posted',
      value: userData.reviewCount,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Award,
      label: 'Eco Level',
      value: ecoLevel,
      color: 'bg-yellow-100 text-yellow-600'
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {userData.displayName}! 🌱
              </h1>
              <p className="text-green-100">
                Keep up the great work on your sustainable journey
              </p>
            </div>
            <div className="hidden md:block">
              <Leaf className="w-24 h-24 opacity-20" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
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

        {/* Eco Score Progress */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Eco Journey</h2>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Current: {ecoLevel}</span>
              <span>Next Level: {userData.ecoScore}/1000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all"
                style={{ width: `${Math.min((userData.ecoScore / 1000) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Earn more eco points by reviewing products and engaging with the community!
          </p>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Your Recent Reviews</h2>
            <Link to="/products" className="text-green-600 hover:text-green-700 text-sm font-semibold">
              Write a Review
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : recentReviews.length > 0 ? (
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <Link 
                      to={`/products/${review.productId}`}
                      className="font-semibold text-gray-800 hover:text-green-600"
                    >
                      {review.productName}
                    </Link>
                    <LeafRating rating={review.rating} size="sm" />
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">You haven't written any reviews yet</p>
              <Link
                to="/products"
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
              >
                Explore Products
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
