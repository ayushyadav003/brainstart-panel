import { useState } from 'react'
import './classes.scss'
import AddPopup from '../../../components/addPopup/AddPopup'
import { Add, KeyboardDoubleArrowRight } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Filter from '../../../components/filter/Filter'

const classes = [
  { title: '1st', totalStudents: '20', batches: '04', bg: '#ce796b' },
  { title: '2nd', totalStudents: '20', batches: '04', bg: '#7a6038' },
  { title: '3rd', totalStudents: '20', batches: '04', bg: '#7e4b34' },
  { title: '4th', totalStudents: '20', batches: '04', bg: '#ce796b' },
  { title: '5th', totalStudents: '20', batches: '04', bg: '#7a6038' },
  { title: '6th', totalStudents: '20', batches: '04', bg: '#7e4b34' },
]

function Classes() {
  const [addClass, setAddClass] = useState(false)
  const [filter, setFilter] = useState({ search: '' })
  const navigate = useNavigate()

  return (
    <div className="classContainer">
      <Filter
        showBack={false}
        heading="All Classes"
        type="classes"
        filter={filter}
        setFilter={setFilter}
      />
      <div className="cardsWrapper">
        <div className="cardWrapper addCard" onClick={() => setAddClass(true)}>
          <Add fontSize="large" />
        </div>
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
              onClick={() => navigate(`${classInfo.title}/batches`)}
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
