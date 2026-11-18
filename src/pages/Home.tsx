import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LeafRating } from '../components/LeafRating';
import { Leaf, TrendingUp, Users, Award, ArrowRight } from 'lucide-react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  ecoScore: number;
  image: string;
  price: number;
}

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const q = query(
        collection(db, 'products'),
        orderBy('rating', 'desc'),
        limit(6)
      );
      const snapshot = await getDocs(q);
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setFeaturedProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Users, label: 'Active Users', value: '50K+' },
    { icon: Leaf, label: 'Eco Products', value: '10K+' },
    { icon: TrendingUp, label: 'Reviews Posted', value: '100K+' },
    { icon: Award, label: 'Verified Brands', value: '500+' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 to-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10">
            <Leaf className="w-32 h-32" />
          </div>
          <div className="absolute bottom-10 right-10">
            <Leaf className="w-40 h-40" />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Sustainable Products
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Join our community of eco-conscious consumers. Review, rate, and find the best sustainable products for a greener future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition inline-flex items-center justify-center gap-2"
              >
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/signup"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-800 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-800 mb-4">Featured Eco Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Top-rated sustainable products loved by our community
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.ecoScore}% Eco
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-green-600 font-semibold mb-1">
                      {product.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.brand}</p>
                    <div className="flex items-center justify-between mb-3">
                      <LeafRating rating={product.rating} showNumber />
                      <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition inline-flex items-center gap-2"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-800 mb-4">Why ECO REVIEWER?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your trusted partner in sustainable living
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Verified Eco Products</h3>
              <p className="text-gray-600">
                Every product is verified for sustainability and environmental impact
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Community Driven</h3>
              <p className="text-gray-600">
                Real reviews from real people who care about the planet
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Earn Eco Points</h3>
              <p className="text-gray-600">
                Build your eco score by reviewing and supporting sustainable brands
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
