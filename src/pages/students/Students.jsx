import { useState } from "react";
import { Button } from "@mui/material";
import { ApiWithOutToken } from "../../services/ApiWithoutToken";
import { apiConfig } from "../../services/ApiConfig";
import AddPopup from "../../components/addPopup/AddPopup";
import Filter from "../../components/filter/Filter";
import CommonTable from "../../components/table/Table";
import "./students.scss";

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
  const [filter, setFilter] = useState({ search: "", class: "", batch: "" });
  const [newStudent, setNewStudent] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    class: "",
    batch: "",
  });

  const header = ["Sno.", "Name", "Phone", "Class", "Batch"];

  const addNewStudent = async () => {
    const apiOptions = {
      method: "POST",
      url: apiConfig?.student,
      data: newStudent,
    };
    const data = await ApiWithOutToken();
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
      <Filter
        showBack={false}
        heading="All Students"
        type="student"
        showClass={true}
        showBatch={true}
        filter={filter}
        setFilter={setFilter}
      />
      <div id="addStudent">
        <Button variant="contained">Add New Student</Button>
      </div>
      <div className="studentWrapper">
        <CommonTable head={header} rows={studentData} type="students" />
      </div>
    </div>
  );
}
