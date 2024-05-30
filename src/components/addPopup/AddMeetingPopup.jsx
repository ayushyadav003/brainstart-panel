/* eslint-disable react/prop-types */
import Dialog from '@mui/material/Dialog'
import './addPopup.scss'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Autocomplete,
  Button,
  FormControlLabel,
  FormHelperText,
  Switch,
  TextField,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { apiConfig } from '../../services/ApiConfig'
import { useSelector } from 'react-redux'
import { ApiWithToken } from '../../services/ApiWithToken'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker, TimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export default function AddMeetingPopup({ open, setOpen, onSubmit }) {
  const { register, handleSubmit, reset, setValue } = useForm()
  const [loading, setLoading] = useState(false)
  const { currentUser } = useSelector((state) => state.user)
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState(null)
  const [batches, setBatches] = useState([])
  const [selectedDays, setSelectedDays] = useState({})

  const validateSchema = Yup.object().shape({
    title: Yup.string().required('This field is required'),
    description: Yup.string().notRequired(),
    startTime: Yup.string().required('This field is required'),
    endTime: Yup.string().required('This field is required'),
    days: Yup.string().required('This field is required'),
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      repeat: false,
      startTime: null,
      endTime: null,
      days: null,
    },
    validationSchema: validateSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true)
        const apiOPtions = {
          method: 'GET',
          url: apiConfig.class,
          body: { ...values, institute: currentUser?._id },
        }
        const response = await ApiWithToken(apiOPtions)

        console.log(response)
        if (response?.statusCode === 200) {
          toast.success(response?.data?.message)
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

  console.log(selectedDays)

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
                  error={formik.touched.startTime && formik.errors.startTime}
                  helperText={
                    formik.touched.startTime && formik.errors.startTime
                  }
                  value={formik.values.startTime}
                  onBlur={formik.handleBlur}
                  onChange={(val) => {
                    formik.setFieldValue('from', dayjs(val).format('HH:mm'))
                  }}
                />
              </LocalizationProvider>
              <FormHelperText error sx={{ marginLeft: '14px' }}>
                {formik.touched.startTime && formik.errors.startTime}
              </FormHelperText>
            </div>
            <div className="inner">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="End time"
                  name="endTime"
                  error={formik.touched.endTime && formik.errors.endTime}
                  helperText={formik.touched.endTime && formik.errors.endTime}
                  value={formik.values.endTime}
                  onBlur={formik.handleBlur}
                  onChange={(val) => {
                    formik.setFieldValue('endTime', dayjs(val).format('HH:mm'))
                  }}
                />
              </LocalizationProvider>
              <FormHelperText error sx={{ marginLeft: '14px' }}>
                {formik.touched.startTime && formik.errors.startTime}
              </FormHelperText>
            </div>
          </div>
          <div className="subSection">
            <div className="inner">
              <Autocomplete
                id="tags-outlined"
                options={classes}
                onOpen={getAllClasses}
                fullWidth
                name="classes"
                error={formik.touched.classes && formik.errors.classes}
                helperText={formik.touched.classes && formik.errors.classes}
                value={formik.values.classes}
                onBlur={formik.handleBlur}
                onChange={(e, value) => {
                  setSelectedClass(value)
                  formik.setFieldValue('classes', {
                    id: value?._id,
                    title: value?.title,
                  })
                }}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Class" />
                )}
              />
              <FormHelperText error sx={{ marginLeft: '14px' }}>
                {formik.touched.classes && formik.errors.classs}
              </FormHelperText>
            </div>

            <div className="inner">
              <Autocomplete
                multiple
                id="tags-outlined2"
                options={batches}
                fullWidth
                error={formik.touched.batches && formik.errors.batches}
                helperText={formik.touched.batches && formik.errors.batches}
                value={formik.values.batches}
                onBlur={formik.handleBlur}
                name="batches"
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                onChange={(e, value) => {
                  formik.setFieldValue('batches', value)
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Batches" />
                )}
              />
              <FormHelperText error sx={{ marginLeft: '14px' }}>
                {formik.touched.batches && formik.errors.batches}
              </FormHelperText>
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
                // defaultValue="2017-05-24"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  console.log(e.target.value)
                  formik.setFieldValue('day', e.target.checked)
                }}
                onBlur={formik.handleBlur}
              />
            )}
          </div>
          <Button variant="contained" className="submitBtn" type="submit">
            Create
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
