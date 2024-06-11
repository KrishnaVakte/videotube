import React, { useState } from 'react'
import { IoMdNotificationsOutline } from './icons.js'
import { useSelector, useDispatch } from 'react-redux';
import Spinner from './Spinner.jsx';
import { useNavigate } from 'react-router-dom';
import { deleteNotification } from '../store/Slices/authSlice.js';

const Notifications = () => {
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false)
  const notifications = useSelector((state) => state.auth?.notifications);
  const notificationsLoading = useSelector((state) => state.auth?.notificationsLoading);
  const navigate = useNavigate();

  const handleNotificationClick = (notification) => {
    dispatch(deleteNotification(notification._id));
    navigate(`/channel/${notification.channelname}/videos`);
  }

  if (notificationsLoading) {
    return <Spinner/>
  }

  return (
    <>
    <div className="relative cursor-pointer" onClick={() => setShowNotifications((prev) => !prev)}>
      <IoMdNotificationsOutline size={25} className="text-white" />
      {notifications.length > 0 && (
        <div className="absolute top-0 right-0 flex items-center justify-center w-3 h-3 bg-red1 text-white text-xs rounded-full">
          {notifications.length}
        </div>
      )}
      {showNotifications && (
        <div className="absolute top-12 right-0 w-80 bg-richblack-700 text-white rounded-lg shadow-lg overflow-hidden z-50">
          <div className="p-4 border-b border-richblack-500 font-semibold text-lg">
            Notifications
          </div>
          {notifications.length > 0 ? (
            <ul className="list-none p-2 max-h-64 overflow-auto">
              {notifications.map((notification) => (
                <li
                  key={notification._id}
                  className="flex items-center py-2 px-4 hover:bg-richblack-600 border-b border-richblack-500"
                  onClick={()=>{handleNotificationClick(notification)}}
                >
                  <img
                    src={notification.channelAvatar}
                    alt={`${notification.channelname} avatar`}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div className="flex-1">
                    <span className="font-bold">{notification.channelname}</span>
                    <p className="text-sm text-richblack-400">uploaded: {notification.videoTitle}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-richblack-400">No new notifications</div>
          )}
        </div>
      )}
    </div>
    </>
  )
}

export default Notifications
