import React, { useEffect, useRef, useState } from 'react'

type Props = {}

const StopWatch = (props: Props) => {
    const [timer, settimer] = useState(0.0)
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const startTimer = () =>{
        if(!isRunning){
            setIsRunning(true)
            // @ts-ignore
            intervalRef.current = setInterval(() => {
                settimer((prev) => prev+100)
        }, 100);
        }
        
    }
    const pauseTime = () =>{
        if(intervalRef.current){
            clearInterval(intervalRef.current)
        }
        setIsRunning(false)

    }
    const resetTime = () =>{
        if(intervalRef.current){
            clearInterval(intervalRef.current)
        }
        setIsRunning(false)
        settimer(0)

    }
    const handleTimer = () =>{
        if(isRunning){
            pauseTime()
        }else{
            startTimer()
        }
    }

     useEffect(() => {
    return () => {
        if(intervalRef.current){
            clearInterval(intervalRef.current)
        }
    }
  }, []);

 const formatTime = (time:number) => {
    const minutes = String(Math.floor(time / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String((time % 1000) / 100).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  };


  return (
    <div className='flex flex-row h-screen'>
        <div className='w-150 h-[10%] m-auto border-2 border-gray-400 rounded-2xl flex flex-row p-2 gap-x-3'>
            <button className='bg-blue-400 cursor-pointer text-white text-lg rounded-xl font-medium font-normal px-3 py-1' onClick={resetTime}>Reset</button>
            <div className='p-2 border-1 border-gray-200 text-2xl font-medium text-gray-600 w-[100%] rounded-xl'>{formatTime(timer)}</div>
            <button className='bg-blue-400 cursor-pointer text-white text-lg rounded-xl font-medium font-normal px-3 py-1' onClick={handleTimer}>{isRunning ? "Stop":"Start"}</button>
        </div>
    </div>
  )
}

export default StopWatch