import React from 'react'
import './Profile.scss'

const profile = () => {
  return (
    <div className='profile'>
      <div className="dp">
          <img src="/account.png" />
          <p>Udhav Negi</p>
          <div className="contacts">
            <p>udhavnegi960@gmail.com</p>
            <p>+91 - 7456904822</p>
          </div>
      </div>

      <div className="profileFields">
        <div className="name greyed">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" placeholder='Udhav Negi'/>
        </div>

        <div className="gender light">
          <label htmlFor="gender">Gender</label>
          <input id="gender" type="text" placeholder='Male'/>
        </div>

        <div className="email greyed">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" placeholder='udhavnegi960@gmail.com'/>
        </div>

        <div className="email light">
          <label htmlFor="email">Mobile</label>
          <input id="email" type="text" placeholder='+91-7456904822'/>
        </div>
      </div>

    </div>
  )
}

export default profile