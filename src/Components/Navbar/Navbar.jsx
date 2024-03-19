import React, { useState } from 'react'
import "./Navbar.css"
import menu_icon from "../../assets/menu.png"
import logo from "../../assets/logo.png"
import search_icon from '../../assets/search.png'
import upload_icon from "../../assets/upload.png"
import notification_icon from "../../assets/notification.png"
import more_icon from "../../assets/more.png"
import profile_icon from "../../assets/jack.png"
import { Link } from 'react-router-dom'

const Navbar = ({ setSidebar, user, setQuery }) => {
    const [searchText, setSearchText] = useState('')
    const searchQuery =  ()=> {
        setQuery(searchText);
        console.log(searchText)
    }

    return (
        <nav className='flex-div'>
            <div className="flex-div nav-left">
                <img className='menu-icon' src={menu_icon} onClick={()=>setSidebar(prev=>!prev)} alt="" />
                <Link to={"/"}><img className='logo' src={logo} alt="" /></Link>
            </div>

            <div className="flex-div nav-middle">
                <div className="search-box flex-div">
                    <input type="text" placeholder='Search' value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
                    <img src={search_icon} alt="" onClick={searchQuery}/>
                </div>
            </div>

            <div className="flex-div nav-right">
                <img src={upload_icon} alt="" />
                <img src={more_icon} alt="" />
                <img src={notification_icon} alt="" />
                {!user.username? <button>Login</button>:<img src={user.avatar || profile_icon} className='user-icon' alt="" />}
            </div>
        </nav>
    )
}

export default Navbar
