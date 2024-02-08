import { useState } from "react";
import "../classes.scss";
import AddPopup from "../../../../components/addPopup/AddPopup";
import { KeyboardDoubleArrowRight, School } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Filter from "../../../../components/filter/Filter";
// import { Divider } from '@mui/material'

const classes = [
  {
    title: "Science",
    totalStudents: "20",
    from: "3pm",
    to: "4pm",
    bg: "#ce796b",
  },
  {
    title: "Maths",
    totalStudents: "20",
    from: "3pm",
    to: "4pm",
    bg: "#7a6038",
  },
  {
    title: "Accounts",
    totalStudents: "20",
    from: "3pm",
    to: "4pm",
    bg: "#7e4b34",
  },
  {
    title: "Economics",
    totalStudents: "20",
    from: "3pm",
    to: "4pm",
    bg: "#ce796b",
  },
  {
    title: "Business",
    totalStudents: "20",
    from: "3pm",
    to: "4pm",
    bg: "#7a6038",
  },
];

function Batches() {
  const [addClass, setAddClass] = useState(false);
  const [filter, setFilter] = useState({ search: "" });

  const router = useNavigate;

  return (
    <div className="classContainer">
      <Filter
        showBack={true}
        heading="All Batches"
        type="classes"
        filter={filter}
        setFilter={setFilter}
      />
      <div className="cardsWrapper">
        {classes.map((classInfo, i) => (
          <div
            key={i}
            className="cardWrapper"
            style={{
              color: classInfo.bg,
            }}
            onClick={() => ""}
          >
            <p> {classInfo.title}</p>
            <span> Total Students : 10</span>
            <div
              style={{
                background: classInfo.bg,
              }}
              onClick={() => router.push("classes/batches")}
            >
              Details <KeyboardDoubleArrowRight />
            </div>
          </div>
        ))}
      </div>

      <AddPopup type="class" open={addClass} setOpen={setAddClass} />
    </div>
  );
}

export default Batches;
