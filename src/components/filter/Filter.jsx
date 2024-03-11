/* eslint-disable react/prop-types */
import {
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from '@mui/material'
import { ArrowBack, Search } from '@mui/icons-material'
import './filter.scss'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
export default function Filter({
  showBack,
  showClass,
  showBatch,
  heading,
  classes,
  batches,
  type,
  hideSearch,
  filter,
  setFilter,
}) {
  const navigate = useNavigate()
  const [searchBarOpen, setSearchBarOpen] = useState(false)
  const searchBarRef = useRef()
  const matches = useMediaQuery('(max-width: 768px)')
  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }
  const searchBarPlaceholder = () => {
    switch (type) {
      case 'classes':
        return 'Class Name'
      case 'students':
        return 'Name/ Email/ Phone'
      case 'batches':
        return 'Batch name'
      default:
        return 'Search here...'
    }
  }
  const searchBarHandler = () => {
    if (searchBarRef?.current) {
      searchBarRef?.current?.focus()
      setSearchBarOpen((e) => !e)
    }
  }
  return (
    <div className="filterContainer">
      <div className="heading">
        {showBack && (
          <ArrowBack
            onClick={() => navigate(-1)}
            style={{ cursor: 'pointer' }}
          />
        )}
        <h1>{heading}</h1>
        {!hideSearch && (
          <div className="searchBarIcon">
            <IconButton onClick={searchBarHandler}>
              {searchBarOpen ? (
                <CloseIcon fontSize="large" />
              ) : (
                <Search fontSize="large" />
              )}
            </IconButton>
          </div>
        )}
      </div>
      <div
        className={
          matches ? (searchBarOpen ? 'filterOpen' : 'filter') : 'filter'
        }
        // onBlur={() => {
        //   setSearchBarOpen(false);
        // }}
      >
        {!hideSearch && (
          <TextField
            inputRef={searchBarRef}
            className="search"
            fullWidth={matches}
            placeholder={searchBarPlaceholder()}
            name="search"
            onChange={handleChange}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        )}
        {showClass && (
          <div className="dropDown">
            <Select
              id="demo-simple-select"
              defaultValue={filter?.class}
              name="class"
              displayEmpty
              fullWidth
              size="small"
              onChange={handleChange}
            >
              <MenuItem value={null} disabled>
                Select Class
              </MenuItem>
              {classes.length > 0 &&
                classes.map((classItem) => (
                  <MenuItem value={classItem?._id} key={classItem?._id}>
                    {classItem?.title}
                  </MenuItem>
                ))}
            </Select>
          </div>
        )}
        {showBatch && (
          <div className="dropDown">
            <Select
              id="demo-simple-select"
              defaultValue={null}
              // label="Age"
              displayEmpty
              name="batch"
              fullWidth
              size="small"
              onChange={handleChange}
            >
              <MenuItem value={filter?.batch} disabled>
                Select Batch
              </MenuItem>
              {batches.length > 0 ?
                batches.map((batchItem) => (
                  <MenuItem value={batchItem?._id} key={batchItem?._id}>
                    {batchItem?.title}
                  </MenuItem>
                ))
                :
                <MenuItem value="0" disabled>
                Select Class First
              </MenuItem>
              }

            </Select>
          </div>
        )}
      </div>
    </div>
  )
}
