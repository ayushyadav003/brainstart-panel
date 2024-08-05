import {
  Dashboard,
  LibraryBooks,
  PointOfSale,
  School,
  VideoCall,
  Description,
  Ballot,
  SupportAgent,
  NotificationsActive,
} from "@mui/icons-material/";
import "./sidebar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setUserData } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const sidebarOptions = [
  { title: "Analytics", icon: <Dashboard />, link: "/analytics" },
  { title: "Classes", icon: <LibraryBooks />, link: "/classes" },
  { title: "Schedule", icon: <VideoCall />, link: "/scheduled-classes" },
  { title: "Teachers", icon: <School />, link: "/teachers" },
  { title: "Students", icon: <School />, link: "/students" },
  { title: "Notes", icon: <Description />, link: "/notes" },
  { title: "Attendance", icon: <Ballot />, link: "/attendance" },
  { title: "Accounts", icon: <PointOfSale />, link: "/accounts" },
  { title: "Support", icon: <SupportAgent />, link: "/support" },
  { title: "Notice", icon: <NotificationsActive />, link: "/notice" },
];

function Sidebar() {
  const pathname = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const userData = localStorage.getItem("dashboard-currentUser");
    console.log();
    if (userData) {
      dispatch(setUserData(JSON.parse(userData).foundUser));
    }
  }, []);

  return (
    <>
      <div className="sidebarContainer" >
        <div className="dp" onClick={() => navigate('/profile')}>
          <img src="/account.png" />
          <p>{currentUser?.fullName || currentUser?.ownerName}</p>
        </div>
        <div className="sidebarOptions">
          {sidebarOptions.map((option, i) => {
            return (
              <Link to={option.link} key={i}>
                <div
                  className={"options"}
                  style={{
                    color: option.link === pathname.pathname ? "black" : "gray",
                  }}
                >
                  <span>{option.icon}</span>
                  <p>{option.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mobiletouchBar">
        {sidebarOptions.map((option, i) => {
          return (
            <Link to={option.link} key={i}>
              <div
                className={"options"}
                style={{
                  color: option.link === pathname.pathname ? "black" : "gray",
                }}
              >
                <span>{option.icon}</span>
                <p>{option.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Sidebar;
