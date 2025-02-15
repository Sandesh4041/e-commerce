import React, {  useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Nav from '../component/Nav';
import Footer from '../component/Footer';
import next from '../images/next.png';
import defaultOne from '../images/defaultOne.png';
import defaultTwo from '../images/defaultTwo.png';
import defaultThree from '../images/defaultThree.png';
import brown from '../images/brown.png';
import gray from '../images/gray.png';
import purpleblue from '../images/purpleblue.png';
import tick from '../images/tick.png';
import ReviewSection from '../component/ReviewSection';
import { useDispatch } from 'react-redux' 
import { addTocart } from '../features/counter/counterSlice';

const ProductDetail = () => {
    const dispatch=useDispatch()
   
    const navigate=useNavigate();


    const[choosenColor,setChoosenColor]=useState()
    const [browns, setBrown] = useState(false);
    const [grays, setGray] = useState(false);
    const [purpleblues, setPurpleblue] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null); 
    const[value,setValue]=useState(1);
    const location = useLocation();
    const item = location.state?.item;

    const[cart,setCart]=useState({
        'itemId':item.id,
        'itemImage':item.image,
        'itemName':item.name,
        'itemPrice':item.originalPrice,
        'itemColor':choosenColor,
        'itemSize':selectedSize,
        'itemTotal':value,
        'subTotal':parseInt(item.originalPrice.replace("$","",10))*value
        
    })

    const handleAddToCart=()=>{
        if(!choosenColor || !selectedSize ){
            alert("Please select the all option so that we can verify your desire clothes")
            return
        }
        dispatch(addTocart(cart))
        // console.log(cart)
        alert("Product Added Successfully,Have A Good Day!")
    }
useEffect(()=>{
setCart({
    'itemId':item.id,
    'itemImage':item.image,
    'itemName':item.name,
        'itemPrice':item.originalPrice,
        'itemColor':choosenColor,
        'itemSize':selectedSize,
        'itemTotal':value,
        'subTotal':parseInt(item.originalPrice.replace("$","",10))*value
})
},[choosenColor,selectedSize,value,item])

    const handleColour = (color) => {
        setBrown(color === "brown");
        setGray(color === "gray");
        setPurpleblue(color === "purpleblue");
        setChoosenColor(color)
    };
    // console.log(cart);
    // console.log(value);
    // console.log(selectedSize);
    // console.log(item.name);
    // console.log(item.originalPrice);
    // console.log(choosenColor);
    const handleValue=(condition)=>{
if(value>=1){
    if(condition==='increment')
        setValue((data)=>data+1);
    else{  
        if(value>1){
            setValue((data)=>data-1);
        }
    
    }
  
}
    }
    const handleSizeClick = (size) => {
        setSelectedSize(size); // Set the selected size
       
    };
// useEffect(()=>{
//     console.log("size is ",selectedSize);
// },[selectedSize])
   

    return (
        <div>
            <Nav />
            <div className='pt-[110px]  nine:pt-[100px]'>
                <hr className="w-[90%] mx-auto mt-6 border  border-gray-100 " />
                <div className='pt-2 w-[95%] nine:w-[90%] mx-auto items-center'>
                    <p className='inline cursor-pointer' onClick={()=>navigate('/')}>Home <img src={next} alt="next" className='inline' /></p>
                    <p className='inline cursor-pointer' onClick={()=>navigate('/onsales')}>Shop <img src={next} alt="next" className='inline' /></p>
                    <p className='inline'>Men <img src={next} alt="next" className='inline' /></p>
                    <p className='inline font-bold'>{item.detail}</p>

                    <div className='flex flex-col nine:flex-row gap-6 mt-6'>
                        <div className='item-grid w-[95%] nine:w-[90%] mx-auto '>
                            <img src={defaultOne} alt="defualtOne" className="item " />
                            <img src={defaultTwo} alt='defaultTwo' className='item' />
                            <img src={defaultThree} alt='defaultThree' className='item' />
                            <img src={item.image} alt="mainImage" className="item max-w-full h-full" />
                        </div>

                        <div className='flex flex-col gap-2 w-[90%] mx-auto'>
                            <h1 className='font-bold'>{item.name}</h1>

                            <div className='flex gap-2'>
                                <img src={item.star} alt='star' className='max-w-[100px]' />
                                <p>{item.starDetail}</p>
                            </div>

                            {item.discountPrice == null && item.discountPercentage ? (
                                <div className='flex gap-4 items-center'>
                                    <p>${item.discountPrice}</p>
                                    <p style={{ textDecoration: "line-through" }}>{item.originalPrice}</p>
                                    <p className='rounded-full p-1 bg-pink-400 text-red-600'>{item.discountPercentage}</p>
                                </div>
                            ) : (
                                <div>
                                    <p className='font-bold'>{item.originalPrice}</p>
                                </div>
                            )}
                            <p>{item.description}</p>

                            <hr className='border border-gray-200 w-full mx-auto' />
                            <p>Select Colors</p>

                            <div className='flex gap-2 py-2'>
                                <div className='relative'>
                                    <img src={brown} alt="brown" onClick={() => handleColour('brown')} />
                                    {browns ? <img src={tick} alt="tick" className='absolute top-3 left-3' /> : ""}
                                </div>
                                <div className='relative'>
                                    <img src={gray} alt="gray" onClick={() => handleColour('gray')} />
                                    {grays ? <img src={tick} alt="tick" className='absolute top-3 left-2' /> : ""}
                                </div>
                                <div className='relative'>
                                    <img src={purpleblue} alt="purpleblue" onClick={() => handleColour('purpleblue')} />
                                    {purpleblues ? <img src={tick} alt="tick" className='absolute top-3 left-2' /> : ""}
                                </div>
                            </div>

                            <hr className='border border-gray-200 w-full mx-auto' />

                            <div className='p-2'>
                                <p>Choose Size</p>
                                <div className='flex flex-wrap gap-2 mt-2 text-center'>
                                    <button
                                        className={`p-3 px-6 rounded-full ${selectedSize === "Small" ? "bg-black text-white" : "bg-gray-200 text-black"}`}
                                        onClick={() => handleSizeClick("Small")}
                                    >
                                        Small
                                    </button>
                                    <button
                                        className={`p-3 px-6 rounded-full ${selectedSize === "Medium" ? "bg-black text-white" : "bg-gray-200 text-black"}`}
                                        onClick={() => handleSizeClick("Medium")}
                                    >
                                        Medium
                                    </button>
                                    <button
                                        className={`p-3 px-6 rounded-full ${selectedSize === "Large" ? "bg-black text-white" : "bg-gray-200 text-black"}`}
                                        onClick={() => handleSizeClick("Large")}
                                    >
                                        Large
                                    </button>
                                    <button
                                        className={`p-3 px-6 rounded-full ${selectedSize === "X-Large" ? "bg-black text-white" : "bg-gray-200 text-black"}`}
                                        onClick={() => handleSizeClick("X-Large")}
                                    >
                                        X-Large
                                    </button>
                                </div>
                            </div>
                            <hr className='border mt-2 border-gray-200 w-full mx-auto' />

                            <div className='flex justify-around gap-2 nine:gap-4 mt-3'>
                                <div className='flex gap-4 bg-gray-200 rounded-full p-3 px-6'>
                                    <button onClick={()=>handleValue('decrement')} className='font-bold text-2xl items-center'>-</button>
                                    <p className=' text-2xl items-center'>{value}</p>
                                    <button onClick={()=>handleValue('increment')} className='font-bold text-2xl items-center'>+</button>
                                </div>

                                <div className='max-w-[350px] flex-grow'>
                            <button className='w-full  bg-black text-white rounded-full p-4 px-8' onClick={handleAddToCart}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
             
                </div>
            </div>
            <div className="mt-[10px]">
                <ReviewSection/>
            </div>

            <Footer />
        </div>
    );
}

export default ProductDetail;
