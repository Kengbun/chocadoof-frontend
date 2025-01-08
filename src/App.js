import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail'
import Testpo from './pages/Testpo';
import Testpocopy from './pages/Testpo copy';
import ArticleForm from './pages/ArticleForm ';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import FormArticle from "./components/FormArticle";
import FormEditArticle from "./components/FormEditArticle";
import ManageArticles from "./components/ManageArticles";
import FormEditProfile from "./components/FormEditProfile";
import FormProduct from "./components/FormProduct";
import ManageProducts from "./components/ManageProducts";
import FormEditProduct from "./components/FormEditProduct";
import FormReview from "./components/FormReview";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formproduct" element={<FormProduct />} />
        <Route path="/formeditproduct/:id" element={<FormEditProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/formreview/:id" element={<FormReview />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articledetail/:id" element={<ArticleDetail />} />
        <Route path="/articleform" element={<ArticleForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tt" element={<Testpo />} />
        <Route path="/ttc" element={<Testpocopy />} />
        <Route path="/formarticle" element={<FormArticle />} />
        <Route path="/managearticles" element={<ManageArticles />} />
        <Route path="/manageproducts" element={<ManageProducts />} />
        <Route path="/edit/:id" element={<FormEditArticle />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<FormEditProfile />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
