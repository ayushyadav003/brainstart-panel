import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { apiConfig } from '../../services/ApiConfig'
import AddPopup from '../../components/addPopup/AddPopup'
import Filter from '../../components/filter/Filter'
import CommonTable from '../../components/table/Table'
import './students.scss'
import { useSelector } from 'react-redux'
import { ApiWithToken } from '../../services/ApiWithToken'
import { toast } from 'react-toastify'

const studentData = [
  {
    id: 5,
    name: 'Ayush4',
    phone: '9958109872',
    class: '12th',
    batch: '04:00-05:00',
  },
  {
    id: 5,
    name: 'Ayush4',
    phone: '9958109872',
    class: '12th',
    batch: '04:00-05:00',
  },
  {
    id: 5,
    name: 'Ayush4',
    phone: '9958109872',
    class: '12th',
    batch: '04:00-05:00',
  },
]
export default function Student() {
  const [addStudent, setAddStudent] = useState(false)
  const [allStudents, setAllStudents] = useState([])
  const [filter, setFilter] = useState({ search: '', class: '', batch: '' })
  const { currentUser } = useSelector((state) => state.user)

  const header = ['Sno.', 'Name', 'Phone', 'Class', 'Batch']

  const addNewStudent = async (classData) => {
    console.log(classData)

    try {
      const apiOPtions = {
        method: 'POST',
        url: apiConfig.class,
        data: { title: classData.title, institute: currentUser?._id },
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
        params: { institute: currentUser?._id },
      }
      const response = await ApiWithToken(apiOPtions)

      if (response?.statusCode === 200) {
        console.log(response)
        setAllStudents(response?.students)
      }
    } catch (error) {
      toast.warning(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    if (currentUser?._id) {
      getAllStudents()
    }
  }, [currentUser])

  return (
    <div className="studentsContainer">
      <AddPopup
        type="students"
        open={addStudent}
        setOpen={setAddStudent}
        onSubmit={(classData) => addNewStudent(classData)}
      />
      <Filter
        showBack={false}
        heading="All Students"
        type="student"
        showClass={true}
        showBatch={true}
        filter={filter}
        setFilter={setFilter}
      />
      <div id="addStudent">
        <Button variant="contained" onClick={() => setAddStudent(true)}>
          Add New Student
        </Button>
      </div>
      <div className="studentWrapper">
        <CommonTable head={header} rows={allStudents} type="students" />
      </div>
    </div>
  )
}
