import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { apiConfig } from '../../services/ApiConfig'
import Filter from '../../components/filter/Filter'
import CommonTable from '../../components/table/Table'
import './attendance.scss'
import { useSelector } from 'react-redux'
import { ApiWithToken } from '../../services/ApiWithToken'
import NoData from '../../components/noData/NoData'

export default function Attendace() {
  const [allStudents, setAllStudents] = useState([])
  const [selectBatches, setSelectBatches] = useState([])
  const [selectedClass, setSelectedClass] = useState('')
  const [filter, setFilter] = useState({ search: '', class: null, batch: null })
  const { currentUser } = useSelector((state) => state.user)
  dayjs.extend(localizedFormat)
  const today = dayjs()

  const header = ['Sno.', 'Name', 'Class', 'Batches', 'Last 10', 'Today']

  const getAllStudents = async () => {
    try {
      const apiOPtions = {
        method: 'GET',
        url: apiConfig.student,
        params: {
          institute: currentUser?._id,
          classId: filter.class,
          batchId: filter.batch,
        },
      }
      const response = await ApiWithToken(apiOPtions)
      if (response?.statusCode === 200) {
        console.log(response)
        setAllStudents(response?.student)
      }
    } catch (error) {
      setAllStudents([])
      // toast.warning(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    if (currentUser?._id && filter.class && filter.batch) {
      getAllStudents()
    }
  }, [currentUser, filter])


  const onAttendanceChange = async (val, studenId) => {
    const attendanceObj = {
      studenId,
      date: today.format('dddd, LL'),
      batch: {
        batchId: '65d4f1e4fb7aa98851f84154',
        status: val,
      },
    }
    try {
      const apiOPtions = {
        method: 'POST',
        url: apiConfig.attendance,
        data: attendanceObj,
      }
      const response = await ApiWithToken(apiOPtions)

      if (response?.statusCode === 200) {
        setSelectBatches(response?.batches)
      }
    } catch (error) {
      // toast.warning(error?.response?.data?.message)
    }
  }

  return (
    <div className="studentsContainer">
      <Filter
        showBack={false}
        heading="All Students"
        type="students"
        showClass={true}
        showBatch={true}
        filter={filter}
        setFilter={setFilter}
      />
      <div className="studentWrapper">
        <CommonTable
          head={header}
          onEdit={onAttendanceChange}
          rows={allStudents}
          type="attendance"
        />
                                  {
          allStudents.length<=0 &&
          <NoData />
        }
      </div>
    </div>
  )
}
