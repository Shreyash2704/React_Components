// @ts-nocheck
import React, { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux';

type Props = {}

const ReducerEx = (props: Props) => {
    // const intialState = 0
    // function reducer(state:any,action:any){
    //     switch (action){
    //         case "inc":
    //             return state+1 
    //         case "dec":
    //             return state-1
             
    //     }
    // }

    // const [value,dispatch] = useReducer(reducer,intialState)
    const value = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>ReducerEx
        <p>Value = {value}</p>
        <button onClick={()=> dispatch({type:"inc"})}>Increment</button>
        <button onClick={()=> dispatch({type:"dec"})}>decrement</button>
    </div>

  )
}

export default ReducerEx