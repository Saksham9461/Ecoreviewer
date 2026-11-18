import { Link, useNavigate } from 'react-router-dom';
import { Leaf, User, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';

export function Navbar() {
  const { currentUser, userData, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-green-600 p-2 rounded-full">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-green-800">ECO REVIEWER</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-green-600 transition">
              Products
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-green-600 transition">
              Blog
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 transition">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 transition">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span className="hidden sm:inline">Admin</span>
                  </Link>
                )}
                <Link
                  to="/settings"
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{userData?.displayName}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
