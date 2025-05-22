import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import  { useState, useEffect } from "react";
import axios from "axios";

// Import images
import runningShoes from "./images/running-shoes.png";




function Banner() {

  const [banners, setBanners] = useState([]); 
    const [useDefault, setUseDefault] = useState(false); 

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/banners/enabled");
        setBanners(res.data);
      } catch (err) {
        console.error("Failed to load banners:", err); 
      }
    };
    fetchBanners();
  }, []);
  
  return (
    <div className="bannersection">
      <div className="container-fluid">
        <div className="row">
          {/* <div className="banner">  */}
          <div className="container-fluid">  

            <Swiper
             
              slidesPerView={1} 
              direction="vertical" // Enable vertical scrolling
              spaceBetween={130}
              autoplay={{
                delay: 3000, // Auto slide every 3 seconds 
                disableOnInteraction: false, // Continue autoplay after user interaction
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Autoplay]} // Add Autoplay module  
              className="mySwiper"
              // style={{ height: "100vh" }} // Full-height Swiper 
              breakpoints={{
                425: {
                  spaceBetween: 300, // More space between slides on 425px screens
                  
                },
              }}

            >


              {/* Slide 1 */}
              
                  {banners.map((banner, index) => (   
                  <SwiperSlide key={banner._id}>  
                    <div className="row position-relative">  
                      <div className="col-sm-2 padding_0">  
                        <p className="mens_taital">Men Shoes</p> 
                        <div className="page_no">{index + 1}/{banners.length}</div>
                        <p className="mens_taital_2">Men Shoes</p> 
                      </div>
                      <div className="col-sm-5">  
                        <div className="banner_taital"> 
                          <h1 className="banner_text">{banner.title}</h1>
                          <h1 className="mens_text">  
                            <strong>{banner.text}</strong> 
                          </h1>
                          <p className="lorem_text">{banner.description}</p>
                          <button className="buy_bt">Buy Now</button>
                          <button className="more_bt">See More</button>
                        </div>
                      </div> 
                      <div className="col-sm-5">
                        <div className="shoes_img"> 
                          <img
                            src={`http://localhost:9000/uploads/${banner.shoeImage}`} 
                            alt="shoe" 
                            style={{ maxWidth: "100%", height: "auto" }} 
                          />  
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              {/* Slide 2 */}
              {/* <SwiperSlide>
                <div className="row position-relative">
                  <div className="col-sm-2 padding_0">
                    <p className="mens_taital">Men Shoes</p>
                    <div className="page_no">1/2</div>
                    <p className="mens_taital_2">Men Shoes</p>
                  </div> 
                  <div className="col-sm-5">
                    <div className="banner_taital">
                      <h1 className="banner_text">New Running Shoes</h1>
                      <h1 className="mens_text">
                        <strong>Men's Like Plex</strong>
                      </h1>
                      <p className="lorem_text ">
                        ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <button className="buy_bt">Buy Now</button>
                      <button className="more_bt">See More</button>
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="shoes_img">
                      <img src={runningShoes} alt="shoe" />
                    </div>
                  </div>
                </div>
              </SwiperSlide> */}

              {/* Slide 3 */}
              {/* <SwiperSlide>
                <div className="row position-relative">
                  <div className="col-sm-2 padding_0">
                    <p className="mens_taital">Men Shoes</p>
                    <div className="page_no">2/2</div>
                    <p className="mens_taital_2">Men Shoes</p>
                  </div>
                  <div className="col-sm-5">
                    <div className="banner_taital">
                      <h1 className="banner_text">New Running Shoes</h1>
                      <h1 className="mens_text">
                        <strong>Men's Like Plex</strong>
                      </h1>
                      <p className="lorem_text">
                        ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <button className="buy_bt">Buy Now</button>
                      <button className="more_bt">See More</button>
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="shoes_img">
                      <img src={runningShoes} alt="shoe" />
                    </div>
                  </div>
                </div>
              </SwiperSlide> */}

              {/* slide4 */} 
              {/* <SwiperSlide> 
                <div className="row"> 
                  <div className="col-sm-2 padding_0"> 
                    <p className="mens_taital">Men Shoes</p> 
                    <div className="page_no">2/2</div> 
                    <p className="mens_taital_2">Men Shoes</p> 
                  </div>
                  <div className="col-sm-5"> 
                    <div className="banner_taital"> 
                      <h1 className="banner_text">New Running Shoes</h1> 
                      <h1 className="mens_text">
                        <strong>Men's Like Plex</strong> 
                      </h1>
                      <p className="lorem_text"> 
                        ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p> 
                      <button className="buy_bt">Buy Now</button> 
                      <button className="more_bt">See More</button> 
                    </div> 
                  </div> 
                  <div className="col-sm-5">
                    <div className="shoes_img">
                      <img src={runningShoes} alt="shoe" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>   */}
            </Swiper> 
          </div>
        {/* </div> */}
      </div>
    </div>
     </div> // 
  );
}

export default Banner;
