import { useState } from 'react'
import {
  Autocomplete,
  Checkbox,
  Chip,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import './accessPopup.scss'
import { accessData } from '../../utils/Utils'
import { Clear } from '@mui/icons-material'

export default function AccessPopup({ open, setOpen }) {
  const [classes, setClasses] = useState([])
  const [batches, setBatches] = useState([])

  return (
    <div className="editTeacherWrapper">
      <div className="accessPopupWrapper">
        <div className="inner">
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            sx={{ background: '#fff', borderRadius: '10px' }}
            options={classes}
            disableCloseOnSelect
            fullWidth
            getOptionLabel={(option) => option?.name}
            onChange={(e, val) => {}}
            ChipProps={{ color: 'warning' }}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option.id}>
                <Checkbox style={{ marginRight: 8 }} checked={selected} />
                {option?.name}
              </li>
            )}
            limitTags={5}
            renderInput={(params) => (
              <TextField {...params} fullWidth label="Assign Classes" />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  {...getTagProps({ index })}
                  variant="filled"
                  label={`${option?.name}`}
                  deleteIcon={<Clear />}
                />
              ))
            }
          />
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            fullWidth
            sx={{ background: '#fff', borderRadius: '10px' }}
            options={classes}
            disableCloseOnSelect
            getOptionLabel={(option) => option?.name}
            onChange={(e, val) => {}}
            ChipProps={{ color: 'warning' }}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option.id}>
                <Checkbox style={{ marginRight: 8 }} checked={selected} />
                {option?.name}
              </li>
            )}
            limitTags={5}
            renderInput={(params) => (
              <TextField {...params} fullWidth label="Assign Batches" />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  {...getTagProps({ index })}
                  variant="filled"
                  label={`${option?.name}`}
                  deleteIcon={<Clear />}
                />
              ))
            }
          />
        </div>
        <div className="tableContainer">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Access</TableCell>
                <TableCell align="right">View</TableCell>
                <TableCell align="right">Add/Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accessData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {row}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Radio />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Radio />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Radio />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
