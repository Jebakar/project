import Banner from "./Banner";
import Collection from "./Collection";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header_section";
import Products from "./Products";
import Racing from "./Racing";
import './App.css';

function Home (){
    return(
        <div>
            <div className="banner">
            <Header />
            <Banner />
            </div>
            <Collection />
            <Racing />
            <Products />
            <Contact />
            <Footer />
        </div>
    )
}
export default Home