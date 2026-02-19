import { useState } from 'react';
import { X } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

interface AddBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBlogAdded: () => void;
}

export function AddBlogModal({ isOpen, onClose, onBlogAdded }: AddBlogModalProps) {
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    imageUrl: '',
    excerpt: '',
    content: '',
    readTime: '',
    tags: '',
  });

  const [loading, setLoading] = useState(false);

  const categories = [
    'Lifestyle',
    'Sustainability',
    'Fashion',
    'Home & Living',
    'Renewable Energy',
    'Travel',
    'Technology',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error('You must be logged in to add a blog');
      return;
    }

    setLoading(true);

    try {
      const blogData = {
        title: formData.title,
        slug: generateSlug(formData.title),
        category: formData.category,
        excerpt: formData.excerpt,
        content: formData.content,
        image:
          formData.imageUrl ||
          'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800',
        readTime: parseInt(formData.readTime),
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag),
        author: currentUser.email || 'Anonymous',
        createdBy: currentUser.uid,
        views: 0,
        featured: false,
        publishedAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'blog'), blogData);

      toast.success('Blog added successfully!');

      setFormData({
        title: '',
        category: '',
        imageUrl: '',
        excerpt: '',
        content: '',
        readTime: '',
        tags: '',
      });

      onBlogAdded();
      onClose();
    } catch (error) {
      console.error('Error adding blog:', error);
      toast.error('Failed to add blog');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Add New Blog</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blog Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="10 Ways to Live Sustainably"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={2}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Short summary of the blog..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Full blog content..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Read Time (minutes)
            </label>
            <input
              type="number"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="5"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="eco, sustainability, green living"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Blog'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
