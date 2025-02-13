import React from 'react'
import Nav from '../component/Nav'
import causal from '../images/casual.png'
import formal from '../images/formal.png'
import party from '../images/party.png'
import gym from '../images/gym.png'
import Footer from '../component/Footer'
import { useNavigate } from 'react-router'

export const BrandsGrid=()=>{
  const navigate=useNavigate()

  return(
    <>
    <div className='mt-2 pt-4 bg-gray-200 rounded-xl  w-[90%] mx-auto'>
      <h1 className='text-black text-xl four:text-2xl nine:text-4xl flex justify-center font-bold'>BROWSE BY DRESS STYLE</h1>
      <div className='brand-grid mt-6  w-[95%] mx-auto pb-4'>
        <div className="item" onClick={()=>navigate('/categorypage?name=Causal')}>
          <img src={causal} alt="causal" className='h-full w-full' />
        </div>

        <div className="item">
          <img src={formal} onClick={()=>navigate('/gym')} alt="formal" className='h-full w-full'/>
        </div>

        <div className="item">
          <img src={party} onClick={()=>navigate('/gym')} alt="party" className='h-full w-full'/>
        </div>

        <div className="item">
          <img src={gym} onClick={()=>navigate('/gym')} alt="gym" className='h-full w-full'/>
        </div>

      </div>
    </div>
    </>
  )
}

const Brands = () => {
  return (
    <div >
        <Nav/>
        <div className='mt-6 pt-[100px] four:pt-[90px] nine:pt-[80px]'>
<BrandsGrid/>
          </div>
          <Footer/>
    </div>
  )
}

export default Brands
