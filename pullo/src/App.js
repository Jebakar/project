import './App.css';

import Header from './Header_section';
import Banner from './Banner';
import Collection from './Collection';
import Racing from './Racing';
import Products from './Products';
import Contact from './Contact';
import Footer from './Footer';
import { Router } from 'react-router-dom';
import Rou from './Router';
import Adminlogin from './Admin/Adminlogin';
import Forget from './Admin/Forget';
import 'font-awesome/css/font-awesome.min.css';
import 'leaflet/dist/leaflet.css';



function App() {
  return (
    <div className="App">
      {/* <div className="banner"> */}
      {/* <Header />  */} 
      {/* <Banner />      */} 
      {/* </div> */}
      {/* <Collection /> */}
      {/* <Racing /> */}
      {/* <Products /> */}
      {/* <Contact /> */}
      {/* <Footer /> */}
      <Rou />
      {/* <Adminlogin />  */}
      {/* <Forget /> */}
      
    </div>
  );
}

export default App;
