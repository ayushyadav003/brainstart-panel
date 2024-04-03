// import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import Filter from '../../components/filter/Filter'
import './scheduledClasses.scss'
import { Add } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import AddPopup from '../../components/addPopup/AddPopup'
import { toast } from 'react-toastify'
import { apiConfig } from '../../services/ApiConfig'
import { ApiWithToken } from '../../services/ApiWithToken'
import { useSelector } from 'react-redux'

export default function ScheduledClass() {
  const [addMeeting, setAddMeeting] = useState(false)
  const { currentUser } = useSelector((state) => state.user)
  const [filter, setFilter]  = useState({class:null, batch:null, search:''})

  const addNewClass = async (classData) => {
    console.log(classData)

    try {
      const apiOPtions = {
        method: 'POST',
        url: apiConfig?.class,
        data: { title: classData.title, institute: currentUser?._id },
      }
      const response = await ApiWithToken(apiOPtions)
      if (response?.statusCode === 201) {
        toast.success(response?.message)
        setAddMeeting(false)
        getAllClasses()
      }
    } catch (error) {
      toast.warning(error?.response?.data?.message)
    }
  }

  const getAllMeetings = async () => {
    try {
      const apiOPtions = {
        method: 'GET',
        url: apiConfig.class,
        params: { institute: currentUser?._id },
      }
      const response = await ApiWithToken(apiOPtions)

      if (response?.statusCode === 200) {
        console.log(response)
        setAllClasses(response?.classes)
      }
    } catch (error) {
      toast.warning(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    if (currentUser?._id) {
      getAllMeetings()
    }
  }, [currentUser])
  return (
    <div className="scheduleContainer">
      <Filter type="schedule" heading="Classes Scheduled"         showBack={false}
        showClass={true}
        showBatch={true}
        filter={filter}
        setFilter={setFilter} />
      <div className="Scheduletable">
        <div className="card addCard" onClick={() => setAddMeeting(true)}>
          <Add fontSize="large" />
        </div>
        {[...Array(10)].map((data, i) => (
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
      <AddPopup
        type="meetin"
        open={addMeeting}
        setOpen={setAddMeeting}
        onSubmit={(meetingData) => addNewClass(meetingData)}
      />
    </div>
  )
}
