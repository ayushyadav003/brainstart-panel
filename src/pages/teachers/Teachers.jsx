import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { apiConfig } from '../../services/ApiConfig'
import AddPopup from '../../components/addPopup/AddPopup'
import Filter from '../../components/filter/Filter'
import CommonTable from '../../components/table/Table'
import './teachers.scss'
import { useSelector } from 'react-redux'
import { ApiWithToken } from '../../services/ApiWithToken'
import { toast } from 'react-toastify'
import NoData from '../../components/noData/NoData'

export default function Teachers() {
  const [addStudent, setAddStudent] = useState(false)
  const [allStudents, setAllStudents] = useState([])
  const [filter, setFilter] = useState({ search: '', class: null, batch: null })
  const { currentUser } = useSelector((state) => state.user)

  const header = ['Sno.', 'Name', 'Email', 'Phone', 'Class', 'Batch']

  const addNewStudent = async (classData) => {
    console.log(classData)
    const obj = classData
    obj['batches'] = classData?.batches.map((data) => {
      return { id: data?._id, title: data?.title }
    })
    obj['classes'] = {
      id: classData?.classes.id,
      title: classData?.classes?.title,
    }
    obj['institute'] = currentUser?._id
    obj['teacherId'] = localStorage.getItem('userId') || 'admin'
    try {
      const apiOPtions = {
        method: 'POST',
        url: apiConfig.teacher,
        data: obj,
      }
      const response = await ApiWithToken(apiOPtions)
      if (response?.statusCode === 201) {
        toast.success(response?.message)
        setAddStudent(false)
        getAllStudents()
      }
    } catch (error) {
      toast.warning(error?.response?.data?.message)
    }
  }

  const getAllStudents = async () => {
    try {
      const apiOPtions = {
        method: 'GET',
        url: apiConfig.student,
        params: {
          institute: currentUser?._id,
          teacherId: localStorage.getItem('userId') || 'admin',
          classId: filter?.class,
          batchId: filter?.batch,
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

  const handleDeteleStudent = async (student) => {
    try {
      const apiOPtions = {
        method: 'Delete',
        url: apiConfig.student,
        data: { studentId: student?._id },
      }
      const response = await ApiWithToken(apiOPtions)

      if (response?.statusCode === 200) {
        toast.success(response.message || 'Student deleted successfully')
        getAllStudents()
      }
    } catch (error) {
      toast.warning(error?.response?.data?.message || 'Something went wrong! ')
    }
  }

  useEffect(() => {
    if (currentUser?._id) {
      getAllStudents()
    }
  }, [currentUser, filter])

  return (
    <div className="studentsContainer">
      <AddPopup
        type="teacher"
        open={addStudent}
        setOpen={setAddStudent}
        onSubmit={(classData) => addNewStudent(classData)}
      />
      <Filter
        showBack={false}
        heading="All Teachers"
        type="Teachers"
        showClass={true}
        showBatch={true}
        filter={filter}
        setFilter={setFilter}
      />
      <div id="addStudent">
        <Button variant="contained" onClick={() => setAddStudent(true)}>
          Add New Teacher
        </Button>
      </div>
      <div className="studentWrapper">
        <CommonTable
          head={header}
          rows={allStudents}
          type="students"
          onDelete={handleDeteleStudent}
        />
        {allStudents.length <= 0 && <NoData />}
      </div>
    </div>
  )
}
