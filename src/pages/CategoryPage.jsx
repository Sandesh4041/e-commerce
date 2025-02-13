import React, { useEffect, useState } from "react";
import Nav from "../component/Nav";
import next from "../images/next.png";
import { GiCrossMark } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router";
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import tick from "../images/tick.png";
import Footer from "../component/Footer";
import filter from "../images/filter.png";

const CategoryPage = () => {
  const [detail, setDetail] = useState([]);
  const [selectedColor, setSelectedColor] = useState("green");
  const [size, setSize] = useState("");
  const [range, setRange] = useState([50, 300]);
  const [limit, setLimit] = useState(1);
  const[popUp,setPopUp]=useState(false);
  // const visibileProduct=detail.slice(0,limit);
  const lengths = detail.length;
  const totalLength = Math.ceil(lengths / limit);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * limit;
  const firstIndex = lastIndex - limit;

  const navigate = useNavigate();

  const handleNavigate = (path, item) => {
    navigate(path, { state: { item } });
  };

  const handleMagic = (newPage) => {
    if (newPage >= 1 && newPage <= totalLength) {
      setCurrentPage(newPage);
    }
  };

  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const name = queryParam.get("name");
  const [filterData, setFilterData] = useState({
    color: "",
    siz: "",
  });

  useEffect(() => {
    fetch("/newArrival.json")
      .then((res) => res.json())
      .then((data) => setDetail(data));

    const handleLimit = () => {
      if (window.innerWidth < 500) {
        setLimit(2);
      } else if (window.innerWidth < 816) {
        setLimit(3);
      } else if (window.innerWidth < 900) {
        setLimit(4);
      } else if (window.innerWidth < 1200) {
        setLimit(6);
      } else {
        setLimit(9);
      }
    };
    handleLimit();
    window.addEventListener("resize", handleLimit);
    return () => window.removeEventListener("resize", handleLimit);
  }, []);

  const sizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];

  const colors = [
    "green",
    "red",
    "yellow",
    "orange",
    "blue",
    "violet",
    "pink",
    "white",
    "black",
  ];

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };
  const handleSize = (item) => {
    setSize(item);
  };
  const sendData = () => {
    setFilterData({
      color: selectedColor,
      siz: size,
    });
  };
  useEffect(() => {
    setFilterData({
      color: selectedColor,
      siz: size,
    });
  }, [size, selectedColor]);
  console.log(filterData);
  return (
    <div>
      <Nav />
      <div className="pt-[110px]  nine:pt-[100px]">
        <div className="w-[95%] nine:w-[90%] mx-auto">
          <h1 className="inline">Home</h1>
          <img src={next} alt="next" className="inline ml-[5px]" />
          <h1 className="inline ml-[5px] font-bold">{name}</h1>

          <div className="flex gap-4 mt-[10px] relative">
            {/* this if for large size width  */}
            <div className="hidden six:block w-1/3 nine:w-1/4 max-w-[250px] border border-gray-200 rounded-md p-4">
              <h1 className="font-bold">Filters</h1>
              <hr className="border-gray-200 mt-[10px]" />
              <div className="flex flex-col gap-2 mt-[5px]">
                <p className="cursor-pointer">T-shirt</p>
                <p className="cursor-pointer">Shorts</p>
                <p className="cursor-pointer">Shirt</p>
                <p className="cursor-pointer">Hoodie</p>
                <p className="cursor-pointer">Jeans</p>
              </div>
              <hr className="border-gray-200 mt-[10px]" />
              <div className="mt-[5px]">
                <h1 className="font-bold">Price</h1>
                <p>
                  ${range[0]} to ${range[1]}
                </p>
                <RangeSlider
                  defaultValue={range}
                  min={0}
                  max={350}
                  onChange={(val) => setRange(val)}
                >
                  <RangeSliderTrack bg="gray.300">
                    <RangeSliderFilledTrack bg="black" />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} bg="black" />
                  <RangeSliderThumb index={1} bg="black" />
                </RangeSlider>
              </div>
              <hr className="border-gray-200 mt-[10px]" />
              <div className="mt-[5px]">
                <h1 className="font-bold">Colors</h1>
                <div className="flex flex-wrap mt-[5px]">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className={`w-8 border border-black h-8 rounded-full mr-2 mb-2 cursor-pointer flex items-center justify-center ${
                        selectedColor === color
                          ? "border-2 border-blue-500"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                    >
                      {selectedColor === color && <img src={tick} alt="tick" />}
                    </div>
                  ))}
                </div>
              </div>
              <hr className="border-gray-200 mt-[10px]" />
              <div className="mt-[5px]">
                <h1 className="font-bold">Size</h1>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((item) => (
                    <div
                      key={item}
                      className={`py-2 px-4 rounded-full cursor-pointer ${
                        size === item ? "bg-black text-white" : "bg-gray-200"
                      } `}
                      onClick={() => handleSize(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <hr className="border-gray-200 mt-[10px]" />
              <div className="mt-[5px]">
                <h1 className="font-bold">Dress Style</h1>
                <div className="flex flex-col gap-2">
                  <p className="cursor-pointer">Casual</p>
                  <p className="cursor-pointer">Party</p>
                  <p className="cursor-pointer">Formal</p>
                  <p className="cursor-pointer">Gym</p>
                </div>
                <button
                  className="bg-black py-3 px-5 text-white rounded-full mt-[5px] w-full"
                  onClick={sendData}
                >
                  Apply Filter
                </button>
              </div>
            </div>

            {/* this is for small size width  */}
            <div>
{
  popUp ?<div className="absolute border bg-gray-100 border-r-gray-200 w-full h-[90vh]  p-3 rounded-3xl">
    <>
    <div className="relative">
 <span className='absolute right-0 cursor-pointer' onClick={()=>setPopUp(false)}><GiCrossMark /></span>
 <div className="  border border-gray-200 rounded-md p-4">
              <h1 className="font-bold">Filters</h1>
              <hr className="border-gray-200 mt-[10px]" />
              <div className="flex flex-col gap-2 mt-[5px]">
                <p className="cursor-pointer">T-shirt</p>
                <p className="cursor-pointer">Shorts</p>
                <p className="cursor-pointer">Shirt</p>
                <p className="cursor-pointer">Hoodie</p>
                <p className="cursor-pointer">Jeans</p>
              </div>
              <hr className="border-gray-200 mt-[10px]" />
              <div className="mt-[5px]">
                <h1 className="font-bold">Price</h1>
                <p>
                  ${range[0]} to ${range[1]}
                </p>
                <RangeSlider
                  defaultValue={range}
                  min={0}
                  max={350}
                  onChange={(val) => setRange(val)}
                >
                  <RangeSliderTrack bg="gray.300">
                    <RangeSliderFilledTrack bg="black" />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} bg="black" />
                  <RangeSliderThumb index={1} bg="black" />
                </RangeSlider>
              </div>
              <hr className="border-gray-200 mt-[10px]" />
              <div className="mt-[5px]">
                <h1 className="font-bold">Colors</h1>
                <div className="flex flex-wrap mt-[5px]">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className={`w-8 border border-black h-8 rounded-full mr-2 mb-2 cursor-pointer flex items-center justify-center ${
                        selectedColor === color
                          ? "border-2 border-blue-500"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                    >
                      {selectedColor === color && <img src={tick} alt="tick" />}
                    </div>
                  ))}
                </div>
              </div>
              <hr className="border-gray-200 mt-[10px]" />
              <div className="mt-[5px]">
                <h1 className="font-bold">Size</h1>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((item) => (
                    <div
                      key={item}
                      className={`py-2 px-4 rounded-full cursor-pointer ${
                        size === item ? "bg-black text-white" : "bg-gray-200"
                      } `}
                      onClick={() => handleSize(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <hr className="border-gray-200 mt-[10px]" />
              <div className="mt-[5px]">
                <h1 className="font-bold">Dress Style</h1>
                <div className="flex flex-col gap-2">
                  <p className="cursor-pointer">Casual</p>
                  <p className="cursor-pointer">Party</p>
                  <p className="cursor-pointer">Formal</p>
                  <p className="cursor-pointer">Gym</p>
                </div>
                <button
                  className="bg-black py-3 px-5 text-white rounded-full mt-[5px] w-full"
                  onClick={sendData}
                >
                  Apply Filter
                </button>
              </div>
            </div>
    </div>
  </></div>:""
}
            </div>
 {/* finish  */}
            <div className=" w-2/3 nine:w-3/4 mx-auto">
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <h1 className="font-bold text-2xl nine:text-4xl">{name}</h1>
                <p>
                  Showing 1-{totalLength} of {lengths} products
                </p>
                <img src={filter} alt="filter" className="block six:hidden cursor-pointer" onClick={()=>setPopUp(!popUp)}  />
              </div>

              <div className="flex flex-wrap gap-2 mt-[10px]">
  {detail.filter((item) => {
    const price = parseFloat(item.originalPrice.replace(/[^0-9.]/g, ""));
    return price >= range[0] && price <= range[1];
  }).slice(firstIndex, lastIndex).length === 0 ? (
    <h1 className="text-red-400 text-3xl flex justify-center items-center">There is no product within this price range</h1>
  ) : (
    detail
      .filter((item) => {
        const price = parseFloat(item.originalPrice.replace(/[^0-9.]/g, ""));
        return price >= range[0] && price <= range[1];
      })
      .slice(firstIndex, lastIndex)
      .map((item) => (
        <div
          key={item.id}
          onClick={() => handleNavigate("/productDetails", item)}
          className="max-w-[250px] mx-auto"
        >
          <img src={item.image} alt={item.name} />
          <h1 className="font-bold">{item.name}</h1>

          <div className="flex gap-2">
            <img src={item.star} alt="star" className="max-w-[100px]" />
            <p>{item.starDetail}</p>
          </div>

          {item.discountPrice == null && item.discountPercentage ? (
            <div className="flex gap-4 items-center">
              <p>${item.discountPrice}</p>
              <p style={{ textDecoration: "line-through" }}>
                {item.originalPrice}
              </p>
              <p className="rounded-full p-1 bg-pink-400 text-red-600">
                {item.discountPercentage}
              </p>
            </div>
          ) : (
            <div>
              <p>{item.originalPrice}</p>
            </div>
          )}
        </div>
      ))
  )}
</div>

            </div>
          </div>
          <div className='flex gap-2 justify-between w-[95%] five:w-[80%] nine:w-[60%] mx-auto mt-[10px] '>
        
        <button onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage===1} className= 'my-auto max-h-[50px]  bg-black rounded-lg py-3 px-6 text-white'>Previous</button>
            
        {
         <div className='flex gap-2 flex-wrap'>
         {Array.from({ length: totalLength }, (_, i) => i + 1).filter((item)=>{
          if(totalLength<=5) return true;
          return item<=2||item>=totalLength-1||item===currentPage;
         }).map((item,index,arr) => (
          <>
         {index>0 && item-arr[index-1]>1 && <span className="px-2 ">....</span>}
           <button
             key={item}
             className={`${currentPage===item?'bg-gray-500':'bg-gray-200'} py-2 px-4 rounded-md`}
             onClick={() => handleMagic(item)}

           >
             {item}
           </button>
           </>
         ))}
       </div>
        }
        <button onClick={()=>setCurrentPage(currentPage+1)} disabled={currentPage===totalLength} className='my-auto max-h-[50px] bg-black  rounded-lg py-2 px-6 text-white'>Next</button>
      </div>
        </div>
      </div>
      <div className="mt-[10px]">
        <Footer />
      </div>
    </div>
  );
};

export default CategoryPage;
