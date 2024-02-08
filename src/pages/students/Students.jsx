import React, { useState } from "react";
// import CommonTable from '../../../components/common/Table'
import "./students.module.scss";
import {
  Autocomplete,
  Button,
  Dialog,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddPopup from "@/components/addPopup/AddPopup";
import { useRouter } from "next/navigation";
import { Search } from "@mui/icons-material";
import { ApiWithToken } from "../../../services/ApiWithToken";
import { apiConfig } from "../../../services/ApiConfig";

const studentData = [
  {
    id: 5,
    name: "Ayush4",
    phone: "9958109872",
    class: "12th",
    batch: "04:00-05:00",
  },
  {
    id: 5,
    name: "Ayush4",
    phone: "9958109872",
    class: "12th",
    batch: "04:00-05:00",
  },
  {
    id: 5,
    name: "Ayush4",
    phone: "9958109872",
    class: "12th",
    batch: "04:00-05:00",
  },
];
export default function Student() {
  const [addStudent, setAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    class: "",
    batch: "",
  });
  const router = useRouter();

  const header = ["Sno.", "Name", "Phone", "Class", "Batch"];

  const addNewStudent = async () => {
    const apiOptions = {
      method: "POST",
      url: apiConfig?.student,
      data: newStudent,
    };
    const data = await ApiWithToken();
  };

  return (
    <div className="studentsContainer">
      <AddPopup
        type="students"
        open={addStudent}
        setOpen={setAddStudent}
        setvalues={setNewStudent}
        values={newStudent}
        action
      />
      <div className="header">
        <h1>Students</h1>
        <div>
          <TextField
            placeholder="name / email / phone"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Class</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={""}
              label="Class"
              // onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>10th</MenuItem>
              <MenuItem value={20}>11th</MenuItem>
              <MenuItem value={30}>12th</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Batch</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={""}
              label="Batch"
              // onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>04:00-05:00</MenuItem>
              <MenuItem value={20}>05:00-06:00</MenuItem>
              <MenuItem value={30}>06:00-07:00</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            // style={{ marginLeft: 'auto' }}
            onClick={() => setAddStudent(true)}
          >
            New student
          </Button>
        </div>
      </div>
      <div className="studentWrapper">
        <CommonTable head={header} rows={studentData} type="students" />
      </div>
    </div>
  );
}
