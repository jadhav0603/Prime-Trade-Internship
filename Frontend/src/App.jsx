import './App.css'
import { Toaster } from 'react-hot-toast';
// import Login from './components/Login';
import { BrowserRouter } from 'react-router-dom';
import PagesRouter from './Routes/Pages.Router';
import { useEffect } from 'react';
import axios from 'axios'


function App() {

  useEffect(()=>{
    const warmUp = async () => {
      const response = await axios.get("https://prime-trade-internship-1.onrender.com/warmup")
      console.log(response.data)
    }

    warmUp()
  },[])

  return (
    <>
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <PagesRouter />
    </BrowserRouter>
    </>
  )
}

export default App
