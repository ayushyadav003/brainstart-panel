// import { Add } from '@mui/icons-material'
import { Button } from "@mui/material";
import Filter from "../../components/filter/Filter";
import "./scheduledClasses.scss";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiConfig } from "../../services/ApiConfig";
import { ApiWithToken } from "../../services/ApiWithToken";
import { useSelector } from "react-redux";
import AddMeetingPopup from "../../components/addPopup/AddMeetingPopup";

export default function ScheduledClass() {
  const [addMeeting, setAddMeeting] = useState(false);
  const [meetingsList, setMeetingsList] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [filter, setFilter] = useState({
    class: null,
    batch: null,
    search: "",
  });

  const getAllMeetings = async () => {
    try {
      const apiOPtions = {
        method: "GET",
        url: apiConfig.meetings,
        params: { instituteId: currentUser?._id },
      };
      const response = await ApiWithToken(apiOPtions);

      if (response?.statusCode === 200) {
        setMeetingsList(response?.meetings);
      }
    } catch (error) {
      toast.warning(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (currentUser?._id) {
      getAllMeetings();
    }
  }, [currentUser]);
  return (
    <div className="scheduleContainer">
      <Filter
        type="schedule"
        heading="Classes Scheduled"
        showBack={false}
        showClass={true}
        showBatch={true}
        filter={filter}
        setFilter={setFilter}
      />
      <div className="Scheduletable">
        <div className="card addCard" onClick={() => setAddMeeting(true)}>
          <Add fontSize="large" />
        </div>
        {meetingsList.length > 0 &&
          meetingsList.map((data, i) => (
            <div key={i} className="card">
              <div>
                <p>{data?.classId[0]?.title}</p>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/zoom.png"
                  alt="zoom"
                />
              </div>
              <p>{data?.batch[0]?.title}</p>
              <div>Remote - 4pm - 6pm</div>
              <Button variant="contained">Join</Button>
            </div>
          ))}
      </div>
      <AddMeetingPopup open={addMeeting} setOpen={setAddMeeting} />
    </div>
  );
}
