import { Routes ,Route} from "react-router-dom";
import Header from "./Header_section";
import Collection from "./Collection";
import Products from "./Products";
import Racing from "./Racing";
import Footer from "./Footer";
import Banner from "./Banner";
import Home from "./Home";
import Collectionsection from "./Collectionsection";
import Productsection from "./Productsection";
import Racingsection from "./Racingsection";
import Contactsection from "./Contactsection";
import Signup from "./Signup";
import SignIn from "./Signin";
import ForgotPassword from "./Forgetpassword";
import ResetPassword from "./ResetPassword";
import Cart from "./Card";
import Checkout from "./Checkout";
import MyOrders from "./MyOrders";
import Forget from "./Admin/Forget";
import AdminLogin from "./Admin/Adminlogin";
import Adminhome from "./Admin/Adminheader";
import Adminheader from "./Admin/Adminheader";
import AdminLayout from "./Adminlayout";
import Dashboard from "./Admin/Dashboard";
import Categories from "./Admin/Categories";
import AddCategoryForm from "./Admin/Addform";
import BestShoes from "./Bestshoes";
import StylishShoes from "./Stylishshoes";
import CasualShoes from "./Casualshoes";
import RunningShoes from "./Runningshoes";
import ComfortShoes from "./Comfortshoes";
import SportsShoes from "./Sportsshoes";
import Productsadmin from "./Admin/Products";
import Addproduct from "./Admin/Addproduct";
import User from "./Admin/User";
import Adduser from "./Admin/Adduser";
import Adminorder from "./Admin/Adminorder";
import Settings from "./Admin/Settings";
import BannerForm from "./Admin/BannerForm";

function Rou () {
    return(
        <div>
        {/* <Header /> */}
        <Routes> 
            <Route path="/" element={<Home />}/>             
            <Route path="/banner" element={<Banner />} />     
            <Route path="/collection" element={<Collectionsection />} />    
            <Route path="/shoes" element={<Productsection />} />     
            <Route path="/racingboots" element={<Racingsection />} />    
            <Route path="/contact" element={<Contactsection />} /> 
            <Route path="/signup" element={<Signup />}/>     
            <Route path="/signin" element={<SignIn />}/>
            <Route path="/forgot-password" element={<ForgotPassword />}/>
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/cart" element={<Cart />}/>  
            <Route path="/checkout" element={<Checkout />} /> 
            <Route path="/my-orders" element={<MyOrders />} />  
            <Route path="/admin" element={<AdminLogin />}/> 
            <Route path="/admin/forgot-password" element={<Forget />} /> 
            <Route path="/admin/dashboard" element={<AdminLayout />}/>  
            <Route path="/categories" element={<Categories />}/> 
            <Route path="/add-category" element={<AddCategoryForm />}/> 
            <Route path="/shoes/best" element={<BestShoes />}/> 
            <Route path="/shoes/stylish" element={<StylishShoes />}/> 
            <Route path="/shoes/casual" element={<CasualShoes />}/> 
            <Route path="/shoes/running" element={<RunningShoes />}/>
            <Route path="/shoes/comfort" element={<ComfortShoes />}/> 
            <Route path="/shoes/sports" element={<SportsShoes />}/> 
            <Route path="/add-category/:id" element={<AddCategoryForm />} />
            {/* <Route path="/view-category/:id" element={<ViewCategory />} /> */}
            <Route path="/products" element={<Productsadmin />}/>
            <Route path="/add-product" element={<Addproduct />}/>
            <Route path="/add-product/:id" element={<Addproduct />}/>
            <Route path="/user" element={<User />}/>
            <Route path="/add-user" element={<Adduser />}/>
            <Route path="/order" element={<Adminorder />}/>
            <Route path="/settings" element={<Settings />}/>
            <Route path="/add-banner" element={<BannerForm />}/>
        </Routes> 
        </div>
    )
}
export default Rou