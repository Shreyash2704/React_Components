import React, { useEffect, useRef, useState } from 'react'
import './style.css'

type Props = {}

const CustomInfiniteScroller = (props: Props) => {
    const [data, setdata] = useState<string[]>([])
    const loadmoreRef = useRef(null)
    const [hasMore, sethasMore] = useState(true)
    const [page, setpage] = useState(0)
    const [apifetching, setapifetching] = useState(false)

    const fetchdata = async(pageSize:number,page:number) =>{
        setapifetching(true)
        const startIndex = pageSize*page
        console.log("page",page,pageSize)
        const response = await fetch(`https://dummyjson.com/users?limit=${pageSize}&skip=${startIndex}`)
        const data = await response.json();
        setdata(prev =>{
            const new_data = data.users.map((ele:any) => `${ele.id}-${ele.email}`)
            return [...prev,...new_data]
        })
        if(data.length > 80){
            // sethasMore(false)
        }
        setapifetching(false)
    }

    useEffect(() => {
     const observer = new IntersectionObserver((entries)=>{
        const target = entries[0]
        if(target.isIntersecting){
             console.log("element seen on scrren")
             console.log("element page",page)

            setpage(prev => {
                console.log("element page =>",prev)
                return prev+1
            })
        }
     })
     if(loadmoreRef.current){
        observer.observe(loadmoreRef.current)
     }
     return () => {
        if(loadmoreRef.current){
        observer.unobserve(loadmoreRef.current)
        }
    }
    }, [])

    useEffect(() => {
        if(page == -1) return
        fetchdata(5,page)
    }, [page])
    
    
  return (
    <div>
        <div className='OuterComponent'>
            {data.map(ele =>{
                return (
                    <p className='list-item'>{ele}</p>
                )
                
            })}
            {hasMore && <p ref={loadmoreRef}>loading...</p>}
        </div>
    </div>
  )
}

export default CustomInfiniteScroller