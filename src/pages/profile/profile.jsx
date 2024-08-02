import React, {useState} from 'react'
import { Box } from '@mui/material'
import {Email, Phone} from '@mui/icons-material'

import './Profile.scss'

const Profile = () => {
  const [active, setActive] = useState({account : true, password : false, address : false, notifications : false})
  return (
    <div className="profile">
      <div className="dp">
        <img src="/account.png" />
        <p>Udhav Negi</p>
        <div className="contact">
          <p className='email' style={{display : "flex", gap : "8px"}}><span><Email></Email></span>udhavnegi960@gmail.com</p>
          <p className='phone' style={{display : "flex", gap : "3px"}}><span><Phone></Phone></span>+91-7456904822</p>
        </div>
      </div>

      <div className="actions">
        <p className={`${active.account ? "active" : ""}`} onClick={() => setActive({account : true, password : false, address : false, notifications : false})}>Account settings</p>
        <p className={`${active.password ? "active" : ""}`} onClick={() => setActive({account : false, password : true, address : false, notifications : false})}>Manage password</p>
        <p className={`${active.address ? "active" : ""}`} onClick={() => setActive({account : false, password : false, address : true, notifications : false})}>Address</p>
        <p className={`${active.notifications ? "active" : ""}`} onClick={() => setActive({account : false, password : false, address : false, notifications : true})}>Notifications</p>
      </div>

      {active.account && 
        <div className="account-setting">
          
        </div>
      
      }
    </div>
  )
}

export default Profile