import { useState } from 'react'
import './notes.scss'
import { AddBox, Paragliding, PictureAsPdf, TextFieldsRounded } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Filter from '../../../components/filter/Filter'

import { Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function Notes() {
  const navigate = useNavigate()
  const notesAddOption = [
    {label : "Upload from PDF"},
    {label : "Write Notes"},
  ]
  const [filter, setFilter] = useState({class:null, batch:null, search:''})
  const [notes, setNotes] = useState([
    { noteID: '1', name: 'Chemistry', class: '', batch: '' },
    { noteID: '2', name: 'Maths', class: '', batch: '' },
    { noteID: '3', name: 'Social science', class: '', batch: '' },
    { noteID: '3', name: 'Physics', class: '', batch: '' },
  ])

  const [addNotesPrompt, setAddNotesPrompt] = useState(false)
  return (
    <div className="notesConatiner">
      <Filter heading={'Notes'} filter={filter} setFilter={setFilter} />
      <div className="notes">
        {/* <div className="note" onClick={() => navigate('update-notes')} style={{border : "3px solid red"}}> */}
        <div className="note" onClick={() => setAddNotesPrompt(true)}>
          <AddBox/>
        </div>

        <Dialog open={addNotesPrompt} fullWidth maxWidth="sm" spacing={10} sx={{border : "3px solid green"}}>
          <DialogTitle>Please confirm<IconButton sx={{float : "right"}} onClick={() => setAddNotesPrompt(false)}><CloseIcon color='error'></CloseIcon></IconButton></DialogTitle>
          <DialogContent>
            <DialogContentText>How do you want to add the notes?</DialogContentText>
            <Autocomplete
              options={notesAddOption}
              renderInput={(params) => (
                <TextField {...params} label="Select One"></TextField>
              )}
            >
            </Autocomplete>
          </DialogContent>
      </Dialog>

        {notes.map((note, i) => {
          return (
            <div className="note" key={i}>
              {/* <div>
                <RemoveRedEye fontSize="small" />
                <Create fontSize="snall" />
              </div> */}
              <span>
                <PictureAsPdf />
              </span>
              <p>{note.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
