# ECO REVIEWER - Express Server Setup Guide

This guide will help you set up an Express.js backend for your ECO REVIEWER application using the EJS templates provided.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. **Initialize your Node.js project:**
```bash
npm init -y
```

2. **Install required dependencies:**
```bash
npm install express ejs express-session body-parser multer bcryptjs dotenv
npm install --save-dev nodemon
```

## Project Structure

```
eco-reviewer/
├── server.js                 # Main Express server file
├── routes/
│   ├── index.js             # Home routes
│   ├── auth.js              # Login/Signup routes
│   ├── products.js          # Product routes
│   ├── reviews.js           # Review routes
  │   ├── blog.js              # Blog routes
│   └── user.js              # User dashboard routes
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Review.js
├── middleware/
│   └── auth.js              # Authentication middleware
├── public/
│   ├── styles/
│   │   └── globals.css      # Copy from React app
│   ├── js/
│   │   └── main.js
│   └── uploads/             # For user uploads
├── views/
│   ├── layouts/
│   │   └── main.ejs
│   ├── partials/
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   └── pages/
│       ├── home.ejs
│       ├── login.ejs
│       ├── signup.ejs
│       ├── products.ejs
│       ├── product-detail.ejs
│       ├── dashboard.ejs
│       ├── blog.ejs
│       ├── add-review.ejs
│       ├── about.ejs
│       └── contact.ejs
└── .env                     # Environment variables
```

## Basic Server Setup (server.js)

```javascript
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-here',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Make user available to all views
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.user ? true : false;
  res.locals.user = req.session.user || null;
  res.locals.currentPage = req.path.split('/')[1] || 'home';
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/products'));
app.use('/reviews', require('./routes/reviews'));
app.use('/blog', require('./routes/blog'));
app.use('/dashboard', require('./routes/user'));

// Error handling
app.use((req, res) => {
  res.status(404).render('pages/404', {
    title: 'Page Not Found',
    showNavbar: true,
    showFooter: true
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## Example Routes

### routes/index.js (Home Route)
```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const featuredProducts = [
    // Your mock data here
  ];

  res.render('pages/home', {
    title: 'ECO REVIEWER - Review Green, Inspire Clean',
    featuredProducts,
    body: '' // For layout
  });
});

module.exports = router;
```

### routes/auth.js (Login/Signup Routes)
```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('pages/login', {
    title: 'Login - ECO REVIEWER',
    showNavbar: false,
    showFooter: false,
    error: null
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Add your authentication logic here
  // For now, simple mock authentication
  if (email && password) {
    req.session.user = {
      id: 1,
      email: email,
      name: 'User Name'
    };
    res.redirect('/dashboard');
  } else {
    res.render('pages/login', {
      title: 'Login - ECO REVIEWER',
      showNavbar: false,
      showFooter: false,
      error: 'Invalid credentials'
    });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/signup', (req, res) => {
  res.render('pages/signup', {
    title: 'Sign Up - ECO REVIEWER',
    showNavbar: false,
    showFooter: false,
    error: null
  });
});

router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  
  if (password !== confirmPassword) {
    return res.render('pages/signup', {
      title: 'Sign Up - ECO REVIEWER',
      showNavbar: false,
      showFooter: false,
      error: 'Passwords do not match'
    });
  }

  // Add user creation logic here
  req.session.user = { id: 1, email, name };
  res.redirect('/dashboard');
});

module.exports = router;
```

### routes/products.js (Product Routes)
```javascript
const express = require('express');
const router = express.Router();

// Mock product data
const allProducts = [
  // Your product data here
];

router.get('/', (req, res) => {
  const { search, category, rating, certifications } = req.query;
  
  let filteredProducts = allProducts;
  
  // Apply filters
  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  if (rating) {
    filteredProducts = filteredProducts.filter(p => p.rating >= parseInt(rating));
  }

  res.render('pages/products', {
    title: 'Eco Products - ECO REVIEWER',
    products: filteredProducts,
    query: req.query,
    categories: [...new Set(allProducts.map(p => p.category))],
    certifications: [...new Set(allProducts.flatMap(p => p.certifications))],
    showFilters: false
  });
});

router.get('/:id', (req, res) => {
  const product = allProducts.find(p => p.id == req.params.id);
  
  if (!product) {
    return res.redirect('/products');
  }

  res.render('pages/product-detail', {
    title: `${product.name} - ECO REVIEWER`,
    product: {
      ...product,
      description: 'This is a sustainable eco-friendly product...',
      sustainabilityScore: 85,
      userReviews: []
    }
  });
});

module.exports = router;
```

### middleware/auth.js (Authentication Middleware)
```javascript
module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.session.user) {
      return next();
    }
    res.redirect('/auth/login');
  },
  
  isGuest: (req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    res.redirect('/dashboard');
  }
};
```

## Environment Variables (.env)

```env
PORT=3000
SESSION_SECRET=your-super-secret-session-key
DATABASE_URL=your-database-connection-string
```

## Package.json Scripts

Add these scripts to your package.json:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## Running the Application

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## Database Integration

To add a database (recommended: PostgreSQL or MongoDB):

### PostgreSQL with Sequelize:
```bash
npm install pg pg-hstore sequelize
```

### MongoDB with Mongoose:
```bash
npm install mongoose
```

## File Upload Configuration (for reviews with photos)

```javascript
// In routes/reviews.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: Images only!');
  }
});
```

## Next Steps

1. Set up your database schema
2. Implement proper authentication with password hashing
3. Add data validation
4. Implement CSRF protection
5. Add rate limiting
6. Set up email notifications
7. Deploy to a hosting service (Heroku, DigitalOcean, AWS, etc.)

## Notes

- The EJS templates use Tailwind CSS via CDN for simplicity. For production, consider setting up a build process.
- Add proper error handling and validation
- Implement database models for users, products, and reviews
- Consider adding API endpoints for AJAX requests
- Add unit and integration tests
- Set up logging (winston, morgan)
- Implement proper security measures (helmet.js, CORS, etc.)
