// This file contains seed data for the Firebase database
// You can run this once to populate your database with initial data

import { collection, addDoc } from "firebase/firestore";
import { db } from "./config";

export const sampleProducts = [
  {
    name: "Bamboo Toothbrush Set",
    brand: "EcoSmile",
    category: "Personal Care",
    price: 12.99,
    description:
      "Set of 4 biodegradable bamboo toothbrushes with charcoal-infused bristles. Perfect for the eco-conscious family.",
    image: "https://images.unsplash.com/photo-1605615016732-03add3ee505d?w=400",
    ecoScore: 95,
    features: [
      "100% Biodegradable",
      "Plastic-free",
      "Vegan",
      "Recyclable Packaging",
    ],
    rating: 4.8,
    reviewCount: 234,
    createdAt: new Date().toISOString(),
  },
  {
    name: "Stainless Steel Water Bottle",
    brand: "HydroGreen",
    category: "Home & Living",
    price: 24.99,
    description:
      "Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof.",
    image: "https://images.unsplash.com/photo-1611190346465-12f6b1ad0c06?w=400",
    ecoScore: 92,
    features: ["Reusable", "Insulated", "BPA-free", "Lifetime Warranty"],
    rating: 4.9,
    reviewCount: 567,
    createdAt: new Date().toISOString(),
  },
  {
    name: "Organic Cotton Tote Bag",
    brand: "GreenCarry",
    category: "Fashion",
    price: 15.99,
    description:
      "Durable organic cotton tote bag perfect for shopping, beach trips, or daily use. Machine washable and stylish.",
    image: "https://images.unsplash.com/photo-1684771323506-db8bf5a0dd4a?w=400",
    ecoScore: 88,
    features: ["Organic Cotton", "Fair Trade", "Washable", "Multi-purpose"],
    rating: 4.7,
    reviewCount: 189,
    createdAt: new Date().toISOString(),
  },
  {
    name: "Solar Power Bank",
    brand: "SunCharge",
    category: "Electronics",
    price: 39.99,
    description:
      "Portable solar-powered charger with 20000mAh capacity. Charges phones, tablets, and other USB devices using renewable energy.",
    image: "https://images.unsplash.com/photo-1759731576986-45f78c05806a?w=400",
    ecoScore: 85,
    features: [
      "Solar Powered",
      "High Capacity",
      "Waterproof",
      "LED Flashlight",
    ],
    rating: 4.6,
    reviewCount: 342,
    createdAt: new Date().toISOString(),
  },
  {
    name: "Natural Face Serum Set",
    brand: "PureGlow",
    category: "Personal Care",
    price: 34.99,
    description:
      "Set of 3 organic face serums made with natural ingredients. Cruelty-free, vegan, and packaged in recyclable glass bottles.",
    image: "https://images.unsplash.com/photo-1651740896477-467ea46b4fe5?w=400",
    ecoScore: 90,
    features: ["Organic", "Cruelty-free", "Vegan", "Glass Packaging"],
    rating: 4.8,
    reviewCount: 423,
    createdAt: new Date().toISOString(),
  },
  {
    name: "Recycled Material Backpack",
    brand: "EcoTravel",
    category: "Outdoor",
    price: 59.99,
    description:
      "Stylish backpack made from 100% recycled plastic bottles. Water-resistant with laptop compartment and multiple pockets.",
    image: "https://images.unsplash.com/photo-1540394285875-f7b4538c4874?w=400",
    ecoScore: 87,
    features: [
      "Recycled Materials",
      "Water-resistant",
      "Laptop Sleeve",
      "Ergonomic Design",
    ],
    rating: 4.7,
    reviewCount: 298,
    createdAt: new Date().toISOString(),
  },
];

