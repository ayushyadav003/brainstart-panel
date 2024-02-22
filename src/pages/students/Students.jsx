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

export default function Student() {
  const [addStudent, setAddStudent] = useState(false)
  const [allStudents, setAllStudents] = useState([])
  const [selectClasses, setSelectClasses] = useState([])
  const [selectBatches, setSelectBatches] = useState([])
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedBatches, setSelectedBatches] = useState('')
  const [filter, setFilter] = useState({ search: '', class: '', batch: '' })
  const { currentUser } = useSelector((state) => state.user)

  const header = ['Sno.', 'Name', 'Phone', 'Class', 'Batch']

  const addNewStudent = async (classData) => {
    const obj = classData
    obj['batches'] = selectedBatches.map((data) => data?._id)
    obj['classId'] = selectedClass?._id
    try {
      const apiOPtions = {
        method: 'POST',
        url: apiConfig.student,
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
        params: { institute: currentUser?._id },
      }
      const response = await ApiWithToken(apiOPtions)

      if (response?.statusCode === 200) {
        console.log(response)
        setAllStudents(response?.student)
      }
    } catch (error) {
      // toast.warning(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    if (currentUser?._id) {
      getAllStudents()
    }
  }, [currentUser])

  const getAllClasses = async () => {
    try {
      const apiOPtions = {
        method: 'GET',
        url: apiConfig.class,
        params: { institute: currentUser?._id },
      }
      const response = await ApiWithToken(apiOPtions)

      if (response?.statusCode === 200) {
        setSelectClasses(response?.classes)
      }
    } catch (error) {
      // toast.warning(error?.response?.data?.message);
    }
  }
  const getAllBatches = async () => {
    try {
      const apiOPtions = {
        method: 'GET',
        url: apiConfig.batch,
        params: { institute: currentUser?._id, classId: selectedClass?._id },
      }
      const response = await ApiWithToken(apiOPtions)

      if (response?.statusCode === 200) {
        setSelectBatches(response?.batches)
      }
    } catch (error) {
      // toast.warning(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    if (currentUser?._id && addStudent) {
      getAllClasses()
    }
  }, [currentUser, addStudent])
  useEffect(() => {
    if (selectedClass) {
      getAllBatches()
    }
  }, [selectedClass])

  return (
    <div className="studentsContainer">
      <AddPopup
        type="students"
        open={addStudent}
        setOpen={setAddStudent}
        onSubmit={(classData) => addNewStudent(classData)}
        classes={selectClasses}
        setSelectedClass={setSelectedClass}
        selectBatches={selectBatches}
        setSelectedBatches={setSelectedBatches}
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
