
import './App.css'
import { HomePage } from './pages/HomePage.jsx';
import { Routes, Route } from 'react-router-dom';
import { ProductWindow } from './pages/ProductWindow.jsx';


function App() {



  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductWindow />} />
      </Routes>
    </>
  )
}

export default App
