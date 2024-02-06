'use client'
import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import styles from './updateNotes.module.scss'
import TextField from '@mui/material/TextField'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useRouter } from 'next/navigation'

export default function UpdateNote0() {
  const router = useRouter()

  const [currentNote, setCurrentNote] = useState(null)
  const [notesList, setNotesList] = useState([
    { id: '1', ques: 'Question 1', ans: 'Answer 1' },
    { id: '2', ques: 'Question 2', ans: 'Answer 2' },
    { id: '3', ques: 'Question 3', ans: 'Answer 3' },
    { id: '4', ques: 'Question 4', ans: 'Answer 4' },
    { id: '5', ques: 'Question 5', ans: 'Answer 5' },
    { id: '6', ques: 'Question 6', ans: 'Answer 6' },
  ])

  const [age, setAge] = React.useState('')

  const handleChange = (event) => {
    setAge(event.target.value)
  }

  useEffect(() => {
    if (currentNote) {
      const updatedNotesList = notesList.map((note) =>
        note.id === currentNote.id ? currentNote : note,
      )
      setNotesList(updatedNotesList)
    }
  }, [currentNote, notesList, setNotesList])

  const handleNoteClick = (note) => {
    setCurrentNote(note)
  }

  return (
    <div className={styles.uodateNotesContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <div className={styles.leftContent}>
            <div onClick={() => router.push('')}>
              <ArrowBackIcon sx={{ marginRight: '10px', cursor: 'pointer' }} />
            </div>
            <h1>Create Notes</h1>
          </div>
          <div className={styles.rightContent}>
            <TextField
              sx={{ m: 1, minWidth: 120 }}
              size="small"
              id="outlined-basic"
              label="Search"
              variant="outlined"
            />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Age</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Age</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div>
          <div className={styles.textEditors}>
            <h3>Question</h3>
            <CKEditor
              editor={ClassicEditor}
              data={currentNote ? currentNote.ques : ''}
              onReady={(editor) => {
                console.log('Editor is ready to use!', editor)
              }}
              onChange={(event) => {
                console.log(event)
              }}
              onBlur={(event, editor) => {
                console.log('Blur.', editor)
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor)
              }}
            />
            <h3>Answer</h3>
            <CKEditor
              editor={ClassicEditor}
              data={currentNote ? currentNote.ans : ''}
              onReady={(editor) => {
                console.log('Editor is ready to use!', editor)
              }}
              onChange={(event) => {
                console.log(event)
              }}
              onBlur={(event, editor) => {
                console.log('Blur.', editor)
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor)
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            fullWidth
          />
        </div>
        {notesList.map((note) => (
          <p
            key={note.id}
            onClick={() => handleNoteClick(note)}
            className={styles.quesList}
          >
            {note.ques}
          </p>
        ))}
      </div>
    </div>
  )
}
