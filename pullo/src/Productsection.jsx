
import shoesimg4 from "./images/shoes-img4.png";
import staricon from "./images/star-icon.png";
import shoesimg5 from "./images/shoes-img5.png";
import shoesimg6 from "./images/shoes-img6.png";
import shoesimg7 from "./images/shoes-img7.png";
import shoesimg8 from "./images/shoes-img8.png";
import shoesimg9 from "./images/shoes-img9.png";
import Footer from "./Footer";
import Header2 from "./Header2";
import Header from "./Header_section";
function Productsection(){
    return(
        <div>
            <div className="bg-dark"> 
                <Header2 />
            </div>
            <div className="collection_text">Shoes</div> 
        <div className="collection_section con"> 
            <div className="container"> 
               <h1 class="new_text"><strong>New Arrivals Products</strong></h1>
               <p class="consectetur_text ml">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
            </div>
            <div className="layout_padding gallery_section"> 
                <div className="container"> 
                    <div className="row arr"> 
                        {/* 1 */}
                        <div className="col-sm-4">
                            <div className="best_shoes"> 
                              <p class="best_text past">Best Shoes </p>
                              <div className="shoes_icon"> 
                                <img src={shoesimg4} alt="" />
                              </div>
                              <div className="star_text">
                              <div class="left_part">
                                <ul>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                </ul>
                            </div>
                            <div className="right_part">
                                <div className="shoes_price">
                                $ 
                                <span style={{color:"#ff4e5b"}}>60</span>
                                </div>
                            </div>
                              </div>
                            </div>
                        </div>
                      {/* 2 */}
                        <div className="col-sm-4">
                            <div className="best_shoes">
                              <p class="best_text past">Best Shoes </p>
                              <div className="shoes_icon">
                                <img src={shoesimg5} alt="" />
                              </div>
                              <div className="star_text">
                              <div class="left_part">
                                <ul>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                </ul>
                            </div>
                            <div className="right_part">
                                <div className="shoes_price">
                                $ 
                                <span style={{color:"#ff4e5b"}}>400</span>
                                </div>
                            </div>
                              </div>
                            </div>
                        </div>
                        {/* 3 */}
                        <div className="col-sm-4">
                            <div className="best_shoes">
                              <p class="best_text past">Best Shoes </p>
                              <div className="shoes_icon">
                                <img src={shoesimg6} alt="" />
                              </div>
                              <div className="star_text">
                              <div class="left_part">
                                <ul>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                </ul>
                            </div>
                            <div className="right_part">
                                <div className="shoes_price">
                                $ 
                                <span style={{color:"#ff4e5b"}}>50</span>
                                </div>
                            </div>
                              </div>
                            </div>
                        </div>
                    </div>
                    <div className="row arr">
                        {/* 1 */}
                     <div className="col-sm-4">
                            <div className="best_shoes">
                              <p class="best_text past">Best Shoes </p>
                              <div className="shoes_icon">
                                <img src={shoesimg7} alt="" />
                              </div>
                              <div className="star_text">
                              <div class="left_part">
                                <ul>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                </ul>
                            </div>
                            <div className="right_part">
                                <div className="shoes_price">
                                $ 
                                <span style={{color:"#ff4e5b"}}>70</span>
                                </div>
                            </div>
                              </div>
                            </div>
                        </div>
                        {/* 2 */}
                        <div className="col-sm-4">
                            <div className="best_shoes">
                              <p class="best_text past">Best Shoes </p>
                              <div className="shoes_icon">
                                <img src={shoesimg8} alt="" />
                              </div>
                              <div className="star_text">
                              <div class="left_part">
                                <ul>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                </ul>
                            </div>
                            <div className="right_part">
                                <div className="shoes_price">
                                $ 
                                <span style={{color:"#ff4e5b"}}>100</span>
                                </div>
                            </div>
                              </div>
                            </div>
                        </div>
                        {/* 3 */}
                        <div className="col-sm-4">
                            <div className="best_shoes">
                              <p class="best_text past">Best Shoes </p>
                              <div className="shoes_icon">
                                <img src={shoesimg9} alt="" />
                              </div>
                              <div className="star_text">
                              <div class="left_part">
                                <ul>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                </ul>
                            </div>
                            <div className="right_part">
                                <div className="shoes_price">
                                $ 
                                <span style={{color:"#ff4e5b"}}>90</span>
                                </div>
                            </div>
                              </div>
                            </div>
                        </div>
                    </div>
                    <div className="buy_now_bt">
                      <button class="buy_text">Buy Now</button>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
        </div>
    )
}

export default Productsection;