import React, { useState } from 'react'
import { MdFlipCameraAndroid } from 'react-icons/md'

type Props = {}

const CardFlipper = (props: Props) => {
  const [flip, setflip] = useState(false)
  return (
    <div className='h-screen flex justify-center align-middle'>
      <div className='p-2 border-1 border-gray-400 shadow-sm rounded-2xl min-h-[460px] w-[320px] m-auto'>
        <div className='text-xl text-gray-600 text-center p-2 flex'>Header Title
          <MdFlipCameraAndroid className='ml-auto cursor-pointer' onClick={() => setflip(prev => !prev)}/>
        </div>
        <img className={`${flip ? "hidden" : ""} m-auto`} src="https://images.placeholders.dev/300x400" alt="placeholder image" width={300} height={400}/>
        <div className={`${flip ? "" : "hidden"} text-md m-auto flex`}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, possimus vitae corrupti, sit tempora quod nostrum eveniet, facilis voluptate eligendi placeat repellendus enim quas libero eos expedita nulla modi tempore.
        </div>
      </div>
    </div>
  )
}

export default CardFlipper