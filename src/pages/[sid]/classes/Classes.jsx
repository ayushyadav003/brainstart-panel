import { useState } from 'react'
import './classes.scss'
import AddPopup from '../../../components/addPopup/AddPopup'
import { KeyboardDoubleArrowRight } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const classes = [
  { title: '1st', totalStudents: '20', batches: '04', bg: '#ce796b' },
  { title: '2nd', totalStudents: '20', batches: '04', bg: '#7a6038' },
  { title: '3rd', totalStudents: '20', batches: '04', bg: '#7e4b34' },
  { title: '4th', totalStudents: '20', batches: '04', bg: '#ce796b' },
  { title: '5th', totalStudents: '20', batches: '04', bg: '#7a6038' },
  { title: '6th', totalStudents: '20', batches: '04', bg: '#7e4b34' },
  { title: '7th', totalStudents: '20', batches: '04', bg: '#ce796b' },
  { title: '8th', totalStudents: '20', batches: '04', bg: '#7a6038' },
  { title: '9th', totalStudents: '20', batches: '04', bg: '#7e4b34' },
  { title: '10th', totalStudents: '20', batches: '04', bg: '#ce796b' },
  { title: '11th', totalStudents: '20', batches: '04', bg: '#7a6038' },
  { title: '12th', totalStudents: '20', batches: '04', bg: '#7e4b34' },
]

function Classes() {
  const [addClass, setAddClass] = useState(false)
  // const [currentScreen, setCurrentScreen] = useState('classes')
  const router = useNavigate()

  return (
    <div className="classContainer">
      <div className="header">
        <h1>Classes</h1>
      </div>
      <div className="cardsWrapper">
        {classes.map((classInfo, i) => (
          <div
            key={i}
            className="cardWrapper"
            style={{
              color: classInfo.bg,
            }}
          >
            <p> {classInfo.title}</p>
            <span> Total Students : 10</span>
            <div
              style={{
                background: classInfo.bg,
              }}
              onClick={() => router.push('classes/batches')}
            >
              Batches <KeyboardDoubleArrowRight />
            </div>
          </div>
        ))}
      </div>

      <AddPopup type="class" open={addClass} setOpen={setAddClass} />
    </div>
  )
}

export default Classes