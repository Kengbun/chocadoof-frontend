import AboutPage from "../pages/About";
import ArticleDetail from "../pages/ArticleDetail";
import ArticlesPage from "../pages/Articles";
import ContactPage from "../pages/Contact";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";

import ProductDetail from "../pages/ProductDetail";
import ProductsPage from "../pages/Products";
import FormProduct from "../components/FormProduct";
import FormEditProduct from "../components/FormEditProduct";


import ProfilePage from "../pages/Profile";
import ProfileEdit from "../components/FormEditProfile";
import FormArticle from "../components/FormArticle";
import FormEditArticle from "../components/FormEditArticle";
import AdminDashboard from "../pages/AdminDashboard";

//test
import Loading from "../components/Loading";
// import TT from "../pages/Testpo"
import ResetPassword from "../pages/auth/ResetPassword";


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

    formProduct : { path: "/formProduct", component: FormProduct },
    productEdit : { path: "/product/edit/:id", component: FormEditProduct },

    adminDashboard: { path: "/admin/dashboard", component: AdminDashboard },

    resetpassword: { path: "/reset-password", component: ResetPassword},
    resetPasswordToken: { path: "/reset-password/:token", component: ResetPassword},

    kk: { path: "/kk", component: Loading },
    // TT: { path: "/tt", component: TT}
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

            components.resetpassword,
            components.resetPasswordToken,

            components.kk,
            
            // components.TT
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

            components.resetpassword,

        ],
        redirectRoute: "/profile",
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

            // components.profile,
            components.profileEdit,

            components.formArticle,
            components.articleEdit,

            components.formProduct,
            components.productEdit,

            components.adminDashboard,
        ],
        redirectRoute: "/admin/dashboard",
    },
};
