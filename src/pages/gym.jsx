import React from 'react'
import Nav from '../component/Nav';
import construction from "../images/image.png"

const Gym = () => {
  return (
    <div>
      <Nav/>
      <div className="mt-[100px]">
        <img src={construction} alt="construction" className='w-full h-[83vh] object-cover' />
      </div>
    </div>
  )
}

export default Gym
