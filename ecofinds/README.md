# 🌱 EcoFinds - Sustainable Second-Hand Marketplace

EcoFinds is an eco-friendly platform that connects people with sustainable second-hand products, helping to reduce waste and promote conscious consumption. Our mission is to make sustainable shopping accessible, affordable, and trustworthy for everyone.

## 🚀 Features

### For Customers
- 🔍 **Product Discovery**: Browse a curated selection of verified second-hand items
- 🏷️ **Category Filtering**: Filter products by categories (Clothes, Electronics, Furniture, etc.)
- 🔎 **Search Functionality**: Search for specific products by name
- 🛒 **Shopping Cart**: Add items to cart and manage quantities
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- ⭐ **Product Details**: Detailed product descriptions and high-quality images

### For Sellers
- ➕ **List Products**: Add new products with images, descriptions, and pricing
- 📊 **Manage Listings**: View and manage your product listings
- 💰 **Pricing Control**: Set your own prices and track views
- 📈 **Dashboard**: Access to seller statistics and performance metrics

### General Features
- 🔐 **User Authentication**: Secure login system with role-based access
- 🎨 **Modern UI/UX**: Clean, intuitive interface with smooth animations
- 🌍 **Eco-Friendly Focus**: Promoting sustainability through second-hand commerce
- 📱 **Mobile-First Design**: Fully responsive across all devices

## 🔑 Sample Login Credentials

To test the application, you can use the following sample credentials:

### Customer Account
- **Email:** `customer@ecofinds.com`
- **Password:** `customer123`
- **Features:** Browse products, add to cart, view product details

### Seller Account
- **Email:** `seller@ecofinds.com`
- **Password:** `seller123`
- **Features:** Add products, manage listings, view seller dashboard

## 🧪 How to Test the Application

1. **Start the development server** using the instructions below
2. **Navigate to** [http://localhost:3000](http://localhost:3000)
3. **Click "Get Started"** on the home page
4. **Choose your user type** - Customer or Seller
5. **Use the sample credentials** provided above to log in
6. **Explore the platform** based on your selected user type:
   - **As a Customer**: Browse products, use filters, add items to cart
   - **As a Seller**: Add new products, manage your listings

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js) or **yarn** or **pnpm**
- A modern web browser (Chrome, Firefox, Safari, Edge)

## ⚡ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/RuchithaUK/odooXnitte.git
cd odooXnitte/ecofinds
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 4. Open in Browser
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit the files.

## 🛠️ Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm start` - Runs the built app in production mode
- `npm run lint` - Runs ESLint to check for code issues

## 🏗️ Tech Stack

- **Framework:** [Next.js 15.5.2](https://nextjs.org/) - React framework for production
- **Frontend:** [React 19.1.0](https://reactjs.org/) - JavaScript library for building user interfaces
- **Styling:** CSS3 with custom animations and responsive design
- **Linting:** ESLint for code quality
- **Font Optimization:** `next/font` with Geist font family
- **Development:** Hot reloading and fast refresh

## 📁 Project Structure

```
ecofinds/
├── app/
│   ├── about/                 # About page
│   ├── cart/                  # Shopping cart functionality
│   ├── components/            # Reusable components
│   │   ├── Footer.js
│   │   ├── Footer.css
│   │   ├── Navbar.js
│   │   └── Navbar.css
│   ├── contact/               # Contact page
│   ├── login/                 # Login page
│   ├── my-listings/           # Seller dashboard
│   ├── product/
│   │   └── [id]/              # Dynamic product details
│   ├── products/              # Product catalog
│   ├── signup/                # User registration
│   ├── user-profile/          # User profile management
│   ├── user-type/             # User type selection
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout
│   └── page.js                # Homepage
├── public/
│   ├── images/
│   │   └── products/          # Product images
│   └── *.svg                  # Icon files
├── README.md
├── package.json
└── next.config.mjs
```

## 🎨 Key Components

### Pages
- **Home (`/`)** - Landing page with product showcase
- **Products (`/products`)** - Product catalog with filtering
- **Product Details (`/product/[id]`)** - Individual product pages
- **Cart (`/cart`)** - Shopping cart management
- **My Listings (`/my-listings`)** - Seller dashboard
- **User Profile (`/user-profile`)** - Profile management

### Authentication Flow
1. User selects type (Customer/Seller) at `/user-type`
2. Login at `/login` with sample credentials
3. Redirected to appropriate dashboard/homepage

## 🔧 Configuration

### Next.js Configuration
The project uses Next.js 15 with:
- App Router (latest routing system)
- Automatic font optimization
- Built-in CSS support
- Hot reloading for development

### Styling
- Custom CSS with modern features
- Responsive design principles
- Smooth animations and transitions
- Gradient backgrounds and glassmorphism effects

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Usage Examples

### Adding Products (Sellers)
1. Login as a seller
2. Navigate to Products page
3. Fill out the product form
4. Upload product images
5. Submit listing

### Shopping (Customers)
1. Login as a customer
2. Browse products on homepage or products page
3. Use search and filters to find items
4. Click on products to view details
5. Add items to cart
6. Manage cart quantities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Vercel](https://vercel.com/) for hosting and deployment platform
- The open-source community for inspiration and tools

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/RuchithaUK/odooXnitte/issues) section
2. Create a new issue if your problem isn't already reported
3. Include detailed information about your environment and the issue

---

**Made with 💚 for a sustainable future**
