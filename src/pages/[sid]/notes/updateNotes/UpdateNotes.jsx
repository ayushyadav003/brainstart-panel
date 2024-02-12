import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './updateNotes.scss'
import Filter from '../../../../components/filter/Filter'
import { MenuItem, Select, TextField } from '@mui/material'

export default function UpdateNotes() {
  const [convertedText, setConvertedText] = useState('Some default content')
  const [documentDetails, setDocumentDeatils] = useState({
    title: '',
    class: '',
    batch: '',
  })

  // const handleNotesIndexing = () => {}

  const handleChange = (e) => {
    setDocumentDeatils({ ...documentDetails, [e.target.name]: e.target.value })
  }

  return (
    <div className="updateNotesContainer">
      <Filter
        showBack={true}
        heading={'Notes'}
        hideSearch={true}
        type={'notes'}
      />
      <div className="indexingWrapper">
        <TextField
          placeholder={'Add title'}
          name="title"
          onChange={handleChange}
          size="small"
        />
        <div className="dropDown">
          <Select
            id="demo-simple-select"
            value={''}
            name="class"
            displayEmpty
            fullWidth
            size="small"
            onChange={handleChange}
          >
            <MenuItem value="" disabled>
              Select Class
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        <div className="dropDown">
          <Select
            id="demo-simple-select"
            value={''}
            displayEmpty
            name="batch"
            fullWidth
            size="small"
            onChange={handleChange}
          >
            <MenuItem value="" disabled>
              Select Batch
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
      </div>

      <div className="editorWrapper">
        <div className="editor">
          <ReactQuill
            theme="snow"
            value={convertedText}
            onChange={setConvertedText}
            style={{ height: '70vh' }}
          />
        </div>
      </div>
    </div>
  )
}
