import React, { useEffect, useState } from 'react'
import "./Home.css"
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'
import { useNavigate } from 'react-router-dom'

const Home = ({ sidebar, query, setQuery, sortBy, sortType, user }) => {
  const navigate = useNavigate();

  return (
    <>
      <Sidebar sidebar={sidebar} query={query} setQuery={setQuery} user={user} />
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <Feed query={query} sortBy={sortBy} sortType={sortType}/>
      </div>
    </>
  )
}

export default Home
