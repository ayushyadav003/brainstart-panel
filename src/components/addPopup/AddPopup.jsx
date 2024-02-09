import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import Dialog from '@mui/material/Dialog'
import styles from './addPopup.module.scss'
import { Autocomplete, Button, InputAdornment, TextField } from '@mui/material'
import { Close, CurrencyRupee } from '@mui/icons-material'

export default function AddPopup({
  type,
  open,
  setOpen,
  handleAddBatchSubmit,
}) {
  const handleClose = () => {
    setOpen(false)
  }

  const submitForm = (e) => {
    e.preventDefault()
    handleAddBatchSubmit()
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
      <form onSubmit={submitForm}>
        {type === 'class' && (
          <div className={styles.popupBox}>
            <h2>Add New Class</h2>
            <TextField placeholder="Title" className={styles.field} fullWidth />
            <Autocomplete
              multiple
              id="tags-outlined"
              options={[]}
              fullWidth
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} placeholder="Add students" />
              )}
            />
            <Button
              variant="contained"
              className={styles.submitBtn}
              type="submit"
            >
              Add
            </Button>
          </div>
        )}
        {type === 'batch' && (
          <div className={styles.popupBox}>
            <h2>Add New Batch</h2>
            <TextField
              placeholder="Title"
              name="title"
              className={styles.field}
              fullWidth
            />
            <TextField
              placeholder="Fee"
              className={styles.field}
              fullWidth
              name="fee"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CurrencyRupee />
                  </InputAdornment>
                ),
              }}
            />
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <TimePicker label="Basic time picker" />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={[]}
              fullWidth
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} placeholder="Add students" />
              )}
            />
            <Button
              variant="contained"
              className={styles.submitBtn}
              type="submit"
            >
              Add
            </Button>
          </div>
        )}

        {type === 'students' && (
          <div className={styles.popupBox}>
            <h2>Add New Student</h2>
            <div className={styles.subSection}>
              <TextField
                placeholder="Fullname"
                className={styles.field}
                fullWidth
              />
              <TextField
                placeholder="username"
                className={styles.field}
                fullWidth
              />
            </div>
            <div className={styles.subSection}>
              <TextField
                placeholder="Phone"
                className={styles.field}
                fullWidth
              />
              <TextField
                placeholder="Email"
                className={styles.field}
                fullWidth
              />
            </div>
            <div className={styles.subSection}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={[]}
                fullWidth
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Class" />
                )}
              />
              <Autocomplete
                multiple
                id="tags-outlined"
                options={[]}
                fullWidth
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Batch" />
                )}
              />
            </div>
            <Button variant="contained" className={styles.submitBtn}>
              Add
            </Button>
          </div>
        )}
      </form>
    </Dialog>
  )
}
