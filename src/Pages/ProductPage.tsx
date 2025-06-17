import React, { useEffect, useState } from 'react'
import { useThrottling } from '../hooks/hooks'

type Props = {}


const ProductPage = (props: Props) => {
    const [data, setdata] = useState<any[]>([])
    const [searchInput, setsearchInput] = useState("")
    const throttleSearch = useThrottling(searchInput,1000)
    const controller = new AbortController()

    const searchdata = async(str:string) =>{
        const response = await fetch(`https://dummyjson.com/products/search?q=${str}`)
        const data = await response.json()
        setdata(data.products)
    }

    useEffect(() => {
      searchdata(throttleSearch)
    }, [throttleSearch])
    
  return (
    <div>
        <input type="text" value={searchInput} 
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder='search' onChange={(e)=> setsearchInput(e.target.value)}/>
        <div className='Products'>
            {data.map(product =>{
                return(
                    <div className='bg-white shadow p-4 rounded flex flex-col h-full'>
                        <img src={product.images[0]} className='h-48 w-full object-cover mb-2 rounded' />
                        <h3 className="text-lg font-semibold">{product.label}</h3>
                        <p className="text-gray-500 ">{product.description}</p>
                        <div className="mt-auto text-right font-bold text-green-600">${product.price}</div>
                    </div>
                )
            })}
            
        </div>
    </div>
  )
}

export default ProductPage