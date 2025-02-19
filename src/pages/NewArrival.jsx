import React, { useContext, useEffect, useState } from 'react';
import Nav from '../component/Nav';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router';
import { ProductContext } from '../component/ProductContext';

export const NewArrivalCards = () => {
  const {filterData}=useContext(ProductContext)
  const [product, setProduct] = useState([]);
  const [limit, setLimit] = useState(2); 
  const navigate=useNavigate();

  const handleNavigate=(path,item)=>{
    navigate(path,{state:{item}});
    // console.log("items is ",item);
  }

  useEffect(() => {
    fetch("/newArrival.json")
      .then((res) => res.json())
      .then((data) => setProduct(data));


      const handleLimit = () => {
        if (window.innerWidth < 500) {
          setLimit(2);
        } else if (window.innerWidth < 900) {
          setLimit(4);
        } else {
          setLimit(6);
        }
      };

    handleLimit();
    window.addEventListener('resize', handleLimit);
    return () => window.removeEventListener('resize', handleLimit);
  }, []);

  // Show only "limit" number of products
  const visibleProduct = product.slice(0, limit);

  // console.log(filterData)
  return (
    <>
      <div className='p-2 mt-4'>
        <h1 className='flex justify-center font-bold text-2xl nine:text-4xl text-black'>NEW ARRIVALS</h1>
        <div className='mt-4 w-[90%] mx-auto'>
          
          {/* Grid Layout (Wrap Items to Next Row) */}
          <div 
            className='grid gap-4 w-full mx-auto'
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
              maxWidth: "1000px", 
              margin: "0 auto" 
            }}
          >
            {visibleProduct.map((item) => (
              <div key={item.id} onClick={()=>handleNavigate('/productDetails',item)} className='max-w-[250px] mx-auto'>
                <img src={item.image} alt={item.name} />
                <h1 className='font-bold'>{item.name}</h1>

                <div className='flex gap-2'>
                  <img src={item.star} alt='star' className='max-w-[100px]' />
                  <p>{item.starDetail}</p>
                </div>

                {item.discountPrice == null && item.discountPercentage ? 
                  <div className='flex gap-4 items-center'>
                    <p>${item.discountPrice}</p>
                    <p style={{ textDecoration: "line-through" }}>{item.originalPrice}</p>
                    <p className='rounded-full p-1 bg-pink-400 text-red-600'>{item.discountPercentage}</p>
                  </div>
                 : (
                  <div>
                    <p>{item.originalPrice}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Show More / Show Less Buttons */}
          <div className='flex justify-center mt-4'>
            {limit < product.length ? (
              <button 
                className="mt-2 w-full five:max-w-[200px] hover:bg-gray-700 bg-black rounded-full p-2 px-4 text-white" 
                onClick={() => setLimit(limit + 2)} // Show 2 more products each time
              >
                Show More
              </button>
            ) : (
              <button 
                className="mt-2 w-full five:max-w-[200px] hover:bg-gray-700 bg-black rounded-full p-2 px-4 text-white" 
                onClick={() => setLimit(2)} // Reset to original state
              >
                Show Less
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

const NewArrival = () => {
  return (
    <div>
      <Nav />
      <div className='pt-[100px] four:pt-[90px] nine:pt-[80px]'>
        <NewArrivalCards />
      </div>
      <Footer/>
    </div>
  );
};

export default NewArrival;



