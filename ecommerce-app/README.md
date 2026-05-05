# 🌾 AgroMarket – Smart Farming E-commerce Platform

AgroMarket is a modern e-commerce web application designed to connect farmers and buyers across Nigeria. It enables users to browse, search, and purchase agricultural products such as crops, livestock, and farming equipment with ease.

---

## 🚀 Features

* 🛍️ **Product Marketplace**

  * Browse a wide range of farm products
  * View detailed product information
  * Responsive 4-column product grid layout

* 🔍 **Advanced Filtering**

  * Search by product name
  * Filter by category, price range, tags, and location

* ❤️ **Wishlist System**

  * Add/remove products from wishlist
  * Persistent state using Redux

* 🛒 **Shopping Cart**

  * Add, remove, and update product quantity
  * Real-time price calculation
  * Coupon system (e.g. `MANO10`, `WELCOME5`)

* 📦 **Orders Management**

  * Checkout functionality
  * Order history tracking

* 🔐 **Authentication (LocalStorage-based)**

  * Login / Register flow
  * Protected routes

* 🔔 **Toast Notifications**

  * Real-time feedback for user actions

* 🎨 **Modern UI/UX**

  * Clean card-based layout
  * Blurry glassmorphism effects
  * Beautiful background wallpapers

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **State Management:** Redux Toolkit
* **Routing:** React Router DOM
* **Styling:** Inline CSS (custom styles)
* **Utilities:** Lodash (debounce)

---

## 📁 Project Structure

```
src/
│
├── components/        # Reusable UI components
├── pages/             # App pages (Home, Cart, Wishlist, Orders)
├── features/          # Redux slices (cart, wishlist, auth)
├── data/              # Static product data
├── hooks/             # Custom hooks (e.g. useToast)
├── layouts/           # Layout wrappers
└── App.jsx            # Main app entry
```

---

## ⚙️ Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/agromarket.git
cd agromarket
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open in browser:

```
http://localhost:5173
```

---

## 🌍 Deployment

### 🔹 Deploy to GitHub

```bash
git init
git add .
git commit -m "feat: complete AgroMarket e-commerce app with UI improvements"
git branch -M main
git remote add origin https://github.com/your-username/agromarket.git
git push -u origin main
```

---

### 🔹 Deploy to Vercel

1. Go to https://vercel.com
2. Import your GitHub repository
3. Select framework: **Vite**
4. Click **Deploy**

---

## 🎯 Future Improvements

* Payment integration (Paystack / Flutterwave)
* Backend (Node.js + MongoDB)
* User profiles & order tracking
* Admin dashboard
* Product reviews with backend persistence

---

## 👨‍💻 Author

Built with dedication for smart farming and digital agriculture.

---

## 📄 License

This project is open-source and available under the MIT License.
