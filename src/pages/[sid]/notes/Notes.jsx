import { useState } from 'react'
import './notes.scss'
import { AddBox, PictureAsPdf } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Filter from '../../../components/filter/Filter'

export default function Notes() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState({class:null, batch:null, search:''})
  const [notes, setNotes] = useState([
    { noteID: '1', name: 'Chemistry', class: '', batch: '' },
    { noteID: '2', name: 'Maths', class: '', batch: '' },
    { noteID: '3', name: 'Social science', class: '', batch: '' },
    { noteID: '3', name: 'Physics', class: '', batch: '' },
  ])
  return (
    <div className="notesConatiner">
      <Filter heading={'Notes'} filter={filter} setFilter={setFilter} />
      <div className="notes">
        <div className="note" onClick={() => navigate('update-notes')}>
          <AddBox />
        </div>
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
