import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Marketing from './pages/Marketing'
import Branding from './pages/Branding'
import Compliance from './pages/Compliance'
import Community from './pages/Community'
import Venture from './pages/Venture'
import Footer from './components/Footer'
import Home from './components/Home'
import Funding from './pages/Funding'
import MarketPlace from './pages/MarketPlace'
import DomainDetailsLayout from './pages/DetailsPage'
import ReserveDomainPage from './pages/ReserveDomain'
import Success from './pages/Success'
import ReserveDomainForm from './components/Form'


const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/marketing' element={<Marketing/>}/>
    <Route path='/branding' element={<Branding/>}/>
    <Route path='/compliance' element={<Compliance/>}/>
    <Route path='/funding' element={<Funding/>}/>
    <Route path='/community' element={<Community/>}/>
    <Route path='/venture' element={<Venture/>}/>
    {/* joint venture apply button */}
    <Route path="/apply" element={<ReserveDomainForm/>}/>
    {/*  */}
          <Route path="/marketplace" element={<MarketPlace />} />
          
      <Route path="/marketplace/:slug" element={<DomainDetailsLayout />} />
      <Route path="/marketplace/:slug/payment" element={<ReserveDomainPage />} />
      <Route path="/marketplace/:slug/payment/success" element={<Success />} />
   </Routes>

   </BrowserRouter> 
  )


}

export default App
