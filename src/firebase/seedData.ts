// This file contains seed data for the Firebase database
// You can run this once to populate your database with initial data

import { collection, addDoc } from 'firebase/firestore';
import { db } from './config';

export const sampleProducts = [
  {
    name: 'Bamboo Toothbrush Set',
    brand: 'EcoSmile',
    category: 'Personal Care',
    price: 12.99,
    description: 'Set of 4 biodegradable bamboo toothbrushes with charcoal-infused bristles. Perfect for the eco-conscious family.',
    image: 'https://images.unsplash.com/photo-1605615016732-03add3ee505d?w=400',
    ecoScore: 95,
    features: ['100% Biodegradable', 'Plastic-free', 'Vegan', 'Recyclable Packaging'],
    rating: 4.8,
    reviewCount: 234,
    createdAt: new Date().toISOString(),
  },
  {
    name: 'Stainless Steel Water Bottle',
    brand: 'HydroGreen',
    category: 'Home & Living',
    price: 24.99,
    description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof.',
    image: 'https://images.unsplash.com/photo-1611190346465-12f6b1ad0c06?w=400',
    ecoScore: 92,
    features: ['Reusable', 'Insulated', 'BPA-free', 'Lifetime Warranty'],
    rating: 4.9,
    reviewCount: 567,
    createdAt: new Date().toISOString(),
  },
  {
    name: 'Organic Cotton Tote Bag',
    brand: 'GreenCarry',
    category: 'Fashion',
    price: 15.99,
    description: 'Durable organic cotton tote bag perfect for shopping, beach trips, or daily use. Machine washable and stylish.',
    image: 'https://images.unsplash.com/photo-1684771323506-db8bf5a0dd4a?w=400',
    ecoScore: 88,
    features: ['Organic Cotton', 'Fair Trade', 'Washable', 'Multi-purpose'],
    rating: 4.7,
    reviewCount: 189,
    createdAt: new Date().toISOString(),
  },
  {
    name: 'Solar Power Bank',
    brand: 'SunCharge',
    category: 'Electronics',
    price: 39.99,
    description: 'Portable solar-powered charger with 20000mAh capacity. Charges phones, tablets, and other USB devices using renewable energy.',
    image: 'https://images.unsplash.com/photo-1759731576986-45f78c05806a?w=400',
    ecoScore: 85,
    features: ['Solar Powered', 'High Capacity', 'Waterproof', 'LED Flashlight'],
    rating: 4.6,
    reviewCount: 342,
    createdAt: new Date().toISOString(),
  },
  {
    name: 'Natural Face Serum Set',
    brand: 'PureGlow',
    category: 'Personal Care',
    price: 34.99,
    description: 'Set of 3 organic face serums made with natural ingredients. Cruelty-free, vegan, and packaged in recyclable glass bottles.',
    image: 'https://images.unsplash.com/photo-1651740896477-467ea46b4fe5?w=400',
    ecoScore: 90,
    features: ['Organic', 'Cruelty-free', 'Vegan', 'Glass Packaging'],
    rating: 4.8,
    reviewCount: 423,
    createdAt: new Date().toISOString(),
  },
  {
    name: 'Recycled Material Backpack',
    brand: 'EcoTravel',
    category: 'Outdoor',
    price: 59.99,
    description: 'Stylish backpack made from 100% recycled plastic bottles. Water-resistant with laptop compartment and multiple pockets.',
    image: 'https://images.unsplash.com/photo-1540394285875-f7b4538c4874?w=400',
    ecoScore: 87,
    features: ['Recycled Materials', 'Water-resistant', 'Laptop Sleeve', 'Ergonomic Design'],
    rating: 4.7,
    reviewCount: 298,
    createdAt: new Date().toISOString(),
  },
];

export const sampleBlogPosts = [
  {
    title: '10 Easy Ways to Reduce Plastic Waste at Home',
    slug: '10-easy-ways-reduce-plastic-waste',
    excerpt: 'Simple, practical tips to minimize plastic consumption in your daily life and make a real environmental impact.',
    content: 'Full blog content would go here...',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
    author: 'Sarah Green',
    category: 'Lifestyle',
    publishedAt: new Date('2026-02-15').toISOString(),
    readTime: 5,
  },
  {
    title: 'The Ultimate Guide to Sustainable Fashion',
    slug: 'ultimate-guide-sustainable-fashion',
    excerpt: 'Everything you need to know about building an eco-friendly wardrobe without sacrificing style.',
    content: 'Full blog content would go here...',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800',
    author: 'Emma Thompson',
    category: 'Fashion',
    publishedAt: new Date('2026-02-10').toISOString(),
    readTime: 8,
  },
  {
    title: 'Zero Waste Kitchen: Essential Products and Tips',
    slug: 'zero-waste-kitchen-essentials',
    excerpt: 'Transform your kitchen into a sustainable space with these eco-friendly products and practices.',
    content: 'Full blog content would go here...',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
    author: 'Michael Chen',
    category: 'Home & Living',
    publishedAt: new Date('2026-02-05').toISOString(),
    readTime: 6,
  },
];

// Function to seed the database
export async function seedDatabase() {
  try {
    console.log('Seeding products...');
    for (const product of sampleProducts) {
      await addDoc(collection(db, 'products'), product);
    }
    
    console.log('Seeding blog posts...');
    for (const post of sampleBlogPosts) {
      await addDoc(collection(db, 'blog'), post);
    }
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
