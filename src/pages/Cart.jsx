import Nav from "../component/Nav";
import next from "../images/next.png";
import go from "../images/go.png";
import Footer from "../component/Footer";
import delte from "../images/delete.png";
import { decreaseCart, increaseCart, removeFromCart } from "../features/counter/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";


const Cart = () => {
    const navigate=useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const total=useSelector((state)=>state.cart.total)
  const[promoText,setPromoText]=useState('')
  const[applyPromoCode,setApplyPromoCode]=useState(false);
  const[promoCode,setPromoCode]=useState('MYFIRSTORDER')
  const[discount,setDiscount]=useState()
  const[totalMoney,setTotalMoney]=useState()
  const[deliveryFee,setDeliveryFee]=useState(15)
  const dispatch = useDispatch();
//   console.log(cart);

  useEffect(()=>{
setDiscount(0.2*total);
if(promoText===promoCode){
    setTotalMoney(total-discount-deliveryFee)
}
else{
    setTotalMoney(total-deliveryFee)
}
  },[total,discount,deliveryFee,promoCode,promoText])

  const handleDelete = (id) => {
    // console.log(id);
    dispatch(removeFromCart({ id }));
  };

  const handlePromoApply=()=>{
    if(promoText===promoCode){
        setApplyPromoCode(true);
        alert("Enjoy 20% discount🥰, Happy coding!🥰🥰")
    }
    else{
        setApplyPromoCode(false);
        alert("promo code don't match,🤯🤯")
    }
  }
  
// console.log(promoText)
  return (
    <div>
      <Nav />
      <div className="mt-[120px] five:mt-[110px] w-[95%] nine:w-[90%] mx-auto">
        <h1 className="inline cursor-pointer" onClick={()=>navigate('/')}>Home</h1>
        <img className="inline" src={next} alt="next" />
        <h1 className="inline font-bold">Cart</h1>
        <div className="mt-[10px]">
          <h1 className="font-bold text-3xl nine:text-5xl flex justify-center">
            YOUR CART
          </h1>
        </div>
        {/* this is about showing the cart div  */}
        <div className="flex flex-col eight:flex-row gap-2  mt-[10px] rounded-lg p-2 w-[95%] nine:w-[90%] mx-auto">
          <div className="w-full ">
            {cart.map((item, index) => (
              <>
                <div
                  key={index}
                  className="w-full max-h-[180px] border border-gray-200 rounded-md  p-3 flex  gap-2 "
                >
                  <div className="my-auto">
                    <img
                      src={item.itemImage}
                      className="max-w-[80px] six:max-w-[200px] nine:max-w-[240px] 2xl:max-w-[300px] max-h-[100px] six:max-h-[140px] "
                      alt="testing"
                    />
                  </div>
                  <div className="w-full p-2">
                    <div className="flex justify-between">
                      <h1 className="font-bold">{item.itemName}</h1>
                      <img
                        src={delte}
                        alt="delete"
                        className="cursor-pointer"
                        onClick={() => handleDelete(item.itemId)}
                      />
                    </div>
                    <p>
                      <span className="font-semibold">Size</span>:
                      {item.itemSize}
                    </p>
                    <p>
                      <span className="font-semibold">Color</span>:
                      {item.itemColor}
                    </p>

                    <div className="mt-[10px] flex justify-between gap-2">
                      <p className="font-bold ">
                        <span>{item.itemPrice}*{item.itemTotal}=</span>
                        $
                        {Number(item.itemPrice.replace(/[^0-9.]/g, "")) *
                          Number(item.itemTotal)}
                      </p>
                      <p className="bg-gray-200 font-bold  rounded-md py-1 px-2 six:px-6">
                        <span className="mr-[10px] cursor-pointer font-semibold" onClick={()=>dispatch(decreaseCart({id:item.itemId}))}>
                          -
                        </span>
                        {item.itemTotal}
                        <span
                          onClick={() =>dispatch(increaseCart({id:item.itemId}))}
                          className="font-semibold ml-[10px] cursor-pointer"
                        >
                          +
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="border border-gray-200 my-[5px]" />
              </>
            ))}
          </div>
          {/* this is about order div  */}
          <div className="w-full p-6 border border-gray-200 rounded-lg h-auto max-h-[300px] overflow-hidden">
            <h1 className="font-bold">Order Summary</h1>

            <div className="mt-[10px]">
              <div className="flex justify-between">
                <p className="font-semibold">Subtotal</p>
                <p className="font-bold">${total}</p>
              </div>
              {
                applyPromoCode ?   <div className="flex justify-between">
                <p className="font-semibold">Discount(-20%)</p>
                <p className="font-bold text-red-600">-${discount}</p>
              </div>:""
              }

            

              <div className="flex justify-between">
                <p className="font-semibold">Delivery Fee</p>
                <p className="font-bold">-${deliveryFee}</p>
              </div>

              <hr className="border border-gray-100 my-[10px]" />

              <p className="inline font-semibold">Total</p>
              <p className="inline float-right font-bold text-green-500">${totalMoney}</p>
            </div>

            <div className="mt-[10px]">
              <input
                type="text"
                value={promoText}
                onChange={(e)=>setPromoText(e.target.value)}
                placeholder="Apply promo code"
                style={{ textIndent: "30px" }}
                className=" input-tag rounded-3xl bg-slate-400 outline-none  w-[60%]"
              />
              <button onClick={handlePromoApply} className="bg-black text-white rounded-3xl float-right py-3 px-6">
                Apply
              </button>
            </div>
            <div className="mt-[10px] w-full">
              <button className=" items-center flex justify-between w-full bg-black text-white rounded-3xl px-4 py-3 relative">
                <span className="mx-auto">Go To CheckOut</span>{" "}
                <span>
                  <img src={go} alt="go" className="go" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[15px]">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
