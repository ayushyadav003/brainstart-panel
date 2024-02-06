import Sidebar from '../components/sidebar/Sidebar'
import './layout.scss'

// eslint-disable-next-line react/prop-types
export default function TeacherLayout({ children }) {
  return (
    <div className="dashboardLayout">
      <div className="dashboard">
        <Sidebar />
        <div className={'dashboardBody'}>{children}</div>
      </div>
    </div>
  )
}
