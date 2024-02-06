'use client'
import { useState } from 'react'
import styles from './notes.module.scss'
import { AddBox, PictureAsPdf } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

export default function Notes() {
  const router = useRouter()
  const [notes, setNotes] = useState([
    { noteID: '1', name: 'Chemistry', class: '', batch: '' },
    { noteID: '2', name: 'Maths', class: '', batch: '' },
    { noteID: '3', name: 'Social science', class: '', batch: '' },
    { noteID: '3', name: 'Physics', class: '', batch: '' },
  ])

  return (
    <div className={styles.notesConatiner}>
      <div
        className={`${styles.note} ${styles.addNew}`}
        onClick={() => router.push('notes/updateNotes')}
      >
        <AddBox />
      </div>
      {notes.map((note, i) => {
        return (
          <div className={styles.note} key={i}>
            <span>
              <PictureAsPdf />
            </span>
            <p>{note.name}</p>
          </div>
        )
      })}
    </div>
  )
}
