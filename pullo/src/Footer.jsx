
import footerlogo from "./images/footer-logo.png";
import phoneicon from "./images/phone-icon.png";
import emailicon from "./images/email-icon.png";
import fbicon  from "./images/fb-icon.png";
import twitter from "./images/twitter-icon.png";
import inicon from "./images/in-icon.png";
import google from "./images/google-icon.png";
import map from "./images/map-icon.png";
function Footer(){
    return(
        <div className="section_footer">
            <div className="container">
                <div className="mail_section">
                    <div className="row pu">
                        <div className="col-sm-6 col-lg-2">
                            <div>
                                <img src={footerlogo} alt="logo" />
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                            <div className="footer-logo">
                            <img src={phoneicon} alt="" />
                            <span class="map_text">(71) 1234567890</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="footer-logo">
                                <img src={emailicon} alt="" />
                                <span class="map_text">Demo@gmail.com</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="social_icon">
                                <ul className="m-0 p-0">
                                    <li>
                                        <a href="">
                                            <img src={fbicon} alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <img src={twitter} alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <img src={inicon} alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <img src={google} alt="" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                </div>
                <div className="footer_section_2 pu1">
                    <div className="row">
                        <div className="col-sm-4 col-lg-2">
                           <p class="dummy_text"> ipsum dolor sit amet, consectetur ipsum dolor sit amet, consectetur  ipsum dolor sit amet,</p>
                        </div>
                        <div className="col-sm-4 col-lg-2">
                           <h2 class="shop_text">Address </h2>
                           <div className="image-icon">
                             <img src={map} alt="" />
                             <span class="pet_text">No 40 Baria Sreet 15/2 NewYork City, NY, United States.</span>
                           </div>
                        </div>
                        <div className="col-sm-4 col-md-6 col-lg-3">
                          <h2 class="shop_text">Our Company </h2>
                          <div className="delivery_text">
                          <ul>
    				    		<li>Delivery</li>
    				    		<li>Legal Notice</li>
    				    		<li>About us</li>
    				    		<li>Secure payment</li>
    				    		<li>Contact us</li>
    				     </ul>
                          </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                          <h2 class="adderess_text">Products</h2>
                          <div className="delivery_text">
                          <ul>
    				    		<li>Prices drop</li>
    				    		<li>New products</li>
    				    		<li>Best sales</li>
    				    		<li>Contact us</li>
    				    		<li>Sitemap</li>
    				    	</ul>
                          </div>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                          <h2 class="adderess_text">Newsletter</h2>
                          <div className="form-group">
                           <input type="text" class="enter_email" placeholder="Enter Your email" name="Name" />
                          </div>
                          <button class="subscribr_bt">Subscribe</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;