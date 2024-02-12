import './dashboard.scss'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

const classes = [
  { title: '10th', totalStudents: '20', batches: '4', bg: '#7a6038' },
  { title: '11th', totalStudents: '20', batches: '4', bg: '#7e4b34' },
  { title: '12th', totalStudents: '20', batches: '4', bg: '#ce796b' },
]

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Students Growth',
    },
  },
  scales: {
    y: {
      min: 0,
      max: 50,
    },
  },
}
const data = {
  labels,
  datasets: [
    {
      label: 'Total students',
      data: [10, 20, 30, 40],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

function Dashboard() {
  return (
    <div className="dashboardContainer">
      <div className="inner1">
        <div className="detailsWrapper">
          {classes.map((classInfo, i) => (
            <div
              key={i}
              className="cardsWrapper"
              style={{ background: classInfo.bg }}
            >
              <p className="mainTitle"> {classInfo.title}</p>
              <div className="innerInfo">
                <div>
                  <div>
                    <span className="title">Total students:</span>
                    <span className="titleInfo">{classInfo.totalStudents}</span>
                  </div>
                  <div>
                    <span className="title">Total Batches:</span>
                    <span className="titleInfo">{classInfo.batches}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="chartWrapper">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
