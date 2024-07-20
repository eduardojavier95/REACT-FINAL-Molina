import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ItemDetailContainer from './components/ItemDetailContainer'
import { createContext, useState } from 'react'
import CheckoutForm from './components/CheckoutForm'
import { initializeCollections } from './helpers/handlerDB'
import NotFound from './components/404NotFound'
import OrderListContainer from './components/OrderListContainer'

export const MainContext = createContext()
initializeCollections()
function App() {
  const [mainContext, setMainContext] = useState({
    cart: [],
    theme: 'light',
    isOpenCart: false
  })

  return (
    <BrowserRouter>
      <MainContext.Provider value={{ mainContext, setMainContext }}>
        <NavBar />
        <div className='flex flex-col flex-auto relative z-0 mx-56 mt-8'>
          <Routes>
            <Route path='/' element={<ItemListContainer />} />
            <Route path='/products/:category' element={<ItemListContainer />} />
            <Route path='/products/detail/:id' element={<ItemDetailContainer />} />
            <Route path='/checkout' element={<CheckoutForm />} />
            <Route path='/orders' element={<OrderListContainer />} />
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </div>
        <Footer />
      </MainContext.Provider>
    </BrowserRouter>
  )
}

export default App
