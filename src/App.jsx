import React, { useState, useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from "./Pages/Home/Home"
import Video from "./Pages/Video/Video"
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Components/Login/Login'
import axios from 'axios'
import { host } from './data'
import AuthLayout from './Components/AuthLayout'

const App = () => {
  const [user, setUser] = useState({})
  const [sidebar, setSidebar] = useState(true);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('')
  const [sortType, setSortType] = useState('asscending')

  


  return (
    <div>
      <Navbar setSidebar={setSidebar} user={user} setQuery={setQuery}/>
      <Routes>
        <Route path='/' element={<Home user={user} sidebar={sidebar} query={query} setQuery={setQuery} sortBy={sortBy} sortType={sortType}/>} />
        <Route path='/video/:videoId' element={
          <AuthLayout authentication>

            <Video query={query} />
          </AuthLayout>
        } />
        <Route path='/login' element={
          <AuthLayout authentication={false}>
            <Login user={user} setUser={setUser} />
          </AuthLayout>
        } />
      </Routes>
    </div>
  )
}

export default App