import React, { useState, useEffect } from "react";
import Traffic from "./charts/Traffic";
import styles from "./style.module.css";
import { DownloadReport, GetDashboard } from "../../api";
import UserTable from "./tables/UsersTable";
import PieChart from "./Charts/PieChart";
import BarChart from "./Charts/BarChart";
import TotalUsersPic from "../../assets/TotalUsers.png";
import TrafficPic from "../../assets/traffic.png";
import Folder from "../../assets/folder1.webp";
import ActiveUsers from "./Modals/ActiveUsers/ActiveUsers";
import PieChartProgram from "./Charts/PieChartProgram";
import UsersPerCollege from "./Modals/UsersPerCollege/UsersPerCollege";
import { MdDownload } from "react-icons/md";
import Users from "./Modals/Users/Users";
import LoginFrequency from "./Charts/LoginFrequency";
import LoginFrequencyPerCollege from "./Modals/LoginFrequencyPerCollege/LoginFrequencyPerCollege";
import generateCourseOutcomesTable from "../../Handler/SaveDocxsHandler";
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
  const [isLoading, setIsLoading] = useState(true);
  const [traffic, setTraffic] = useState();
  const [users, setUsers] = useState();
  const [totalDescription, setTotalDescription] = useState();
  const [totalCos, setTotalCos] = useState();
  const [totalSLOs, setTotalSLOs] = useState();
  const [totalAIO, setTotalAIO] = useState();
  const [totalRequest, setTotalRequest] = useState();
  const [savedPrompts, setSavedPrompts] = useState();
  const [totalCOE, setTotalCOE] = useState();
  const [totalCON, setTotalCON] = useState();
  const [totalCOT, setTotalCOT] = useState();
  const [totalCPAG, setTotalCPAG] = useState();
  const [totalCAS, setTotalCAS] = useState();
  const [totalCOB, setTotalCOB] = useState();
  const [isTriggeredActiveUsers, setIsTriggeredActiveUsers] = useState(false);
  const [isTriggeredUsers, setIsTriggeredUsers] = useState(false);
  const [isTriggerUsersPerCollege, setTriggerUsersPerCollege] = useState(false);
  const [loginFrequency, setLoginFrequency] = useState();
  const [activities, setActivities] = useState();
  const [userCountsPerCollege, setUserCountsPerCollege] = useState([]);
  const [isTriggeredActiveLoginFrequency, setIsTriggeredActiveLoginFrequency] =
    useState();
  const today = new Date();
  const handleDownloadReport = async (e) => {
    e.stopPropagation();
    const data = [
      ["College", "Total Users"],
      ["College of Bussiness Users", totalCOB],
      ["College of Arts and Science Users", totalCAS],
      ["College of Technology Users", totalCOT],
      ["College of Education Users", totalCOE],
      ["College of Nursing Users", totalCON],
      ["College of Public Administration and Governance Users", totalCPAG],
    ];
    try {
      const response = await DownloadReport(data);

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to download report:", err);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Program",
      selector: (row) => row.program || "N/A",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) =>
        row.activeUntil && new Date(row.activeUntil) > new Date()
          ? "Active"
          : "Inactive",
      sortable: true,
    },
  ];

  const handleTriggerUsersPerCollege = () => {
    if (isTriggerUsersPerCollege) {
      setTriggerUsersPerCollege(false);
    } else {
      setTriggerUsersPerCollege(true);
    }
  };
  const handleTriggerActiveUsers = () => {
    if (isTriggeredActiveUsers) {
      setIsTriggeredActiveUsers(false);
    } else {
      setIsTriggeredActiveUsers(true);
    }
  };
  const handleTriggerUsers = () => {
    if (isTriggeredUsers) {
      setIsTriggeredUsers(false);
    } else {
      setIsTriggeredUsers(true);
    }
  };
  const handleTriggerActiveLoginFrequency = () => {
    if (isTriggeredActiveLoginFrequency) {
      setIsTriggeredActiveLoginFrequency(false);
    } else {
      setIsTriggeredActiveLoginFrequency(true);
    }
  };

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
      setTotalCAS(data.collegeCounts.cas);
      setTotalCOB(data.collegeCounts.cob);
      setTotalCON(data.collegeCounts.con);
      setTotalCOT(data.collegeCounts.cot);
      setTotalCOE(data.collegeCounts.coe);
      setTotalCPAG(data.collegeCounts.cpag);
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
      setLoginFrequency(data.loginFrequency);
      setUserCountsPerCollege(data.userPerCourse);
      setActivities(data.activities);
      console.log(data.activities);
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
    <>
      <div className={styles.trafficContainer}>
        <div className={styles.twoCharts}>
          <div
            style={{ width: "100%", height: "100px", padding: "20px" }}
            className={styles.summaryContainer}
            onClick={handleTriggerUsers}
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
            onClick={handleTriggerActiveUsers}
          >
            <div className={styles.imageContainer}>
              <img src={TotalUsersPic} alt="" />
            </div>
            <div className={styles.detailContainer}>
              <p>Active users</p>
              <p style={{ fontSize: "1.6em", fontWeight: 500 }}>
                {users
                  ? users.filter(
                      (user) =>
                        user.activeUntil &&
                        new Date(user.activeUntil) > new Date()
                    ).length
                  : 0}
              </p>
            </div>
          </div>
          <div
            style={{ width: "100%", height: "100px", padding: "20px" }}
            className={styles.summaryContainer}
            onClick={() => generateCourseOutcomesTable()}
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
            onClick={handleTriggerUsersPerCollege}
          >
            <div className={styles.heading}>
              <p>Total User per College</p>
              <button onClick={(e) => handleDownloadReport(e)}>
                <MdDownload size={15} color="white" />
              </button>
            </div>
            {isLoading ? (
              ""
            ) : (
              <div style={{ width: "100%", height: "100%", padding: "20px" }}>
                <PieChartProgram
                  totalCOE={totalCOE}
                  totalCPAG={totalCPAG}
                  totalCAS={totalCAS}
                  totalCOB={totalCOB}
                  totalCOT={totalCOT}
                  totalCON={totalCON}
                />
              </div>
            )}
          </div>
          <div
            style={{ width: "100%", height: "300px", padding: "20px" }}
            className={styles.chartContainer}
            onClick={handleTriggerActiveLoginFrequency}
          >
            <div className={styles.heading}>
              <p>Daily Login Frequency</p>
              <button>
                <MdDownload size={15} color="white" />
              </button>
            </div>
            {isLoading ? (
              ""
            ) : (
              <div style={{ width: "100%", height: "100%", padding: "20px" }}>
                <LoginFrequency
                  labels={last10Days}
                  loginFrequency={loginFrequency}
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles.twoCharts}>
          <div
            style={{ width: "100%", height: "300px", padding: "20px" }}
            className={styles.chartContainer}
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
          <UserTable users={users} title="User List" columns={columns} />
        </div>
      </div>

      {isTriggeredActiveUsers && (
        <ActiveUsers handleTrigger={handleTriggerActiveUsers} users={users} />
      )}
      {isTriggeredUsers && (
        <Users handleTrigger={handleTriggerUsers} users={users} />
      )}
      {isTriggerUsersPerCollege &&
        (isLoading ? (
          ""
        ) : (
          <UsersPerCollege
            userCountsPerCollege={userCountsPerCollege}
            handleTriggerUsersPerCollege={handleTriggerUsersPerCollege}
          />
        ))}
      {isTriggeredActiveLoginFrequency &&
        (isLoading ? (
          ""
        ) : (
          <LoginFrequencyPerCollege
            activities={activities}
            handleTriggerActiveLoginFrequency={
              handleTriggerActiveLoginFrequency
            }
          />
        ))}
    </>
  );
}

export default Dashboard;
