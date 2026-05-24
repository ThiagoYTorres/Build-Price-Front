import './index.css'
import Teste from './pages/Register'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Projects from './pages/Projects';
import Budget from './pages/Budget';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Teste/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/budget/:budgetId' element={<Budget/>}/>
          <Route path="/" element={<Teste />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App