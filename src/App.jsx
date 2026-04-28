import './index.css'
import Teste from './Register'
import Login from './Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Teste/>}/>

          <Route path="/" element={<Teste />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App