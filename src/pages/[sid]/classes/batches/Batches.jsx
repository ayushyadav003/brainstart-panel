import { useEffect, useState } from 'react'
import '../classes.scss'
import AddPopup from '../../../../components/addPopup/AddPopup'
import { Add, KeyboardDoubleArrowRight } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import Filter from '../../../../components/filter/Filter'
import { apiConfig } from '../../../../services/ApiConfig'
import { toast } from 'react-toastify'
import { ApiWithToken } from '../../../../services/ApiWithToken'
import { useSelector } from 'react-redux'
// import { Divider } from '@mui/material'

function Batches() {
  const [addBatch, setAddBatch] = useState(false)
  const [allBatches, setAllBatches] = useState([])
  const [filter, setFilter] = useState({ search: '' })
  const router = useNavigate()
  const searchParams = useParams()

  const { currentUser } = useSelector((state) => state.user)

  const addNewBatch = async (classData) => {
    console.log(classData)

    try {
      const apiOPtions = {
        method: 'POST',
        url: apiConfig.batch,
        data: {
          title: classData.title,
          fees: classData.fees,
          classId: searchParams.id,
          institute: currentUser?._id,
        },
      }
      const response = await ApiWithToken(apiOPtions)
      if (response?.statusCode === 201) {
        toast.success(response?.message)
        setAllBatches(false)
        setAddBatch(false)
        getAllBatches(currentUser?._id)
      }
    } catch (error) {
      toast.warning(error?.response?.data?.message)
    }
  }

  const getAllBatches = async (institute, classId) => {
    try {
      const apiOPtions = {
        method: 'GET',
        url: apiConfig.batch,
        params: { institute, classId },
      }
      const response = await ApiWithToken(apiOPtions)

      if (response?.statusCode === 200) {
        console.log(response)
        setAllBatches(response?.batches)
      }
    } catch (error) {
      // toast.warning(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    if (currentUser?._id && searchParams.id) {
      getAllBatches(currentUser?._id, searchParams.id)
    }
  }, [currentUser])

  return (
    <div className="classContainer">
      <Filter
        showBack={true}
        heading="All Batches"
        type="batches"
        filter={filter}
        setFilter={setFilter}
      />
      <div className="cardsWrapper">
        <div className="cardWrapper addCard" onClick={() => setAddBatch(true)}>
          <Add fontSize="large" />
        </div>
        {allBatches.length > 0 &&
          allBatches.map((classInfo, i) => (
            <div
              key={i}
              className="cardWrapper"
              style={{
                color: classInfo.bg,
              }}
              onClick={() => ''}
            >
              <p> {classInfo.title}</p>
              <span> Total Students : 10</span>
              <div
                style={{
                  background: classInfo.bg,
                }}
                onClick={() => router.push('classes/batches')}
              >
                Details <KeyboardDoubleArrowRight />
              </div>
            </div>
          ))}
      </div>

      <AddPopup
        type="batch"
        open={addBatch}
        setOpen={setAddBatch}
        onSubmit={(classData) => addNewBatch(classData)}
      />
    </div>
  )
}

export default Batches