export const sampleBlogPosts = [
  {
    title: "10 Easy Ways to Reduce Plastic Waste at Home",
    slug: "10-easy-ways-reduce-plastic-waste",
    excerpt:
      "Simple, practical tips to minimize plastic consumption in your daily life and make a real environmental impact.",
    content: "Full blog content would go here...",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800",
    author: "Sarah Green",
    category: "Lifestyle",
    publishedAt: new Date("2026-02-15").toISOString(),
    readTime: 5,
  },
  {
    title: "The Ultimate Guide to Sustainable Fashion",
    slug: "ultimate-guide-sustainable-fashion",
    excerpt:
      "Everything you need to know about building an eco-friendly wardrobe without sacrificing style.",
    content: "Full blog content would go here...",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
    author: "Emma Thompson",
    category: "Fashion",
    publishedAt: new Date("2026-02-10").toISOString(),
    readTime: 8,
  },
  {
    title: "Zero Waste Kitchen: Essential Products and Tips",
    slug: "zero-waste-kitchen-essentials",
    excerpt:
      "Transform your kitchen into a sustainable space with these eco-friendly products and practices.",
    content: "Full blog content would go here...",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
    author: "Michael Chen",
    category: "Home & Living",
    publishedAt: new Date("2026-02-05").toISOString(),
    readTime: 6,
  },
];

