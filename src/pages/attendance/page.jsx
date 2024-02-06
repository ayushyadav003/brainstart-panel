'use client'
import React, { useState } from 'react'
import CommonTable from '../../../components/common/Table'
import styles from './attendance.module.scss'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import AddPopup from '@/components/addPopup/AddPopup'
import { useRouter } from 'next/navigation'

const studentData = [
  {
    id: 1,
    name: 'Ayush',
    class: '12th',
    batch: '04:00-05:00',
    record: ["p","ab","p","h","h","p","p"]
  },
  {
    id: 2,
    name: 'Ayush',
    class: '12th',
    batch: '04:00-05:00',
    record: ["p","ab","p","h","h","p","p"]
  },
  {
    id: 3,
    name: 'Ayush',
    class: '12th',
    batch: '04:00-05:00',
    record: ["p","ab","p","h","h","p","p"]
  },
  {
    id: 4,
    name: 'Ayush',
    class: '12th',
    batch: '04:00-05:00',
    record: ["p","ab","p","h","h","p","p"]
  },
  {
    id: 5,
    name: 'Ayush',
    class: '12th',
    batch: '04:00-05:00',
    record: ["p","ab","p","h","h","p","p"]
  },
  {
    id: 6,
    name: 'Ayush',
    class: '12th',
    batch: '04:00-05:00',
    record: ["p","ab","p","h","h","p","p"]
  },

]
export default function Attendance() {
  const [addAttendance, setAddAttendance] = useState(false)
  const router = useRouter()

  const header = ['Sno.', 'Name', 'Class', 'Batch','Record', 'Today']

  return (
    <div className={styles.attendanceContainer}>
      <AddPopup type="attendance" open={addAttendance} setOpen={setAddAttendance} />
      <div className={styles.header}>
        <h2 className={styles.leftContent}>Attendance</h2>
        <div className={styles.rightContent}>
          <TextField placeholder="Search with student name/username" />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Class</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={''}
              label="Class"
            // onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Batch</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={''}
              label="Batch"
            // onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={styles.attendanceWrapper}>
        <CommonTable head={header} rows={studentData} type="attendace" />
      </div>
    </div>
  )
}
