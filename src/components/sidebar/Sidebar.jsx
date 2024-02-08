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

const sidebarOptions = [
  { title: 'Dashboard', icon: <Dashboard />, link: '/' },
  { title: 'Classes', icon: <LibraryBooks />, link: 'classes' },
  { title: 'Meetings', icon: <VideoCall />, link: 'meetings' },
  { title: 'Students', icon: <School />, link: 'students' },
  { title: 'Notes', icon: <Description />, link: 'notes' },
  { title: 'Attendance', icon: <Ballot />, link: 'attendance' },
  { title: 'Accounts', icon: <PointOfSale />, link: 'accounts' },
  { title: 'Support', icon: <SupportAgent />, link: 'support' },
  { title: 'Notice', icon: <NotificationsActive />, link: 'notice' },
]

function Sidebar() {
  const pathname = useLocation()

  console.log('pathname')

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
                  color:
                    option.title.toLowerCase() === pathname
                      ? '#fff'
                      : 'lightgray',
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
