import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import home from "../../assets/home.png"
import game_icon from "../../assets/game_icon.png"
import automobiles from "../../assets/automobiles.png"
import sports from "../../assets/sports.png"
import entertainment from "../../assets/entertainment.png"
import tech from "../../assets/tech.png"
import blogs from "../../assets/blogs.png"
import music from "../../assets/music.png"
import news from "../../assets/news.png"
import jack from "../../assets/jack.png"
import simon from "../../assets/simon.png"
import tom from "../../assets/tom.png"
import megan from "../../assets/megan.png"
import cameron from "../../assets/cameron.png"
import { host } from '../../data'
import axios from 'axios'

const Sidebar = ({ sidebar, query, setQuery, user }) => {
  const [subscribedList, setSubscribedList] = useState([])

  const fetchSubscribedList = async () => {
    const subscribedList_url = `${host}/subscription/u/${user._id}`
    try {
      const res = (await axios.get(subscribedList_url)).data
      if (res.success) {
        const data = res.data
        setSubscribedList(data[0])
      }
    } catch (error) {
      console.log("error while fetching subscribed list.", user)
    }
  }

  useEffect(() => {
    fetchSubscribedList()
  }, [user])


  return (
    <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
      <div className="sortcut-links" >
        <div className={`side-link ${query === '' ? "active" : ""}`} onClick={() => { setQuery('') }}>
          <img src={home} alt="" />
          <p>Home</p>
        </div>
        <div className={`side-link ${query === 'game' ? "active" : ""}`} onClick={() => { setQuery('game') }}>
          <img src={game_icon} alt="" />
          <p>Gaming</p>
        </div>
        <div className={`side-link ${query === 'automobile' ? "active" : ""}`} onClick={() => { setQuery('automobile') }}>
          <img src={automobiles} alt="" />
          <p>Automobiles</p>
        </div>
        <div className={`side-link ${query === 'sport' ? "active" : ""}`} onClick={() => { setQuery('sport') }}>
          <img src={sports} alt="" />
          <p>Sports</p>
        </div>
        <div className={`side-link ${query === 'entertain' ? "active" : ""}`} onClick={() => { setQuery('entertain') }}>
          <img src={entertainment} alt="" />
          <p>Entertainment</p>
        </div>
        <div className={`side-link ${query === 'techno' ? "active" : ""}`} onClick={() => { setQuery('techno') }}>
          <img src={tech} alt="" />
          <p>Technology</p>
        </div>
        <div className={`side-link ${query === 'music' ? "active" : ""}`} onClick={() => { setQuery('music') }}>
          <img src={music} alt="" />
          <p>Music</p>
        </div>
        <div className={`side-link ${query === 'blog' ? "active" : ""}`} onClick={() => { setQuery('blog') }}>
          <img src={blogs} alt="" />
          <p>Blogs</p>
        </div>
        <div className={`side-link ${query === 'news' ? "active" : ""}`} onClick={() => { setQuery('news') }}>
          <img src={news} alt="" />
          <p>News</p>
        </div>
        <hr />
      </div>

      <div className="subscribed-list">
        <h3>Subscribed : {subscribedList.totalSubscribedChannel}</h3>
        {console.log(subscribedList)}
        {subscribedList.subscribedChannels?.map((subscribed, index) => {
          console.log(subscribed)
          return (
            <div key={index} className="side-link">
              <img src={subscribed.channel?.avatar} alt="" />
              <p>{subscribed.channel?.username}</p>
            </div>

          )
        })}

      </div>

    </div>
  )
}

export default Sidebar
