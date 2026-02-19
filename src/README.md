# ECO REVIEWER 🌱

A modern, full-stack web application for reviewing and discovering sustainable eco-products. Built with React, Firebase, and Tailwind CSS.

## Features ✨

### User Features
- 🔐 **Authentication** - Secure signup/login with Firebase Auth
- 🏠 **Home Page** - Hero banner with featured eco-products
- 📦 **Product Listing** - Browse products with filters and search
- 📝 **Product Reviews** - Rate products with leaf-based ratings and write detailed reviews
- 👤 **User Dashboard** - Track eco score, review count, and personal stats
- 🌿 **Eco Score System** - Earn points for reviewing products and engaging with the community
- 📰 **Blog Section** - Read articles about sustainable living
- ⚙️ **Settings** - Manage profile and account preferences
- 📧 **Contact** - Get in touch with the team

### Admin Features
- 🛠️ **Admin Dashboard** - Manage products and reviews
- ➕ **Add Products** - Modal interface to add new eco-products
- 🗑️ **Delete Content** - Remove products and reviews

### Design Features
- 🎨 Clean, nature-inspired interface with green, beige, and white tones
- 🍃 Unique leaf-based rating system
- 📱 Fully responsive design
- 🔄 Real-time data updates with Firestore
- ✨ Smooth animations and transitions

## Tech Stack 🛠️

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router v7
- **Backend**: Firebase (Authentication, Firestore Database, Storage)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Notifications**: Sonner

## Firebase Setup 🔥

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Once created, click on "Web" (</>) to add a web app
4. Register your app with a nickname (e.g., "ECO REVIEWER")
5. Copy the Firebase configuration object

### 2. Configure Firebase in the App

Open `/firebase/config.ts` and replace the placeholder values with your Firebase config:

\`\`\`typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_AUTH_DOMAIN_HERE",
  projectId: "YOUR_PROJECT_ID_HERE",
  storageBucket: "YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "YOUR_APP_ID_HERE"
};
\`\`\`

### 3. Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** authentication
3. Save changes

### 4. Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Start in **Production mode** (you'll set up rules next)
4. Choose a location closest to your users
5. Click **Enable**

### 5. Set Up Firestore Security Rules

Go to **Firestore Database** → **Rules** and paste these rules:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products collection
    match /products/{productId} {
      allow read: if true;
      allow create: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow update, delete: if request.auth != null && 
                              get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Reviews collection
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
                              (resource.data.userId == request.auth.uid || 
                               get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    } 
    
    // Blog collection
    match /blog/{postId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
\`\`\`

### 6. Enable Storage (Optional)

1. Go to **Storage** in Firebase Console
2. Click **Get started**
3. Use the default security rules for now
4. Click **Done**

### 7. Seed Initial Data

You can manually add sample data or use the Firebase Console:

#### Option A: Use Firebase Console
1. Go to Firestore Database
2. Click "Start collection"
3. Collection ID: `products`
4. Add documents with fields matching the structure in `/firebase/seedData.ts`

#### Option B: Create an Admin User First
1. Sign up for an account in your app
2. Go to Firestore Database → users collection
3. Find your user document and change the `role` field from `'user'` to `'admin'`
4. Now you can use the "Add Product" button in the app to add products

## Installation & Running 📦

### Prerequisites
- Node.js 16+ installed
- A Firebase project set up (see above)

### Steps

1. **Clone or access the project** (already done in Figma Make)

2. **Configure Firebase** following the setup steps above

3. **The app is ready!** Figma Make handles all dependencies automatically

4. **Create your first admin user:**
   - Sign up for an account through the app
   - Go to Firebase Console → Firestore Database → users
   - Find your user document and change `role: "user"` to `role: "admin"`
   - Refresh the app to see admin features

## Collections Structure 📊

### users
\`\`\`javascript
{
  uid: string,
  email: string,
  displayName: string,
  role: 'user' | 'admin',
  ecoScore: number,
  reviewCount: number,
  joinedDate: string (ISO)
}
\`\`\`

### products
\`\`\`javascript
{
  name: string,
  brand: string,
  category: string,
  price: number,
  description: string,
  image: string (URL),
  ecoScore: number (0-100),
  features: string[],
  rating: number,
  reviewCount: number,
  createdAt: string (ISO),
  createdBy: string (userId)
}
\`\`\`

### reviews
\`\`\`javascript
{
  productId: string,
  productName: string,
  userId: string,
  userName: string,
  rating: number (1-5),
  comment: string,
  createdAt: string (ISO)
}
\`\`\`

### blog
\`\`\`javascript
{
  title: string,
  slug: string,
  excerpt: string,
  content: string,
  image: string (URL),
  author: string,
  category: string,
  publishedAt: string (ISO),
  readTime: number (minutes)
}
\`\`\`

## Key Features Explained 🔍

### Eco Score System
- Users earn 10 eco points for each review submitted
- Eco levels: Eco Beginner (0-199), Eco Enthusiast (200-499), Eco Warrior (500-999), Eco Champion (1000+)

### Leaf Rating
- Custom rating system using leaf icons instead of stars
- Products and reviews are rated from 1-5 leaves
- Interactive rating component for submitting reviews

### Admin Features
- Only users with `role: 'admin'` can:
  - Add new products via modal
  - Delete products
  - Delete any review
  - Access the Admin Dashboard

### Firebase Integration
- **Authentication**: Email/password with session persistence
- **Firestore**: Real-time database for all content
- **Security**: Row-level security with Firestore rules

## Pages 📄

1. **/** - Home page with hero and featured products
2. **/login** - User login
3. **/signup** - New user registration
4. **/dashboard** - User dashboard with stats and recent reviews
5. **/products** - Product listing with filters and search
6. **/products/:id** - Product detail page with reviews
7. **/blog** - Blog post listing
8. **/blog/:id** - Individual blog post
9. **/admin** - Admin dashboard (admin only)
10. **/about** - About ECO REVIEWER
11. **/contact** - Contact form
12. **/settings** - User settings and preferences

## Tips for Getting Started 💡

1. **Create an admin account first** to add products
2. **Add some sample products** using the admin modal
3. **Write reviews** to test the eco score system
4. **Customize** the color scheme in `/styles/globals.css` if needed
5. **Add blog posts** through Firebase Console or create an admin interface

## Support 🆘

For issues or questions:
- Check Firebase Console for error logs
- Verify Firestore rules are correctly set
- Ensure Firebase config is properly configured
- Check browser console for error messages

## Future Enhancements 🚀

- Image upload for products (using Firebase Storage)
- User profile pictures
- Product categories with icons
- Advanced search and filtering
- Social sharing features
- Email notifications
- Product comparison tool
- Favorite/bookmark products
- User badges and achievements

---

Built with 💚 for a sustainable future
