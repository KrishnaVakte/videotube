import React, { useState, useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from "./Pages/Home/Home"
import Video from "./Pages/Video/Video"
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Components/Login/Login'
import axios from 'axios'
import { host } from './data'

const App = () => {
  const [user, setUser] = useState({})
  const [sidebar, setSidebar] = useState(true);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('')
  const [sortType, setSortType] = useState('asscending')

  

  useEffect(() => {
    try {
        axios.get(`${host}/user/current-user`)
            .then(res => {
                if (res.data.success) {
                    setUser(res.data.data)
                    // navigate('/')
                }
            }).catch(err => {
            console.log(err.message)
        })
    } catch (error) {
        console.log("No access token")
    }
},[])

  return (
    <div>
      <Navbar setSidebar={setSidebar} user={user} setQuery={setQuery}/>
      <Routes>
        <Route path='/' element={<Home user={user} sidebar={sidebar} query={query} setQuery={setQuery} sortBy={sortBy} sortType={sortType}/>} />
        <Route path='/video/:videoId' element={<Video query={query}/>} />
        <Route path='/login' element={<Login user={user} setUser={setUser} />} />
      </Routes>
    </div>
  )
}

export default App