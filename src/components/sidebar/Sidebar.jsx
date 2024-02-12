import {
  Dashboard,
  LibraryBooks,
  PointOfSale,
  School,
  VideoCall,
  Description,
  Ballot,
  SupportAgent,
  NotificationsActive,
} from '@mui/icons-material/'
import './sidebar.scss'
import { Link, useLocation } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'

const sidebarOptions = [
  // { title: 'Dashboard', icon: <Dashboard />, link: '/' },
  { title: 'Classes', icon: <LibraryBooks />, link: '/classes' },
  { title: 'Schedule', icon: <VideoCall />, link: '/scheduled-classes' },
  { title: 'Students', icon: <School />, link: '/students' },
  { title: 'Notes', icon: <Description />, link: '/notes' },
  { title: 'Attendance', icon: <Ballot />, link: '/attendance' },
  { title: 'Accounts', icon: <PointOfSale />, link: '/accounts' },
  { title: 'Support', icon: <SupportAgent />, link: '/support' },
  { title: 'Notice', icon: <NotificationsActive />, link: '/notice' },
]

function Sidebar() {
  const pathname = useLocation()

  return (
    <div className="sidebarContainer">
      <div className="dp"></div>
      <div className="sidebarOptions">
        {sidebarOptions.map((option, i) => {
          return (
            <Link to={option.link} key={i}>
              <div
                className={'options'}
                style={{
                  color: option.link === pathname.pathname ? 'black' : 'gray',
                }}
              >
                <span>{option.icon}</span>
                <p>{option.title}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
