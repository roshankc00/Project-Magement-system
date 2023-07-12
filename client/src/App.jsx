import React from 'react'
import Header from './components/Navbar'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Client from './pages/Client'
import Project from './pages/Projects'
import NotFound from './pages/NotFound'

const App = () => {
  return (

    <div>
      <Routes>
        <Route path='/'element={<Header/>}>
        <Route path='/client'element={<Client/>}/>
        <Route path='/'element={<Project/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>

    </div>
  )
}

export default App 