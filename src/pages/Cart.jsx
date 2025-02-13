
import Nav from '../component/Nav'
import next from "../images/next.png";
import go from "../images/go.png";
import Footer from '../component/Footer';
import delte from '../images/delete.png';
import { removeFromCart } from '../features/counter/counterSlice';
import { useDispatch, useSelector } from 'react-redux';


const Cart = () => {
    const {cart}=useSelector(state=>state);
    const dispatch=useDispatch();
    console.log(cart);
   

    const handleDelete=(id)=>{
        console.log(id)
dispatch(removeFromCart({id}))
    }

  return (
    <div>
      <Nav/>
      <div className='mt-[120px] five:mt-[110px] w-[95%] nine:w-[90%] mx-auto'>
<h1 className='inline'>Home</h1>
<img className='inline'  src={next} alt="next" />
<h1 className='inline font-bold'>Cart</h1>
<div className='mt-[10px]'>
    <h1 className="font-bold text-3xl nine:text-5xl flex justify-center">YOUR CART</h1>
</div>
{/* this is about showing the cart div  */}
 <div className='flex flex-col seven:flex-row gap-2  mt-[10px] rounded-lg p-2 w-[95%] nine:w-[90%] mx-auto'>
    <div className='w-full'>
    {
cart.map((item,index)=>(
    <>
    <div key={index} className='w-full border border-gray-200 rounded-md  p-3 flex gap-2 '>
    <div >
        <img src={item.itemImage} className='max-w-[100px] six:max-w-[200px] nine:max-w-[240px] 2xl:max-w-[300px] ' alt="testing" />
    </div>
    <div className='w-full p-2'>
        <div className='flex justify-between'> 
    <h1 className='font-bold'>{item.itemName}</h1>
    <img src={delte} alt="delete" className='cursor-pointer' onClick={()=>handleDelete(item.itemId)} />
        </div>
    <p><span className='font-semibold'>Size</span>:{item.itemSize}</p>
    <p><span className='font-semibold'>Color</span>:{item.itemColor}</p>
    
    <div className='mt-[10px] flex justify-between'>
<p className='font-bold '>${Number(item.itemPrice.replace(/[^0-9.]/g, '')) * Number(item.itemTotal)}</p>
    <p className='bg-gray-200 font-bold  rounded-md py-1 px-6'><span className='mr-[10px] cursor-pointer font-semibold'>-</span>{item.itemTotal}<span onClick={()=>item.itemTotal+1} className='font-semibold ml-[10px] cursor-pointer'>+</span></p>
    </div>
    </div>
</div>
 <hr className='border border-gray-200 my-[5px]' />
    </>
))
    }
  

    
 </div>
{/* this is about order div  */}
<div className='w-full p-4 border border-gray-200 rounded-lg h-auto max-h-[300px] overflow-hidden'> 

    <h1 className='font-bold'>Order Summary</h1>

    <div className='mt-[10px]'>
        <div className="flex justify-between">
        <p className='font-semibold'>Subtotal</p>
        <p className='font-bold'>$565</p>
        </div>

<div className="flex justify-between">
<p className='font-semibold'>Discount(-20%)</p>
<p className='font-bold text-red-400'>-$113</p>
</div>
    
<div className="flex justify-between">
<p className='font-semibold'>Delivery Fee</p>
<p className='font-bold'>$15</p>
</div>
     

        <hr className='border border-gray-100 my-[10px]' />

        <p className='inline font-semibold'>Total</p>
        <p className='inline float-right font-bold'>$467</p>
    </div>

    <div className='mt-[10px]'>
        <input type="text" placeholder='Apply promo code'   style={{ textIndent: "30px" }}  className=" input-tag rounded-3xl px-2 bg-gray-300 outline-none active:border border-blue-400" />
        <button className='bg-black text-white rounded-3xl float-right py-2 px-4'>Apply</button>
    </div>
    <div className='mt-[10px] w-full'>
<button className=' items-center flex justify-between w-full bg-black text-white rounded-3xl px-4 py-3 relative'><span className='mx-auto'>Go To CheckOut</span> <span><img src={go} alt="go" className='go' /></span></button>

    </div>

 </div>

 </div>
      </div>
      <div className='mt-[15px]'>
        <Footer/>
      </div>
    </div>
  )
}

export default Cart
