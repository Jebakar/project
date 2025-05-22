import Footer from "./Footer"
import Header2 from "./Header2"

function Contactsection(){
    return(
        <div>
            <div className="bg-dark">
                <Header2 />
            </div>
            <div class="collection_text">Contact Us</div>
        <div className="layout_padding contact_section pa con">
            <div className="container">
              <h1 class="new_text"><strong>Contact Now</strong></h1> 
            </div>
            <div className="container-fluid ram">
                <div className="row">
                    <div className="col-md-6">
                        <div className="email_box">
                            <div className="input_main">
                                <div className="container">
                                <form action="/action_page.php"> 
                                  <div class="form-group">
                                  <input type="text" class="email-bt" placeholder="Name" name="Name" />
                                  </div>
                                <div class="form-group">
                                <input type="text" class="email-bt" placeholder="Phone Numbar" name="Name" />
                                </div>
                                <div class="form-group">
                                <input type="text" class="email-bt" placeholder="Email" name="Email" />
                                </div>
                            
                                <div class="form-group">
                                <textarea class="massage-bt" placeholder="Massage" rows="5" id="comment" name="Massage"></textarea>
                               </div>
                               </form>
                                </div>
                                <div className="send_btn">
                                 <button class="main_bt">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="shop_banner">
                            <div className="our_shop">
                              <button class="out_shop_bt">Our Shop</button>
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
    )
}
export default Contactsection