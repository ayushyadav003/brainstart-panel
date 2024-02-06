import "./dashboard.module.scss";

const classes = [
  { title: "10th", totalStudents: "20", batches: "4", bg: "#7a6038" },
  { title: "11th", totalStudents: "20", batches: "4", bg: "#7e4b34" },
  { title: "12th", totalStudents: "20", batches: "4", bg: "#ce796b" },
];

function Dashboard() {
  return (
    <div className="dashboardContainer">
      {classes.map((classInfo, i) => (
        <div
          key={i}
          className="cardsWrapper"
          style={{ background: classInfo.bg }}
        >
          <p className="mainTitle"> {classInfo.title}</p>
          <div className="innerInfo">
            <div>
              <div>
                <span className="title">Total students:</span>
                <span className="titleInfo">{classInfo.totalStudents}</span>
              </div>
              <div>
                <span className="title">Total Batches:</span>
                <span className="titleInfo">{classInfo.batches}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
