import { useState } from 'react'
import './notes.scss'
import { AddBox, Paragliding, PictureAsPdf, TextFieldsRounded } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Filter from '../../../components/filter/Filter'

import { Autocomplete, Button, Box, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddPopup from '../../../components/addPopup/AddPopup'

export default function Notes() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState({class:null, batch:null, search:''})
  const [notes, setNotes] = useState([
    { noteID: '1', name: 'Chemistry', class: '', batch: '' },
    { noteID: '2', name: 'Maths', class: '', batch: '' },
    { noteID: '3', name: 'Social science', class: '', batch: '' },
    { noteID: '3', name: 'Physics', class: '', batch: '' },
  ])

  const [addNotesPrompt, setAddNotesPrompt] = useState(false)
  const [fileUpload, setFileUpload] = useState(null)
  

  const handleWriteNotes = () => {
    setTimeout(()=> {
      navigate('update-notes')
    }, 400)
  }

  const handleUploadNotes = () => {
    console.log('inside upload notes');
    let input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'application/pdf')
    
    input.click()
    input.addEventListener('change', (event)=> {
      setFileUpload(event.target.files[0])
    })

    input = null;
  }
  return (
    <div className="notesConatiner">
      <Filter heading={'Notes'} filter={filter} setFilter={setFilter} />
      <div className="notes">
        {/* <div className="note" onClick={() => navigate('update-notes')} style={{border : "3px solid red"}}> */}
        <div className="note" onClick={() => setAddNotesPrompt(true)}>
          <AddBox/>
        </div>

        <AddPopup type="addnote" open={addNotesPrompt} setOpen={setAddNotesPrompt}  handleWriteNotes={handleWriteNotes} handleUploadNotes={handleUploadNotes}/>

        {notes.map((note, i) => {
          return (
            <div className="note" key={i} >
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
