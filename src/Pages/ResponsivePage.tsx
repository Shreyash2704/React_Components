import React, { useEffect, useRef, useState } from 'react'
import './style.css'

type Props = {}

const ResponsivePage = (props: Props) => {
    const [items, setitems] = useState<number[]>([])

    const addElement = () =>{
        setitems(prev => [...prev, items.length+1])
    }

    const boxRef = useRef(null);

    useEffect(() => {
      const observer = new ResizeObserver((entries)=>{
        console.log(entries.length)
        for(let entry of entries){
            const {width,height} = entry.contentRect
            console.log(`Box size: ${width}x${height}`)
        }
      })
      if(boxRef.current){
        observer.observe(boxRef.current)
      }
      return () => {
        observer.disconnect()
      }
      
    }, [])
    

  return (
    <div>
        <button onClick={addElement}>Add Sections</button>
        <div className="Parent" ref={boxRef}>
             <div className='ResponsiveGrid'>
                {items.map(ele => {
                    return (
                        <div className='childGrid'>{ele}</div>
                    )
                })}
            </div>
            <div className='ResponsiveFlexBox'>
                {items.map(ele => {
                    return (
                        <div className='childFlex'>{ele}</div>
                    )
                })}
            </div>
        </div>
       
    </div>
  )
}

export default ResponsivePage