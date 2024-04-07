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
  const [addTeacher, setAddTeacher] = useState(false)
  const [allTeachers, setAllTeachers] = useState([])
  const [filter, setFilter] = useState({ search: '', class: null, batch: null })
  const { currentUser } = useSelector((state) => state.user)

  const header = ['Sno.', 'Name', 'Email', 'Phone', 'Class', 'Batch']

  const addNewTeacher = async (classData) => {
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
    // obj['teacherId'] = localStorage.getItem('userId') || 'admin'
    try {
      const apiOPtions = {
        method: 'POST',
        url: apiConfig.teacher,
        data: obj,
      }
      const response = await ApiWithToken(apiOPtions)
      if (response?.statusCode === 201) {
        toast.success(response?.message)
        setAddTeacher(false)
        getAllTeacher()
      }
    } catch (error) {
      toast.warning(error?.response?.data?.message)
    }
  }

  const getAllTeacher = async () => {
    try {
      const apiOPtions = {
        method: 'GET',
        url: apiConfig.register,
        params: {
          institute: currentUser?._id,
          classId: filter?.class,
          batchId: filter?.batch,
        },
      }
      const response = await ApiWithToken(apiOPtions)

      if (response?.statusCode === 200) {
        console.log(response)
        setAllTeachers(response?.student)
      }
    } catch (error) {
      setAllTeachers([])
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
        getAllTeacher()
      }
    } catch (error) {
      toast.warning(error?.response?.data?.message || 'Something went wrong! ')
    }
  }

  useEffect(() => {
    if (currentUser?._id) {
      getAllTeacher()
    }
  }, [currentUser, filter])

  return (
    <div className="studentsContainer">
      <AddPopup
        type="teacher"
        open={addTeacher}
        setOpen={setAddTeacher}
        onSubmit={(classData) => addNewTeacher(classData)}
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
      <div id="addTeacher">
        <Button variant="contained" onClick={() => setAddTeacher(true)}>
          Add New Teacher
        </Button>
      </div>
      <div className="studentWrapper">
        <CommonTable
          head={header}
          rows={allTeachers}
          type="students"
          onDelete={handleDeteleStudent}
        />
        {allTeachers.length <= 0 && <NoData />}
      </div>
    </div>
  )
}