export const moreProducts = [
  {
    name: "Compostable Phone Case",
    brand: "EcoGuard",
    category: "Electronics",
    price: 29.99,
    description:
      "100% compostable phone case made from plant-based materials. Durable, stylish, and plastic-free.",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400",
    ecoScore: 91,
    features: ["Compostable", "Plant-based", "Shock Resistant", "Plastic-free"],
    rating: 4.7,
    reviewCount: 178,
    createdAt: new Date().toISOString(),
  },
  {
    name: "Reusable Silicone Food Bags",
    brand: "FreshKeep",
    category: "Home & Living",
    price: 18.99,
    description:
      "Set of 6 reusable silicone food storage bags. Dishwasher safe and perfect alternative to single-use plastic bags.",
    image: "https://images.unsplash.com/photo-1584473457409-ce1f3e3f4a6d?w=400",
    ecoScore: 94,
    features: ["Reusable", "Dishwasher Safe", "BPA-free", "Freezer Safe"],
    rating: 4.8,
    reviewCount: 356,
    createdAt: new Date().toISOString(),
  },
  {
    name: "Eco-Friendly Yoga Mat",
    brand: "ZenEarth",
    category: "Fitness",
    price: 49.99,
    description:
      "Non-slip yoga mat made from natural tree rubber. Free from PVC and harmful chemicals.",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400",
    ecoScore: 89,
    features: ["Natural Rubber", "Non-toxic", "Anti-slip", "Lightweight"],
    rating: 4.6,
    reviewCount: 210,
    createdAt: new Date().toISOString(),
  },
  {
    name: "Biodegradable Laundry Detergent Sheets",
    brand: "CleanEarth",
    category: "Home & Living",
    price: 22.99,
    description:
      "Plastic-free laundry detergent sheets that dissolve completely in water. Powerful cleaning with zero waste.",
    image: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=400",
    ecoScore: 96,
    features: [
      "Plastic-free",
      "Biodegradable",
      "Compact Packaging",
      "Travel Friendly",
    ],
    rating: 4.9,
    reviewCount: 412,
    createdAt: new Date().toISOString(),
  },
  {
    name: "Wooden Cutlery Travel Set",
    brand: "NatureBite",
    category: "Lifestyle",
    price: 14.99,
    description:
      "Portable wooden cutlery set including spoon, fork, knife, and chopsticks. Comes with organic cotton pouch.",
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=400",
    ecoScore: 93,
    features: ["Reusable", "Plastic-free", "Lightweight", "Travel Friendly"],
    rating: 4.7,
    reviewCount: 145,
    createdAt: new Date().toISOString(),
  },
  {
    name: "Solar Outdoor Lantern",
    brand: "BrightEco",
    category: "Outdoor",
    price: 44.99,
    description:
      "Waterproof solar-powered lantern ideal for camping and outdoor use. Long-lasting battery life.",
    image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400",
    ecoScore: 88,
    features: ["Solar Powered", "Waterproof", "Rechargeable", "Durable Build"],
    rating: 4.5,
    reviewCount: 265,
    createdAt: new Date().toISOString(),
  },
];
export const moreBlogPosts = [
  {
    title: "How Solar Energy is Changing Everyday Life",
    slug: "how-solar-energy-changing-everyday-life",
    excerpt:
      "Discover how affordable solar solutions are transforming homes, businesses, and communities around the world.",
    content: `
Solar energy has become one of the most accessible renewable energy sources globally.
From rooftop panels to solar-powered gadgets, clean energy is now part of everyday life.

Benefits include:
- Reduced electricity bills
- Lower carbon footprint
- Government incentives
- Energy independence

Switching to solar is not just an environmental choice — it is an economic one too.
    `,
    image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800",
    author: "Daniel Harper",
    category: "Renewable Energy",
    publishedAt: new Date("2026-01-28").toISOString(),
    readTime: 7,
  },
  {
    title: "Beginner’s Guide to Composting at Home",
    slug: "beginners-guide-composting-home",
    excerpt:
      "Turn kitchen waste into nutrient-rich compost with this simple step-by-step beginner guide.",
    content: `
Composting is one of the easiest ways to reduce household waste.
By composting organic materials like fruit peels and vegetable scraps,
you reduce landfill waste and create nutrient-rich soil.

Steps:
1. Choose a compost bin
2. Add green and brown materials
3. Maintain moisture
4. Turn regularly

Within weeks, you will have natural fertilizer for your garden.
    `,
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800",
    author: "Olivia Brown",
    category: "Sustainability",
    publishedAt: new Date("2026-01-20").toISOString(),
    readTime: 6,
  },
  {
    title: "Why Reusable Products Are the Future",
    slug: "why-reusable-products-are-future",
    excerpt:
      "Single-use plastics are fading away. Here’s why reusable products are becoming the new normal.",
    content: `
Reusable products significantly reduce waste and save money over time.
From water bottles to grocery bags, making the switch is simple.

Advantages:
- Long-term savings
- Reduced pollution
- Lower resource consumption

Small changes in daily habits can create a massive environmental impact.
    `,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800",
    author: "James Wilson",
    category: "Lifestyle",
    publishedAt: new Date("2026-01-12").toISOString(),
    readTime: 5,
  },
  {
    title: "Eco-Friendly Travel: How to Explore Responsibly",
    slug: "eco-friendly-travel-guide",
    excerpt:
      "Travel sustainably with these practical tips for reducing your environmental footprint while exploring the world.",
    content: `
Sustainable travel focuses on minimizing environmental impact.
Choose eco-friendly accommodations, reduce plastic use, and support local communities.

Tips:
- Carry reusable bottles
- Avoid over-tourism spots
- Use public transport
- Respect local culture

Traveling responsibly helps preserve destinations for future generations.
    `,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    author: "Sophia Martinez",
    category: "Travel",
    publishedAt: new Date("2026-01-05").toISOString(),
    readTime: 8,
  },
  {
    title: "Top 5 Sustainable Fashion Brands in 2026",
    slug: "top-sustainable-fashion-brands-2026",
    excerpt:
      "Explore the leading fashion brands that are redefining sustainability in the clothing industry.",
    content: `
Sustainable fashion is gaining momentum worldwide.
Brands are focusing on ethical production, organic fabrics, and fair wages.

Key factors:
- Transparency
- Ethical sourcing
- Recycled materials
- Minimal packaging

Consumers today demand both style and sustainability.
    `,
    image: "https://images.unsplash.com/photo-1520975922324-1d4f4bcb4a4e?w=800",
    author: "Emma Thompson",
    category: "Fashion",
    publishedAt: new Date("2026-01-01").toISOString(),
    readTime: 9,
  },
];

// Function to seed the database
export async function seedDatabase() {
  try {
    console.log("Seeding products...");
    for (const product of sampleProducts) {
      await addDoc(collection(db, "products"), product);
    }

    console.log("Seeding blog posts...");
    for (const post of sampleBlogPosts) {
      await addDoc(collection(db, "blog"), post);
    }
    for (const product of moreProducts) {
      await addDoc(collection(db, "products"), product);
    }
    for (const post of moreBlogPosts) {
      await addDoc(collection(db, "blog"), post);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
