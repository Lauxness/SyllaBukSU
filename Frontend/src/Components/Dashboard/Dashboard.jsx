import React, { useState, useEffect } from "react";
import Traffic from "./charts/Traffic";
import styles from "./style.module.css";
import { GetDashboard } from "../../api";
import UserTable from "./tables/UsersTable";
import PieChart from "./Charts/PieChart";
import BarChart from "./Charts/BarChart";
import TotalUsersPic from "../../assets/TotalUsers.png";
import TrafficPic from "../../assets/traffic.png";
import Folder from "../../assets/folder1.webp";
import SmoothLineChart from "./Charts/SmoothLineChart";
function Dashboard() {
  const [descriptionYearlyData, setDescriptionYearlyData] = useState([]);
  const [descriptionMonthlyData, seteDecriptionMonthlyData] = useState([]);
  const [descriptionDailyData, setDecriptionDailyData] = useState([]);
  const [COYearlyData, setCOYearlyData] = useState([]);
  const [COMonthlyData, setCOMonthlyData] = useState([]);
  const [CODailyData, setCODailyData] = useState([]);
  const [SLOYearlyData, setSLOYearlyData] = useState([]);
  const [SLOMonthlyData, seteSLOMonthlyData] = useState([]);
  const [SLODailyData, setSLODailyData] = useState([]);
  const [AIOYearlyData, setAIOYearlyData] = useState([]);
  const [AIOMonthlyData, seteAIOMonthlyData] = useState([]);
  const [AIODailyData, setAIODailyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [traffic, setTraffic] = useState();
  const [users, setUsers] = useState();
  const [totalDescription, setTotalDescription] = useState();
  const [totalCos, setTotalCos] = useState();
  const [totalSLOs, setTotalSLOs] = useState();
  const [totalAIO, setTotalAIO] = useState();
  const [totalRequest, setTotalRequest] = useState();
  const [savedPrompts, setSavedPrompts] = useState();
  const today = new Date();

  const last10Days = [];
  for (let i = 9; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const formattedDate =
      (day.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      day.getDate().toString().padStart(2, "0");

    last10Days.push(formattedDate);
  }

  const currentYear = new Date().getFullYear();
  const last10Years = [];
  for (let i = 0; i < 10; i++) {
    last10Years.push(currentYear - 9 + i);
  }
  const monthlyLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const handleGetDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await GetDashboard();
      const data = response.data;
      setTraffic(data);
      setUsers(data.users);
      console.log(data.traffic);
      setDescriptionYearlyData(data.traffic.description.yearly);
      seteDecriptionMonthlyData(data.traffic.description.monthly);
      setDecriptionDailyData(data.traffic.description.daily);
      setCOYearlyData(data.traffic.course_outcomes.yearly);
      setCOMonthlyData(data.traffic.course_outcomes.monthly);
      setCODailyData(data.traffic.course_outcomes.daily);
      setSLOYearlyData(data.traffic.learning_outcomes.yearly);
      seteSLOMonthlyData(data.traffic.learning_outcomes.monthly);
      setSLODailyData(data.traffic.learning_outcomes.daily);
      setAIOYearlyData(data.traffic.all_in_one.yearly);
      setAIODailyData(data.traffic.all_in_one.daily);
      seteAIOMonthlyData(data.traffic.all_in_one.monthly);
      setTotalDescription(calculateTotal(data.traffic.description));
      setTotalCos(calculateTotal(data.traffic.course_outcomes));
      setTotalSLOs(calculateTotal(data.traffic.learning_outcomes));
      setTotalAIO(calculateTotal(data.traffic.all_in_one));
      setTotalRequest(
        calculateTotal(data.traffic.description) +
          calculateTotal(data.traffic.course_outcomes) +
          calculateTotal(data.traffic.learning_outcomes) +
          calculateTotal(data.traffic.all_in_one)
      );
      setSavedPrompts(data.savedPrompts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleGetDashboardData();
  }, []);
  const calculateTotal = (sectionData) => {
    const yearlyTotal = sectionData.yearly.reduce(
      (sum, item) => sum + item.count,
      0
    );
    return yearlyTotal;
  };

  return (
    <div className={styles.trafficContainer}>
      <div className={styles.twoCharts}>
        <div
          style={{ width: "100%", height: "100px", padding: "20px" }}
          className={styles.summaryContainer}
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-duration="300"
        >
          <div className={styles.imageContainer}>
            <img src={TotalUsersPic} alt="" />
          </div>
          <div className={styles.detailContainer}>
            <p>Users </p>
            <p style={{ fontSize: "1.6em", fontWeight: 500 }}>
              {users ? Object.keys(users).length : 0}
            </p>
          </div>
        </div>
        <div
          style={{ width: "100%", height: "100px", padding: "20px" }}
          className={styles.summaryContainer}
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-duration="300"
        >
          <div className={styles.imageContainer}>
            <img src={TotalUsersPic} alt="" />
          </div>
          <div className={styles.detailContainer}>
            <p>Active users</p>
            <p style={{ fontSize: "1.6em", fontWeight: 500 }}>
              {users ? Object.keys(users).length : 0}
            </p>
          </div>
        </div>
        <div
          style={{ width: "100%", height: "100px", padding: "20px" }}
          className={styles.summaryContainer}
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-duration="300"
        >
          <div className={styles.imageContainer}>
            <img src={Folder} alt="" />
          </div>
          <div className={styles.detailContainer}>
            <p> Saved prompts </p>
            <p style={{ fontSize: "1.6em", fontWeight: 500 }}>
              {savedPrompts ? Object.keys(savedPrompts).length : 0}
            </p>
          </div>
        </div>
        <div
          style={{ width: "100%", height: "100px", padding: "20px" }}
          className={styles.summaryContainer}
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-duration="300"
        >
          <div className={styles.imageContainer}>
            <img src={TrafficPic} alt="" />
          </div>
          <div className={styles.detailContainer}>
            <p> Total Request </p>
            <p style={{ fontSize: "1.6em", fontWeight: 500 }}>
              {totalRequest ? totalRequest : 0}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.twoCharts}>
        <div
          style={{ width: "100%", height: "300px", padding: "20px" }}
          className={styles.chartContainer}
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-duration="300"
        >
          <p>Total Request Traffic per Component</p>
          {isLoading ? (
            ""
          ) : (
            <div style={{ width: "100%", height: "100%", padding: "20px" }}>
              <PieChart
                totalDescription={totalDescription}
                totalCOs={totalCos}
                totalSLOs={totalSLOs}
                totalAIO={totalAIO}
              />
            </div>
          )}
        </div>
        <div
          style={{ width: "100%", height: "300px", padding: "20px" }}
          className={styles.chartContainer}
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-duration="300"
        >
          <p>Total Saved Prompts per Component</p>
          {isLoading ? (
            ""
          ) : (
            <div style={{ width: "100%", height: "100%", padding: "20px" }}>
              <BarChart savedPrompts={savedPrompts} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.twoCharts}>
        <div
          style={{ width: "100%", height: "300px", padding: "20px" }}
          className={styles.chartContainer}
        >
          <p>Monthly Request Traffic</p>
          {isLoading ? (
            ""
          ) : (
            <div style={{ width: "100%", height: "100%", padding: "20px" }}>
              <Traffic
                labels={monthlyLabels}
                description={descriptionMonthlyData}
                courseOutcomes={COMonthlyData}
                learningOutcomes={SLOMonthlyData}
                allInOne={AIOMonthlyData}
              />
            </div>
          )}
        </div>
        <div
          style={{ width: "100%", height: "300px", padding: "20px" }}
          className={styles.chartContainer}
        >
          <p>Daily Request Traffic</p>
          {isLoading ? (
            ""
          ) : (
            <div style={{ width: "100%", height: "100%", padding: "20px" }}>
              <Traffic
                labels={last10Days}
                description={descriptionDailyData}
                courseOutcomes={CODailyData}
                learningOutcomes={SLODailyData}
                allInOne={AIODailyData}
              />
            </div>
          )}
        </div>
      </div>
      <div
        style={{ width: "100%", height: "300px", padding: "20px" }}
        className={styles.chartContainer}
      >
        <p>Yearly Request Traffic</p>
        {isLoading ? (
          ""
        ) : (
          <div style={{ width: "100%", height: "100%", padding: "20px" }}>
            <Traffic
              labels={last10Years}
              description={descriptionYearlyData}
              courseOutcomes={COYearlyData}
              learningOutcomes={SLOYearlyData}
              allInOne={AIOYearlyData}
            />
          </div>
        )}
      </div>
      <div className={styles.chartContainer}>
        <UserTable users={users} />
      </div>
    </div>
  );
}

export default Dashboard;
