import Sidebar from '../../components/sidebar/Sidebar'
import '../layout.scss'

export default function TeacherLayout(children) {
  return (
    <div className="dashboardLayout">
      <div className="dashboard">
        <Sidebar />
        <div className={'dashboardBody'}>{children}</div>
      </div>
    </div>
  )
}
