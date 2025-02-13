import { useStatStyles } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';

const RandomClothes = () => {
    const [data,setData]=useState([]);
    const [newData,setNewData]=useState([]);
    const[visibleCard,setVisibleCard]=useState(1);
    const location=useLocation();
    const itemId=location.state?.item?.id;
    const navigate=useNavigate();

    const handleNavigate=(path,item)=>{
        navigate(path,{state:{item}})
    }
   

    useEffect(()=>{
        fetch('/newArrival.json')
        .then((res)=>res.json())
        .then((resdata)=>setData(resdata))

        const handleVisible=()=>{
            const width=window.innerWidth;
            if (width >= 1350) { 
                setVisibleCard(4);
              } else if (width >= 995) {
                setVisibleCard(3);
              } else if (width >=670){  
                setVisibleCard(2);
              }
              else{
                setVisibleCard(1);
              }
        }
        handleVisible();
        window.addEventListener('resize',handleVisible)
        return ()=>window.removeEventListener('resize',handleVisible);
    },[])

    useEffect(()=>{
        const handleNewData=()=>{
        
const newData=data.filter(item=>item.id!==itemId);
setNewData(newData);
        }
        handleNewData();
    },[data,itemId])
  return (
    <div className='flex gap-4 pt-[15px]'>
        {
            newData.slice(0,visibleCard).map((item)=>(
                <>
                <div key={item.id} onClick={()=>handleNavigate('',item)} className='max-w-[250px] mx-auto'>
                <img src={item.image} alt={item.name} />
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
                    <p>{item.originalPrice}</p>
                  </div>
                )}
              </div>
                </>
            ))
        }
      
    </div>
  )
}

export default RandomClothes
