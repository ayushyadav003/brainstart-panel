/* eslint-disable react/prop-types */
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import Dialog from '@mui/material/Dialog'
import './addPopup.scss'
import {
  Autocomplete,
  Button,
  // CircularProgress,
  InputAdornment,
  TextField,
} from '@mui/material'
import { Close, CurrencyRupee } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { apiConfig } from '../../services/ApiConfig'
import { useSelector } from 'react-redux'
import { ApiWithToken } from '../../services/ApiWithToken'

export default function AddPopup({ type, open, setOpen, onSubmit }) {
  const { register, handleSubmit, reset, setValue } = useForm()
  const [loading, setLoading] = useState(false)
  const { currentUser } = useSelector((state) => state.user)
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState(null)
  const [batches, setBatches] = useState([])

  const handleClose = () => {
    setOpen(false)
  }

  const handleFormSubmit = async (data) => {
    setLoading(true)
    await onSubmit(data, reset)
    setLoading(false)
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
      // toast.warning(error?.response?.data?.message);
    }
  }
  const getAllBatches = async () => {
    try {
      const apiOPtions = {
        method: 'GET',
        url: apiConfig.batch,
        params: {
          institute: currentUser?._id,
          classIds: selectedClass?._id,
        },
      }
      const response = await ApiWithToken(apiOPtions)

      if (response?.statusCode === 200) {
        setBatches(response?.batches)
      }
    } catch (error) {
      // toast.warning(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    if (selectedClass) {
      getAllBatches()
    }
  }, [selectedClass])

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
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {type === 'class' && (
          <div className="popupBox">
            <h2>Add New Class</h2>
            <TextField
              placeholder="Title"
              required
              {...register('title')}
              className="field"
              fullWidth
            />
            <Button
              variant="contained"
              className="submitBtn"
              type="submit"
              disabled={loading}
            >
              Add
            </Button>
          </div>
        )}
        {type === 'batch' && (
          <div className="popupBox">
            <h2>Add New Batch</h2>
            <TextField
              placeholder="Title"
              {...register('title')}
              className="field"
              required
              fullWidth
            />
            <TextField
              placeholder="Fee"
              className="field"
              fullWidth
              {...register('fees')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CurrencyRupee />
                  </InputAdornment>
                ),
              }}
            />
            {/* <div className="subSection">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <TimePicker label="From time" />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <TimePicker label="To time" />
                </DemoContainer>
              </LocalizationProvider>
            </div> */}
            {/* <Autocomplete
              multiple
              id="tags-outlined"
              options={[]}
              fullWidth
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} placeholder="Add students" />
              )}
            /> */}

            <Button
              variant="contained"
              className="submitBtn"
              type="submit"
              disabled={loading}
            >
              Add
            </Button>
          </div>
        )}
        {type === 'support' && (
          <div className="popupBox">
            <h2>Raise New Ticket</h2>
            <TextField
              placeholder="Title"
              name="title"
              required
              className="field"
              fullWidth
            />
            <TextField
              placeholder="Description"
              className="field"
              required
              fullWidth
              name="description"
            />

            <Button variant="contained" className="submitBtn" type="submit">
              Submit
            </Button>
          </div>
        )}

        {type === 'students' && (
          <div className="popupBox">
            <h2>Add New Student</h2>
            <div className="subSection">
              <TextField
                placeholder="Fullname"
                {...register('fullName')}
                required
                className="field"
                fullWidth
              />
              <TextField
                placeholder="Email"
                required
                {...register('email')}
                className="field"
                fullWidth
              />
            </div>
            <div className="subSection">
              <TextField
                placeholder="Fee"
                className="field"
                {...register('fee')}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupee />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                placeholder="Phone"
                {...register('phone')}
                className="field"
                fullWidth
              />
            </div>
            <div className="subSection">
              <Autocomplete
                id="tags-outlined"
                options={classes}
                onOpen={getAllClasses}
                fullWidth
                onChange={(e, value) => {
                  setSelectedClass(value)
                  setValue('classes', { id: value?._id, title: value?.title })
                }}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Class" />
                )}
              />
              <Autocomplete
                multiple
                id="tags-outlined2"
                options={batches}
                fullWidth
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                onChange={(e, value) => {
                  setValue('batches', value)
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Batches" />
                )}
              />
            </div>
            <Button variant="contained" className="submitBtn" type="submit">
              Add
            </Button>
          </div>
        )}

        {type === 'teacher' && (
          <div className="popupBox">
            <h2>Add New Teacher</h2>
            <div className="subSection">
              <TextField
                placeholder="Fullname"
                {...register('fullName')}
                required
                className="field"
                fullWidth
              />

              <TextField
                placeholder="Phone"
                {...register('phone')}
                className="field"
                fullWidth
              />
            </div>
            <div className="subSection">
              {' '}
              <TextField
                placeholder="Email"
                required
                {...register('email')}
                className="field"
                fullWidth
              />
            </div>
            <div className="subSection">
              <Autocomplete
                multiple
                id="tags-outlined2"
                options={classes}
                fullWidth
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                onOpen={getAllClasses}
                onChange={(e, value) => {
                  setValue('batches', value)
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Classes" />
                )}
              />
              <Autocomplete
                multiple
                id="tags-outlined2"
                options={batches}
                fullWidth
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                onChange={(e, value) => {
                  setValue('batches', value)
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Batches" />
                )}
              />
            </div>
            <Button variant="contained" className="submitBtn" type="submit">
              Add
            </Button>
          </div>
        )}
      </form>
    </Dialog>
  )
}
