import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SinglePage from './pages/SinglePage'


function App() {

  return (
    <>
    <Routes>  
      <Route path='/' element={<Home/>}/>
      <Route path='/details' element={<SinglePage/>}/>
         </Routes>
 
    </>
  )
}

export default App
