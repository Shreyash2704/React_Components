import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './Pages/Homepage'
import ResponsivePage from './Pages/ResponsivePage'
import ProductPage from './Pages/ProductPage'
import TodoList from './Pages/TodoList'
import ErrorBoundary from './components/ErrorBoundary'
import StopWatch from './Pages/StopWatch'
import CardFlipper from './Pages/CardFlipper'



function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<>Hello</>} />
          <Route path="/resposive" element={<ResponsivePage />} />
          <Route path='/product' element={
            <ErrorBoundary> <ProductPage /></ErrorBoundary>
            
            } />
          <Route path="/stopWatch" element={<StopWatch />}/>
          <Route path='/card-flipper' element={<CardFlipper />} />
          <Route path="/todo-list" element={<TodoList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
