import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"; 


const HappyCustomer = () => {
    const [message,setMessage]=useState([]);
    const[currentIndex,setCurrentIndex]=useState(0);
    const[visibileCard,setVisibileCard]=useState(1);
    const[direction,setDirection]=useState(1);
   
     
    useEffect(()=>{
        fetch('/customer.json')
        .then((res)=>res.json())
        .then((data)=>setMessage(data));

        const updateVisibileCard=()=>{
            const width=window.innerWidth;
            if (width >= 1350) { 
                setVisibileCard(4);
            } else if (width >= 995) {
                setVisibileCard(3);
            } else if (width >=670){  
                setVisibileCard(2);
            }
            else{
                setVisibileCard(1);
            }
        };
        updateVisibileCard();
        window.addEventListener("resize",updateVisibileCard);
        return ()=> window.removeEventListener("resize",updateVisibileCard);
    },[])

    const handlePrev=()=>{
        if(currentIndex > 0){
            setCurrentIndex((pre)=>pre-1);
            setDirection(-1);
            // console.log("pre");
        }
        else{
            alert("You cannot go in previous state instead click next for another review.");
        }
    }
    
    const handleNext=()=>{
        if(currentIndex + visibileCard < message.length){
            setDirection(1);
            setCurrentIndex((pre)=>pre+1);
            // console.log("next");
        }
        else{
            alert("last review is up to this.")
        }
    }

    // Animation Variants
  const cardVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100, // Moves right if next, left if prev
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100, // Moves out to the opposite side
      transition: { duration: 0.1 },
    }),
  };

  return (
    <div>
        <div className="carousel-button-group w-[95%] nine:w-[90%] mx-auto p-4 flex gap-4 justify-start items-center">
  <h1 className="text-2xl nine:text-4xl text-black font-bold">OUR HAPPY CUSTOMERS</h1>
  <span onClick={handlePrev} className="ml-auto"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.70406 4.4541L2.95406 11.2041C2.84918 11.3086 2.76597 11.4328 2.70919 11.5696C2.6524 11.7063 2.62317 11.8529 2.62317 12.001C2.62317 12.149 2.6524 12.2957 2.70919 12.4324C2.76597 12.5691 2.84918 12.6933 2.95406 12.7979L9.70406 19.5479C9.91541 19.7592 10.2021 19.8779 10.5009 19.8779C10.7998 19.8779 11.0865 19.7592 11.2978 19.5479C11.5092 19.3365 11.6279 19.0499 11.6279 18.751C11.6279 18.4521 11.5092 18.1654 11.2978 17.9541L6.46875 13.125L20.25 13.125C20.5484 13.125 20.8345 13.0065 21.0455 12.7955C21.2565 12.5846 21.375 12.2984 21.375 12C21.375 11.7017 21.2565 11.4155 21.0455 11.2045C20.8345 10.9936 20.5484 10.875 20.25 10.875L6.46875 10.875L11.2987 6.04598C11.5101 5.83463 11.6288 5.54799 11.6288 5.2491C11.6288 4.95022 11.5101 4.66357 11.2987 4.45223C11.0874 4.24088 10.8008 4.12215 10.5019 4.12215C10.203 4.12215 9.91634 4.24088 9.705 4.45223L9.70406 4.4541Z" fill="black"/>
</svg></span>

<span onClick={handleNext}>
<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.2959 0.454104L19.0459 7.2041C19.1508 7.30862 19.234 7.43281 19.2908 7.56956C19.3476 7.7063 19.3768 7.85291 19.3768 8.00098C19.3768 8.14904 19.3476 8.29565 19.2908 8.4324C19.234 8.56915 19.1508 8.69334 19.0459 8.79785L12.2959 15.5479C12.0846 15.7592 11.7979 15.8779 11.4991 15.8779C11.2002 15.8779 10.9135 15.7592 10.7022 15.5479C10.4908 15.3365 10.3721 15.0499 10.3721 14.751C10.3721 14.4521 10.4908 14.1654 10.7022 13.9541L15.5313 9.12504L1.75 9.12504C1.45163 9.12504 1.16548 9.00651 0.954505 8.79554C0.743527 8.58456 0.625 8.29841 0.625 8.00004C0.625 7.70167 0.743527 7.41552 0.954505 7.20455C1.16548 6.99357 1.45163 6.87504 1.75 6.87504L15.5313 6.87504L10.7013 2.04598C10.4899 1.83463 10.3712 1.54799 10.3712 1.2491C10.3712 0.950218 10.4899 0.663574 10.7013 0.45223C10.9126 0.240885 11.1992 0.122151 11.4981 0.122151C11.797 0.122151 12.0837 0.240885 12.295 0.45223L12.2959 0.454104Z" fill="black"/>
</svg>
</span>
  </div>
 

  <div className="flex justify-center overflow-hidden relative">
        <AnimatePresence initial={false} custom={direction}>
          {message.slice(currentIndex, currentIndex + visibileCard).map((item) => (
            <motion.div
              key={item.id}
              className="p-4 max-w-[300px] border-2 border-gray-300 rounded-md m-4"
              custom={direction}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="w-[95%] mx-auto">
                <img src={item.star} alt="star" />
                <p className="inline mr-2 font-bold">{item.name}</p>
                <img className="inline" src={item.batch} alt="greenLogo" />
                <p>{item.comment.join("\n")}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  )
}

export default HappyCustomer