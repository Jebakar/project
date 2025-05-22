import React from "react";

import shoesimg3 from "./images/shoes-img3.png";
import Header2 from "./Header2";
import Footer from "./Footer";
function Racingsection(){
    return(
        <div>
            <div className="bg-dark">
                <Header2 />
            </div>
            <div class="collection_text">Racing Boots</div>
    <div className="collection_section boots">
        <div className="container">
        <h1 class="new_text"><strong>Racing Boots</strong></h1>
        <p class="consectetur_text ml">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
        </div>
        <div className="collection_section_3 layuot_padding">
            <div className="container">
                <div className="racing_shoes rac">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="shoes-img3">
                                <img src={shoesimg3} alt="" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="sale_text">
                                <strong>
                                Sale 
                                <br />
                                <span style={{color :"black"}}>JOGING</span>
                                <br />
                                SHOES
                                </strong>
                           
                            </div>
                            <div className="number_text">
                                <strong>
                                $ 
                                <span style={{color:"black"}}>100</span>
                                </strong>
                            </div>
                            <button className="seemore">See More</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
   <div>
    <Footer />
   </div>
    </div>
    );  
}

export default Racingsection;