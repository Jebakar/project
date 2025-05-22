
import showimg from "./images/shoes-img1.png";
import staricon from "./images/star-icon.png";
import showimg2 from "./images/shoes-img2.png";
import Footer from "./Footer";
import Header2 from "./Header2";

function Collectionsection(){
    return(
        <div>
            <div className="bg-dark">
                <Header2 />
            </div>
            <div className="collection_text">Collection</div>
        
        <div className="con collection_section new">
           
            <div className="container">
                <h1 className="new_text">
                <strong>New  Collection</strong>
                </h1>
                <p className="consectetur_text pa ml">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                <div className="collection_section_2">
                    <div className="row mli">
                        <div className="col-md-6 col-xxl-5">
                            <div className="about-img">
                            <button class="new_bt">New</button>
                            <div className="shoes-img">
                                <img src={showimg} alt="" />
                            </div>
                            <p class="sport_text">Men Sports</p>
                            <div className="dolar_text">
                            $
                            <strong style={{ color: "#f12a47" }}>90</strong>
                            </div>
                            <div className="star_icon">
                            <ul>
    	    						<li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>				
    	    				</ul>
                            </div>
                            </div>
                            <button class="seemore_bt">See More</button>
                        </div>
                        <div className="col-md-6 col-xxl-6">
                            <div className="about-img2">
                                <div className="shoes-img2">
                                    <img src={showimg2} alt="" />

                                </div>
                                <p class="sport_text">Men Sports</p>
                                <div class="dolar_text">
                                    $
                                 <strong style={{color: "#f12a47"}}>90</strong> 
                                </div>
                                <div className="star_icon">
                            <ul>
    	    						<li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>
                                    <li><a href="#"><img src={staricon} /></a></li>				
    	    				</ul>
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
        </div>
       
    )
}

export default Collectionsection;