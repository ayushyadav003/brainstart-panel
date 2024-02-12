// import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import Filter from '../../components/filter/Filter'
import './scheduledClasses.scss'

export default function ScheduledClass() {
  return (
    <div className="scheduleContainer">
      <Filter type="schedule" heading="Classes Scheduled" />
      {/* <div className="icons">
        <span>
          <Add fontSize="large" />
        </span>
      </div> */}

      <div className="Scheduletable">
        {[...Array(7)].map((data, i) => (
          <div key={i} className="card">
            <div>
              <p>12th</p>
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/zoom.png"
                alt="zoom"
              />
            </div>
            <p>Science</p>
            <div>Remote - 4pm - 6pm</div>
            <Button variant="contained">Join</Button>
          </div>
        ))}
      </div>
    </div>
  )
}
