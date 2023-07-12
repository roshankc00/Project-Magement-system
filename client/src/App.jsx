import React from 'react'
import Header from './components/Navbar'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Client from './pages/Client'

const App = () => {
  return (

    <div>
      <Header/>
      <Routes>
        <Route path='/client'element={<Client/>}/>
      </Routes>

    </div>
  )
}

export default App