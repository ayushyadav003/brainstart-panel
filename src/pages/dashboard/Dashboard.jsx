import LineChart from '../../components/Charts/LineChart'

export function Dashboard() {
  return (
    <div className="dashboardContainer">
      <div className="inner1">
        <div className="chartWrapper">
          <LineChart />
          {/* <DoughnutChart /> */}
        </div>
      </div>
    </div>
  )
}
