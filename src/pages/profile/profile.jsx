import { Box } from '@mui/material'
import {Email, Phone} from '@mui/icons-material'
import React from 'react'

import './Profile.scss'

const Profile = () => {
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
        <p>Account settings</p>
        <p>Manage password</p>
        <p>Address</p>
        <p>Notifications</p>
      </div>
    </div>
  )
}

export default Profile