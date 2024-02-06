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
  { title: 'Dashboard', icon: <Dashboard />, link: '/a/dashboard' },
  { title: 'Classes', icon: <LibraryBooks />, link: '/a/classes' },
  { title: 'Meetings', icon: <VideoCall />, link: '/a/meetings' },
  { title: 'Students', icon: <School />, link: '/a/students' },
  { title: 'Notes', icon: <Description />, link: '/a/notes' },
  { title: 'Attendance', icon: <Ballot />, link: '/a/attendance' },
  { title: 'Accounts', icon: <PointOfSale />, link: '/a/accounts' },
  { title: 'Support', icon: <SupportAgent />, link: '/a/support' },
  { title: 'Notice', icon: <NotificationsActive />, link: '/a/notice' },
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
            <Link href={option.link} key={i}>
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
