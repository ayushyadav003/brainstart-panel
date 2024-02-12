import { Button } from '@mui/material'
import Filter from '../../components/filter/Filter'
import CommonTable from '../../components/table/Table'
import './support.scss'
import AddPopup from '../../components/addPopup/AddPopup'
import { useState } from 'react'
const head = ['Id', 'Title', 'Description', 'Created At', 'Status']
const row = [
  {
    id: '01',
    title: 'Class related issue',
    desc: 'Can not add class',
    createdAt: '11-02-2024',
    status: 'Resolved',
  },
  {
    id: '01',
    title: 'Class related issue',
    desc: 'Can not add class',
    createdAt: '11-02-2024',
    status: 'Active',
  },
  {
    id: '01',
    title: 'Class related issue',
    desc: 'Can not add class',
    createdAt: '11-02-2024',
    status: 'Active',
  },
]
export default function Support() {
  const [openAddTicket, setOpenAddTicket] = useState(false)
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
  })
  const handleAddTicket = () => {}
  return (
    <div className="supportContainer">
      <Filter heading={'Support'} type={'support'} />
      <div className="addBtn">
        <Button variant="contained" onClick={() => setOpenAddTicket(true)}>
          New Ticket
        </Button>
      </div>
      <div className="ticketsWrapper">
        <CommonTable
          head={head}
          rows={row}
          type={'support'}
          onEdit={() => openAddTicket(true)}
        />
      </div>
      <AddPopup
        type={'support'}
        open={openAddTicket}
        setOpen={setOpenAddTicket}
        value={newTicket}
        setValue={setNewTicket}
        handleSubmit={handleAddTicket}
      />
    </div>
  )
}
