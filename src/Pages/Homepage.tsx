import React, { useRef } from 'react'
import 'react-virtualized/styles.css';
import InfiniteScroller from '../components/InfiniteScroller';
import CustomInfiniteScroller from '../components/CustomInfiniteScroller';
import ReducerEx from '../components/ReducerEx';
import { Provider } from 'react-redux';
import {counterStore} from '../store/store'

type Props = {}

const Homepage = (props: Props) => {
    const ref = useRef<null | HTMLDivElement>(null)
    const list = Array.from({ length: 1000 }, (_, i) => `Item ${i}`);

     const rowRenderer = ({ index, key, style }:any) => (
    <div key={key} style={style}>
      {list[index]}
    </div>
  );


    const handleMouseOver = () =>{
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect()
            console.log('Mouse over at:', rect)
        }
    }
        
    
  return (
    <div>
        <div ref={ref} onMouseOver={handleMouseOver} className='text-3xl font-bold underline'>Hello</div>
        <div style={{ height: '500px', width: '300px' }}>
         
        {/* <InfiniteScroller /> */}
        <CustomInfiniteScroller />
        <Provider store={counterStore}>
            <ReducerEx />
        </Provider>
        
        </div>
    </div>
  )
}

export default Homepage