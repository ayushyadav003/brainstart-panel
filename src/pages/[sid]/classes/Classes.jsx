import { useEffect, useState } from 'react'
import './classes.scss'
import AddPopup from '../../../components/addPopup/AddPopup'
import { Add, KeyboardDoubleArrowRight } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Filter from '../../../components/filter/Filter'
import { apiConfig } from '../../../services/ApiConfig'
import { useSelector } from 'react-redux'
import { ApiWithToken } from '../../../services/ApiWithToken'
import { toast } from 'react-toastify'

const classes = ['#ce796b', '#7a6038', '#7e4b34']

function Classes() {
  const [addClass, setAddClass] = useState(false)
  const [filter, setFilter] = useState({ search: '' })
  const [allClasses, setAllClasses] = useState([])
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)

  const addNewClass = async (classData) => {
    console.log(classData)

    try {
      const apiOPtions = {
        method: 'POST',
        url: apiConfig.class,
        data: {
          title: classData.title,
          institute: currentUser?._id,
          teacherId: localStorage.getItem('userId') || 'admin',
        },
      }
      const response = await ApiWithToken(apiOPtions)
      if (response?.statusCode === 201) {
        toast.success(response?.message)
        setAddClass(false)
        getAllClasses()
      }
    } catch (error) {
      toast.warning(error?.response?.data?.message)
    }
  }

  const getAllClasses = async () => {
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
      getAllClasses()
    }
  }, [currentUser])

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
        {allClasses?.length > 0
          ? allClasses.map((classInfo, i) => {
              return (
                <div
                  key={i}
                  className="cardWrapper"
                  style={{
                    color: classes[2],
                  }}
                >
                  <p> {classInfo.title}</p>
                  <span> Total Students : 10</span>
                  <div
                    style={{
                      background: classes[2],
                    }}
                    onClick={() => navigate(`${classInfo._id}/batches`)}
                  >
                    Batches <KeyboardDoubleArrowRight />
                  </div>
                </div>
              )
            })
          : 'Please add classes'}
      </div>

      <AddPopup
        type="class"
        open={addClass}
        setOpen={setAddClass}
        onSubmit={(classData) => addNewClass(classData)}
      />
    </div>
  )
}

export default Classes
