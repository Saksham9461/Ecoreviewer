# ECO REVIEWER - EJS Templates

This folder contains the EJS templates converted from your React application. These templates are ready to be integrated with an Express.js backend.

## 📁 Folder Structure

```
ejs-templates/
├── views/
│   ├── layouts/
│   │   └── main.ejs                 # Main layout template
│   ├── partials/
│   │   ├── navbar.ejs               # Navigation bar component
│   │   └── footer.ejs               # Footer component
│   └── pages/
│       ├── home.ejs                 # Home page
│       ├── login.ejs                # Login page
│       ├── signup.ejs               # Signup page
│       ├── products.ejs             # Product listing page
│       ├── product-detail.ejs       # Single product detail page
│       ├── dashboard.ejs            # User dashboard
│       ├── blog.ejs                 # Blog listing page
│       ├── add-review.ejs           # Add review form
│       ├── about.ejs                # About us page
│       ├── contact.ejs              # Contact page
│       ├── settings.ejs             # User settings
│       └── admin-dashboard.ejs      # Admin dashboard
├── server-guide.md                  # Detailed Express.js setup guide
└── README.md                        # This file
```

## 🚀 Quick Start

1. **Copy the templates** to your Express project:
   ```bash
   cp -r ejs-templates/views /path/to/your/express-project/
   ```

2. **Copy your global CSS**:
   ```bash
   cp styles/globals.css /path/to/your/express-project/public/styles/
   ```

3. **Follow the server-guide.md** for detailed Express.js setup instructions

## 📝 Template Features

### Layout System
- **main.ejs**: Master layout with conditional navbar/footer rendering
- All pages extend this layout for consistency

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Uses Tailwind CDN (consider build process for production)

### Icons
- SVG icons inline (replacing React lucide-react)
- Eco-themed leaf icons for ratings
- Social media icons included

### Forms
- Server-side form handling with POST methods
- Proper form validation attributes
- Error/success message displays

### Navigation
- Server-side routing (no React Router)
- Active page highlighting
- Conditional login/logout states

## 🔧 Key Differences from React Version

1. **State Management**: Server-side data passing instead of React state
2. **Routing**: Express routes instead of client-side routing
3. **Events**: Form submissions instead of React event handlers
4. **Icons**: Inline SVG instead of lucide-react components
5. **Images**: Standard `<img>` tags instead of ImageWithFallback component

## 📊 Data Structure Examples

### User Object
```javascript
{
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'Eco enthusiast...',
  ecoScore: 78,
  reviewCount: 42,
  storyCount: 12,
  followerCount: 256
}
```

### Product Object
```javascript
{
  id: 1,
  name: 'Eco Bamboo Toothbrush',
  image: 'url-to-image',
  category: 'Personal Care',
  price: 8.99,
  rating: 5,
  reviews: 124,
  certifications: ['Organic', 'Vegan'],
  description: 'Product description...',
  sustainabilityScore: 85
}
```

### Review Object
```javascript
{
  id: 1,
  productId: 1,
  productName: 'Eco Bamboo Toothbrush',
  userId: 1,
  userName: 'John Doe',
  rating: 5,
  title: 'Amazing product!',
  comment: 'This toothbrush is...',
  date: '2025-11-01',
  pros: 'Durable, eco-friendly',
  cons: 'Slightly expensive'
}
```

## 🎨 Styling

The templates use Tailwind CSS classes throughout. Key color classes:

- **Primary (Green)**: `bg-green-600`, `text-green-600`, etc.
- **Secondary**: `bg-yellow-500`
- **Accent**: `bg-green-50`, `bg-green-100`
- **Text**: `text-gray-600`, `text-gray-900`

### CSS Variables (in main layout)
```css
--color-primary: hsl(142 76% 36%);
--color-accent: hsl(142 33% 96%);
--color-background: hsl(0 0% 100%);
```

## 🔐 Authentication Flow

1. User visits `/login` or `/signup`
2. Form submission to `/auth/login` or `/auth/signup`
3. Server validates and creates session
4. Redirect to `/dashboard` or `/`
5. Logout via POST to `/auth/logout`

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Grid classes used:
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- `md:flex-row` for layout changes
- `hidden md:flex` for conditional visibility

## 🛠️ Required Express Middleware

```javascript
- express.static()      // For CSS, JS, images
- body-parser           // For form data
- express-session       // For user sessions
- multer               // For file uploads (reviews, profile pics)
```

## 📦 Next Steps

1. ✅ Set up Express server (see server-guide.md)
2. ✅ Configure database (PostgreSQL/MongoDB recommended)
3. ✅ Implement authentication (bcrypt for passwords)
4. ✅ Create API routes for CRUD operations
5. ✅ Add form validation (express-validator)
6. ✅ Set up file upload handling (multer)
7. ✅ Deploy to production

## 🐛 Common Issues & Solutions

### Issue: Styles not loading
**Solution**: Ensure `app.use(express.static('public'))` is configured and CSS is in `public/styles/`

### Issue: 404 on form submission
**Solution**: Check route paths match form action attributes

### Issue: User session not persisting
**Solution**: Verify express-session configuration and secret key

### Issue: Images not displaying
**Solution**: Check image paths and ensure they're accessible from public folder

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [EJS Documentation](https://ejs.co/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express Session Guide](https://github.com/expressjs/session)

## 💡 Tips

1. **Development**: Use `nodemon` for auto-restart during development
2. **Production**: Set `NODE_ENV=production` and use proper session secrets
3. **Security**: Implement CSRF protection, rate limiting, and input validation
4. **Performance**: Consider caching strategies for product listings
5. **SEO**: Add meta tags and Open Graph tags to layout

## 🤝 Contributing

When adding new pages:
1. Create EJS file in `views/pages/`
2. Use consistent data structure
3. Follow existing layout patterns
4. Add corresponding Express route
5. Test responsive design

## 📄 License

Same as main ECO REVIEWER project

---

For detailed Express.js server setup, see **server-guide.md**
