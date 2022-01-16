import Footer from './components/Footer'
import Header from './components/Header'
import React from 'react'
import Home from './screens/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Gallery from './screens/Gallery'
const App = () => {
  return (
    <>
      <Router>

        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/gallery' element={<Gallery />} />
        </Routes>

        <Footer />
      </Router>

    </>
  )
}

export default App
