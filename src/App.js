import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Auth from './components/Auth'
import CreateRecipe from './components/CreateRecipe'
import SavedRecipe from './components/SavedRecipe'
import Navbar from './components/Navbar'


function App() {
  return (
   <BrowserRouter>
   <Navbar/>
   <Routes>
   <Route path='/' element={<Home/>} />
   <Route path='/auth' element={<Auth/>} />
   <Route path='/create' element={<CreateRecipe/>} />
   <Route path='/saved' element={<SavedRecipe/>} />

   </Routes>
   </BrowserRouter>
  )
}

export default App
