import './App.css'
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import { BrowserRouter } from 'react-router-dom';
import PagesRouter from './Routes/Pages.Router';


function App() {

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
