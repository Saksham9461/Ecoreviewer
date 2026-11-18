import { createBrowserRouter } from "react-router-dom";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { AdminDashboard } from "./pages/AdminDashboard";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Settings } from "./pages/Settings";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      { path: "dashboard", Component: Dashboard },
      { path: "products", Component: Products },
      { path: "products/:id", Component: ProductDetail },
      { path: "blog", Component: Blog },
      { path: "blog/:id", Component: BlogPost },
      { path: "admin", Component: AdminDashboard },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "settings", Component: Settings },
      { path: "*", Component: NotFound },
    ],
  },
]);
