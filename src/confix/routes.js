import AboutPage from "../pages/About";
import ArticleDetail from "../pages/ArticleDetail";
import ArticlesPage from "../pages/Articles";
import ContactPage from "../pages/Contact";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";

import ProductDetail from "../pages/ProductDetail";
import ProductsPage from "../pages/Products";


import ProfilePage from "../pages/Profile";
import ProfileEdit from "../components/FormEditProfile";
import FormArticle from "../components/FormArticle";
import FormEditArticle from "../components/FormEditArticle";
import AdminDashboard from "../pages/AdminDashboard";


const components = {
    home: { path: "/", component: HomePage, },
    products: { path: "/products", component: ProductsPage, },
    articles: { path: "/articles", component: ArticlesPage, },
    about: { path: "/about", component: AboutPage, },
    contact: { path: "/contact", component: ContactPage, },
    login: { path: "/login", component: LoginPage, },
    signup: { path: "/signup", component: SignupPage, },

    productDetail: { path: "/productDetail/:id", component: ProductDetail },
    articleDetail: { path: "/articleDetail/:id", component: ArticleDetail },

    profile: { path: "/profile", component: ProfilePage },
    profileEdit: { path: "/profiledit", component: ProfileEdit },

    formArticle: { path: "/formArticle", component: FormArticle },
    articleEdit: { path: "/article/edit/:id", component: FormEditArticle },

    adminDashboard: { path: "/admin/dashboard", component: AdminDashboard }
};

export default {
    guest: {
        allowedRoutes: [
            components.home,
            components.products,
            components.articles,
            components.about,
            components.contact,
            components.login,
            components.signup,

            components.productDetail,
            components.articleDetail,
        ],
        redirectRoute: "/login",
    },
    user: {
        allowedRoutes: [
            components.home,
            components.products,
            components.articles,
            components.about,
            components.contact,

            components.productDetail,
            components.articleDetail,

            components.profile,
            components.profileEdit,

            components.formArticle,
            components.articleEdit,

        ],
        redirectRoute: "/",
    },
    admin: {
        allowedRoutes: [
            components.home,
            components.products,
            components.articles,
            components.about,
            components.contact,

            components.productDetail,
            components.articleDetail,

            components.profile,
            components.profileEdit,

            components.formArticle,
            components.articleEdit,

            components.adminDashboard,
        ],
        redirectRoute: "/",
    },
};
