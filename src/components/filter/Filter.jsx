import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ArrowBack, Search } from "@mui/icons-material";
import "./filter.scss";
import { useNavigate } from "react-router-dom";

export default function Filter({
  showBack,
  showClass,
  showBatch,
  heading,
  type,
  filter,
  setFilter,
}) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  const searchBarPlaceholder = () => {
    switch (type) {
      case "classes":
        return "Class Name";
      case "students":
        return "Name/ Email/ Phone";
      case "batches":
        return "Batch name";
      default:
        return "Search here...";
    }
  };
  return (
    <div className="filterContainer">
      <div className="heading">
        {showBack && (
          <ArrowBack
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          />
        )}
        <h1>{heading}</h1>
      </div>
      <div className="filter">
        <TextField
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
        {showClass && (
          <div className="dropDown">
            <Select
              id="demo-simple-select"
              value={""}
              // label="Age"
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
        )}
        {showBatch && (
          <div className="dropDown">
            <Select
              id="demo-simple-select"
              value={""}
              // label="Age"
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
        )}
      </div>
    </div>
  );
}
