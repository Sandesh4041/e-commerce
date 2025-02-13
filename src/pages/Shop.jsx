import React, { useEffect, useState } from "react";
import Nav from "../component/Nav";
import versca from '../images/versace.png';
import zara from '../images/zara-logo-1 1.png';
import gucci from '../images/gucci-logo-1 1.png';
import prada from '../images/prada-logo-1 1.png';
import calvin from '../images/calvin.png';
import { NewArrivalCards } from "./NewArrival";
import { SalesCards } from "./OnSales";
import { useNavigate } from "react-router";
import { BrandsGrid } from "./Brands";
import HappyCustomer from "../component/HappyCustomer";
import Footer from "../component/Footer";

const Shop = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
  const navigate=useNavigate();
  const handleNavigation=(path)=>{
    navigate(path);
  }

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 600);
    const handleSize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);
  return (
    <>
   
    <div>
      <Nav />
      <div className={`${isSmallScreen ? "bg-noPhoto" : "bg-photo"} pt-[110px] four:pt-[100px] nine:pt-[90px] `}>
        <div className="mt-auto seven:mt-[80px] h-auto  relative w-[95%] lg:w-[90%] m-0 mx-auto p-2">
          <h1 className="text-black font-bold text-2xl four:text-3xl six:text-5xl max-w-[370px] six:max-w-[400px] h-auto six:h-[173px] ">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="z-10 max-w-[370px] eight:max-w-[545px]">
            Browse through our diverse range of meticulosly craftedgarments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button onClick={()=>handleNavigation('/newarrivals')} className="mt-6 w-full five:max-w-[200px] hover:bg-gray-700 bg-black rounded-full p-2 px-4 text-white">
            Shop Now
          </button>

          {/* this is about details of our company */}
          <div className="w-[95%] six:w-[50%] ml-2 flex gap-4 justify-center mt-2 six:mt-8 ">
            <div className="">
              <h1 className="text-2xl font-bold nine:text-4xl">200+</h1>
              <p className="mt-2">International Brands</p>
            </div>
            <div className="">
              <h1 className="text-2xl font-bold nine:text-4xl">2,000+</h1>
              <p className="mt-2">High-Quality Products</p>
            </div>
            <div>
              <h1 className="text-2xl font-bold nine:text-4xl">200+</h1>
              <p className="mt-2">Happy Customers</p>
            </div>
          </div>
        </div>
        {isSmallScreen ? (
        <div className={`sbg-photo h-[350px] relative`}>
         <span className="absolute top-[35%] left-[8%] eight:right-[40%]">
              <svg
                width="59"
                height="59"
                viewBox="0 0 104 104"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M52 0C53.7654 27.955 76.0448 50.2347 104 52C76.0448 53.7654 53.7654 76.0448 52 104C50.2347 76.0448 27.955 53.7654 0 52C27.955 50.2347 50.2347 27.955 52 0Z"
                  fill="black"
                />
              </svg>
            </span>
            <span className="absolute top-[50px] right-[10px]">
              <svg
                width="80"
                height="80"
                viewBox="0 0 104 104"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M52 0C53.7654 27.955 76.0448 50.2347 104 52C76.0448 53.7654 53.7654 76.0448 52 104C50.2347 76.0448 27.955 53.7654 0 52C27.955 50.2347 50.2347 27.955 52 0Z"
                  fill="black"
                />
              </svg>
            </span>
         </div>
        ) : (
          <>
            <span className="absolute top-[200px] right-[35%] eight:right-[40%]">
              <svg
                width="59"
                height="59"
                viewBox="0 0 104 104"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M52 0C53.7654 27.955 76.0448 50.2347 104 52C76.0448 53.7654 53.7654 76.0448 52 104C50.2347 76.0448 27.955 53.7654 0 52C27.955 50.2347 50.2347 27.955 52 0Z"
                  fill="black"
                />
              </svg>
            </span>
            <span className="hidden ten:block absolute top-[100px] right-[2px] eight:right-[5%]">
              <svg
                width="104"
                height="104"
                viewBox="0 0 104 104"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M52 0C53.7654 27.955 76.0448 50.2347 104 52C76.0448 53.7654 53.7654 76.0448 52 104C50.2347 76.0448 27.955 53.7654 0 52C27.955 50.2347 50.2347 27.955 52 0Z"
                  fill="black"
                />
              </svg>
            </span>
          </>
        )}
      </div>
      
    </div>
    <div className="bg-black p-6 flex justify-center flex-wrap gap-6 five:gap-10">
<img src={versca} alt="versca"/>
<img src={zara} alt="zara" />
<img src={gucci} alt="gucci" />
<img src={prada} alt="prada" />
<img src={calvin} alt="calvin" />
    </div>
    <NewArrivalCards/>
    <hr className="w-[90%] mx-auto mt-6" />
<SalesCards/>
<BrandsGrid/>
<div className="mt-[50px]">
<HappyCustomer/>
</div>
<div>
  <Footer/>
</div>
    </>
  );
};

export default Shop;
