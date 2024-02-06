"use client";
import React, { useState } from "react";
// import CommonTable from "../../../components/common/Table";
import "./accounts.module.scss";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddPopup from "../../components/addPopup/AddPopup";

const studentData = [
  {
    id: 1,
    name: "Ayush",
    class: "12th",
    batch: "04:00-05:00",
    record: "750",
    status: "paid",
    currentMonth: "paid",
  },
];
export default function Accounts() {
  const [addAccount, setAddAccount] = useState(false);

  const header = [
    "Sno.",
    "Name",
    "Class",
    "Batch",
    "Fee",
    // 'Last 3 months',
    "Current Month",
  ];

  return (
    <div className="accountContainer">
      <AddPopup type="attendance" open={addAccount} setOpen={setAddAccount} />
      <div className="header">
        <h2 className="leftContent">Accounts</h2>
        <div className="rightContent">
          <TextField placeholder="Search with student name/username" />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="attendanceWrapper">
        {/* <CommonTable head={header} rows={studentData} type="accounts" /> */}
      </div>
    </div>
  );
}
