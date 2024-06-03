/* eslint-disable react/prop-types */
import Dialog from '@mui/material/Dialog'
import './addPopup.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Autocomplete,
  Button,
  FormHelperText,
  Switch,
  TextField,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { apiConfig } from '../../services/ApiConfig'
import { useSelector } from 'react-redux'
import { ApiWithToken } from '../../services/ApiWithToken'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers'
import { toast } from 'react-toastify'
import moment from 'moment'

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const hourData = ['45 min', '45 min', '1 hr', '2 hr']

export default function AddMeetingPopup({ open, setOpen }) {
  const [loading, setLoading] = useState(false)
  const { currentUser } = useSelector((state) => state.user)
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [batches, setBatches] = useState([])
  const [selectedDays, setSelectedDays] = useState({})

  const validateSchema = Yup.object().shape({
    title: Yup.string().required('This field is required'),
    description: Yup.string().notRequired(),
    startTime: Yup.string().required('This field is required'),
    duration: Yup.string().required('This field is required'),
    days: Yup.string().required('This field is required'),
    classId: Yup.object().required('This field is required'),
    batch: Yup.object().required('This field is required'),
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      repeat: false,
      startTime: null,
      classId: null,
      batch: null,
      duration: null,
      days: moment().format('YYYY-MM-DD'),
    },
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const apiOPtions = {
          method: 'POST',
          url: apiConfig.meetings,
          data: { ...values, instituteId: currentUser?._id },
        }
        const response = await ApiWithToken(apiOPtions)

        if (response?.statusCode === 201) {
          toast.success(response?.data?.message)
          setOpen(false)
        } else {
          toast.warning(response?.data?.message)
        }
      } catch (error) {
        toast.warning(error?.response?.data?.message)
      } finally {
        setLoading(false)
      }
    },
  })

  const handleClose = () => {
    setOpen(false)
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
        setClasses(response?.classes)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getAllBatches = async () => {
    try {
      const apiOPtions = {
        method: 'GET',
        url: apiConfig.batch,
        params: {
          institute: currentUser?._id,
          classId: selectedClass?._id,
        },
      }
      const response = await ApiWithToken(apiOPtions)

      if (response?.statusCode === 200) {
        setBatches(response?.batches)
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(formik.values)

  useEffect(() => {
    if (selectedClass) {
      getAllBatches()
    }
  }, [selectedClass])

  const updateDays = (day, i) => {
    let daysObj = { ...selectedDays }
    if (selectedDays[i]) {
      delete daysObj[i]
      setSelectedDays({ ...daysObj })
    } else {
      setSelectedDays({ ...selectedDays, [i]: day })
    }
  }
  return (
    <Dialog onClose={handleClose} open={open} maxWidth={false}>
      <Close
        style={{
          position: 'absolute',
          right: '25px',
          top: '15px',
          cursor: 'pointer',
        }}
        onClick={handleClose}
      />
      <form onSubmit={formik.handleSubmit}>
        <div className="popupBox">
          <h2>Create Meeting</h2>
          <div className="subSection">
            <TextField
              label="Title"
              name="title"
              className="field"
              error={formik.touched.title && formik.errors.title}
              helperText={formik.touched.title && formik.errors.title}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
          </div>
          <div className="subSection">
            <div className="inner">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Start time"
                  name="startTime"
                  disablePast
                  ampm={false}
                  onBlur={formik.handleBlur}
                  onChange={(val) => {
                    formik.setFieldValue('startTime', val.format('HH:mm'))
                  }}
                />
              </LocalizationProvider>

              {formik.errors.startTime && (
                <FormHelperText error sx={{ marginLeft: '14px' }}>
                  {formik.touched.startTime && formik.errors.startTime}
                </FormHelperText>
              )}
            </div>
            <div className="inner">
              <Autocomplete
                id="tags-outlined3"
                options={hourData}
                fullWidth
                name="duration"
                error={formik.touched.duration && formik.errors.duration}
                value={formik.values.duration || ''}
                onBlur={formik.handleBlur}
                onChange={(e, value) => {
                  formik.setFieldValue('duration', value)
                }}
                getOptionLabel={(option) => option || ''}
                filterSelectedOptions
                label="Duration"
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Duration" />
                )}
              />
              {formik.touched.duration && formik.errors.duration && (
                <FormHelperText error sx={{ marginLeft: '14px' }}>
                  {formik.errors.duration}
                </FormHelperText>
              )}
            </div>
          </div>
          <div className="subSection">
            <div className="inner">
              <Autocomplete
                id="tags-outlined"
                options={classes}
                onOpen={getAllClasses}
                label="Class"
                fullWidth
                name="class"
                error={formik.touched.classId && formik.errors.classId}
                value={formik.values.classId || ''}
                onBlur={formik.handleBlur}
                onChange={(e, value) => {
                  setSelectedClass(value)
                  formik.setFieldValue('classId', {
                    id: value?._id,
                    title: value?.title,
                  })
                }}
                getOptionLabel={(option) => option?.title || ''}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Class" />
                )}
              />
              {formik.touched.classId && formik.errors.classId && (
                <FormHelperText error sx={{ marginLeft: '14px' }}>
                  {formik.touched.classId && formik.errors.classId}
                </FormHelperText>
              )}
            </div>

            <div className="inner">
              <Autocomplete
                id="tags-outlined2"
                options={batches}
                fullWidth
                error={formik.touched.batch && formik.errors.batch}
                value={formik.values.batch}
                onBlur={formik.handleBlur}
                name="batch"
                getOptionLabel={(option) => option?.title || ''}
                filterSelectedOptions
                onChange={(e, value) => {
                  formik.setFieldValue('batch', {
                    title: value?.title,
                    id: value?._id,
                  })
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Batches" />
                )}
              />
              {formik.touched.batch && formik.errors.batch && (
                <FormHelperText error sx={{ marginLeft: '14px' }}>
                  {formik.errors.batch}
                </FormHelperText>
              )}
            </div>
          </div>
          <TextField
            label="Description "
            name="description"
            className="field"
            error={formik.touched.description && formik.errors.description}
            helperText={formik.touched.description && formik.errors.description}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />
          <div className="subSection" style={{ alignItems: 'center' }}>
            <span className="repeatWrapper">
              Repeat
              <Switch
                name="repeat"
                error={formik.touched.repeat && formik.errors.repeat}
                helperText={formik.touched.repeat && formik.errors.repeat}
                checked={formik.values.repeat}
                onChange={(e) => {
                  formik.setFieldValue('repeat', e.target.checked)
                }}
                onBlur={formik.handleBlur}
              />
            </span>
            {formik.values.repeat ? (
              weekdays.map((day, i) => (
                <span
                  className="dayWrapper"
                  key={i}
                  onClick={() => updateDays(day, i)}
                  style={{
                    background: selectedDays[i] ? 'rgb(132 147 214 / 51%)' : '',
                  }}
                >
                  {day}
                </span>
              ))
            ) : (
              <TextField
                id="date"
                label="Select Date"
                style={{ width: '100%' }}
                fullWidth
                type="date"
                value={formik.values.days}
                sx={{ width: 220 }}
                onChange={(e) => {
                  console.log(e.target.value)
                  formik.setFieldValue('days', e.target.value)
                }}
                onBlur={formik.handleBlur}
              />
            )}
          </div>
          <Button variant="contained" className="submitBtn" type="submit">
            Create
          </Button>
          ,
        </div>
      </form>
    </Dialog>
  )
}
