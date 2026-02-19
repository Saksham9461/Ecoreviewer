import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AddProductModal } from '../components/AddProductModal';
import { LeafRating } from '../components/LeafRating';
import { Search, Filter, Plus, X } from 'lucide-react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { seedDatabase } from "../firebase/seedData";
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

export function Products() {
  const { currentUser, isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSeed = async () => {
    await seedDatabase();
    alert("Database Seeded ✅");
  };

  const categories = [
    'All',
    'Home & Living',
    'Personal Care',
    'Fashion',
    'Food & Beverage',
    'Electronics',
    'Outdoor',
    'Office Supplies',
    'Baby & Kids',
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'ecoScore':
          return b.ecoScore - a.ecoScore;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  const handleProductAdded = () => {
    fetchProducts();
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-green-800 mb-2">
                Eco Products
              </h1>
              <p className="text-gray-600">
                Discover sustainable products for a greener lifestyle
              </p>
            </div>
            {/* {currentUser && isAdmin && ( */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition flex items-center gap-2 justify-center"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            {/* )} */}
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products or brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            >
              <option value="rating">Highest Rated</option>
              <option value="ecoScore">Eco Score</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div
            className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 flex-shrink-0`}
          >
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Categories</h3>
                {showFilters && (
                  <button
                    onClick={() => setShowFilters(false)}
                    className="md:hidden"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      selectedCategory === category
                        ? "bg-green-600 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-md p-6 animate-pulse"
                  >
                    <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <p className="text-gray-600 mb-6">
                  Showing {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "product" : "products"}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
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
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {product.brand}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <LeafRating rating={product.rating} />
                          <span className="text-sm text-gray-500">
                            ({product.reviewCount})
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          ${product.price.toFixed(2)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No products found</p>
                <p className="text-gray-400">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
}
