import React, { useEffect, useState } from 'react';
import { Tabs, TabList,AccordionPanel, TabPanels, Tab, TabPanel, Accordion, AccordionItem, AccordionButton,Box,AccordionIcon } from '@chakra-ui/react'
import dropDown from '../images/dropDown.png';
import rightArrow from '../images/nextA.png';
import leftArrow from '../images/prev.png'
import RandomClothes from './RandomClothes';

export const RatingAndReviews=()=>{
  const[totalReview,setTotalReview]=useState(null);
  const[data,setdata]=useState([])
     const[currentIndex,setCurrentIndex]=useState(0);
      const[visibileCard,setVisibileCard]=useState(1);

  const handlePop=()=>{
    alert("comming soon...")
  }

  useEffect(()=>{
    fetch('/customer.json')
    .then((res)=>res.json())
    .then((data)=>setdata(data));
    setTotalReview(data.length);
    
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
  },[data])


  const handlePrev=()=>{
    setCurrentIndex((prev)=>(
      prev>0?prev-1:data.length-visibileCard
    ))
  }

  const handleNext=()=>{
setCurrentIndex((prev)=>(
  prev+visibileCard<data.length?prev+1:0
))
  }

return(
<>
<div>
<div className='flex flex-wrap justify-start items-center '>
  <h1 className='font-bold'>All Reviews({totalReview})</h1>
  <div className='flex gap-2 items-center ml-auto'>
    <p className='inline font-bold bg-gray-100 p-4 rounded-full'>Latest 
      <img src={dropDown} onClick={handlePop} alt="dropDown" className='cursor-pointer ml-[10px] inline' /></p>
    <button className='rounded-full bg-black text-white px-3 five:px-6 py-2 five:py-4' onClick={handlePop}>Write a Review</button>
    <img src={leftArrow} alt="pre" className='ml-[10px]' onClick={handlePrev}  />
    <img src={rightArrow} alt="next" onClick={handleNext} />
  </div>
</div>

<div className="review-message flex justify-center overflow-hidden relative">
{data.slice(currentIndex, currentIndex + visibileCard).map((item) => (
            <div
              key={item.id}
              style={{
                transform:`translateX(${currentIndex*1}%)`
              }}
              className="p-4 overflow-hidden max-w-[300px] border-2 border-gray-300 rounded-md m-4 transition-transform duration-300"
            >
              <div className="w-[95%] mx-auto">
                <img src={item.star} alt="star" />
                <p className="inline mr-2 font-bold">{item.name}</p>
                <img className="inline" src={item.batch} alt="greenLogo" />
                <p>{item.comment.join("\n")}</p>
              </div>
            </div>
          ))}
</div>
</div>
</>
)
}

export const FAQ=()=>{
  return(
<>
<Accordion allowMultiple>
<AccordionItem>
  <h2>
    <AccordionButton>
    <Box as='span' flex='1' textAlign='left'>
          Is there payment system available?
        </Box>
        <AccordionIcon />
    </AccordionButton>
  </h2>
  <AccordionPanel pb={4}>

There is no any payment system available at the movement as well as you can't write review currently.
  </AccordionPanel>
</AccordionItem>
<AccordionItem>
  <h2>
    <AccordionButton>
    <Box as='span' flex='1' textAlign='left'>
          Can i got the high quality product from here?
        </Box>
        <AccordionIcon />
    </AccordionButton>
  </h2>
  <AccordionPanel pb={4}>

Yes, here we have put all the high quality product which is durable and afortable .
  </AccordionPanel>
</AccordionItem>
<AccordionItem>
  <h2>
    <AccordionButton>
    <Box as='span' flex='1' textAlign='left'>
        Is there a discount for the first order user?
        </Box>
        <AccordionIcon />
    </AccordionButton>
  </h2>
  <AccordionPanel pb={4}>

You can use the coupoun "MYFIRSTORDER" for the super duper 20% discount.
  </AccordionPanel>
</AccordionItem>
</Accordion>
</>
  )
}

const Review = () => {
  return (
    <div className='pt-[2rem] w-[95%] nine:w-[90%] mx-auto'>
     <Tabs isLazy>
      <TabList>
        <Tab>Product Details</Tab>
        <Tab>Rating & Reviews</Tab>
        <Tab>FAQs</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Currently this section is unavailable at the movement, look for other tabs if you want.</p>
        </TabPanel>
        <TabPanel>
          <RatingAndReviews/>
        </TabPanel>
        <TabPanel>
          <FAQ/>
        </TabPanel>
      </TabPanels>

     </Tabs>
     <div>
      <h1 className='font-bold text-black flex justify-center text-xl eight:text-4xl'>YOU MIGHT ALSO LIKE</h1>
      <div className='mt-[10px]'>
        <RandomClothes/>
      </div>
     </div>
    </div>
  )
}

export default Review
