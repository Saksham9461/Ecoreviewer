import { Leaf, Facebook, Twitter, Instagram, Mail, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white p-2 rounded-full">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xl font-bold">ECO REVIEWER</span>
            </div>
            <p className="text-green-200 text-sm">
              Your trusted platform for sustainable product reviews and eco-friendly living inspiration.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-green-200 hover:text-white transition text-sm">
                Home
              </Link>
              <Link to="/products" className="block text-green-200 hover:text-white transition text-sm">
                Products
              </Link>
              <Link to="/blog" className="block text-green-200 hover:text-white transition text-sm">
                Blog
              </Link>
              <Link to="/about" className="block text-green-200 hover:text-white transition text-sm">
                About Us
              </Link>
            </div>
          </div>

          {/* <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <Link to="/contact" className="block text-green-200 hover:text-white transition text-sm">
                Contact Us
              </Link>
              <a href="#" className="block text-green-200 hover:text-white transition text-sm">
                Privacy Policy
              </a>
              <a href="#" className="block text-green-200 hover:text-white transition text-sm">
                Terms of Service
              </a>
              <a href="#" className="block text-green-200 hover:text-white transition text-sm">
                FAQ
              </a>
            </div>
          </div> */}

          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-4">
              <a href="https://github.com/Saksham9461" className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://x.com/sakshamojha6030" className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/sakshamojha7/" className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:sakshamojha9461@gmail.com" className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-200 text-sm">
          <p>&copy; 2026 ECO REVIEWER. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
