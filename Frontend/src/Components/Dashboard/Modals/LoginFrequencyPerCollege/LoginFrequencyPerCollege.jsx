import Swal from "sweetalert2";
import styles from "./style.module.css";
import { MdOutlineClose } from "react-icons/md";
import CustomeDateDataHandler from "../../../../Handler/CustomDateDataHandler";
import UserTable from "../../tables/UsersTable";
import { useEffect, useState } from "react";
import moment from "moment";
import BarChart from "./Charts/BarChart";

function LoginFrequencyPerCollege(props) {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState();
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [quarter, setQuarter] = useState();
  const [day, setDay] = useState();
  const [maxDay, setMaxDay] = useState();
  const [totalCOE, setTotalCOE] = useState();
  const [totalCON, setTotalCON] = useState();
  const [totalCOT, setTotalCOT] = useState();
  const [totalCPAG, setTotalCPAG] = useState();
  const [totalCAS, setTotalCAS] = useState();
  const [totalCOB, setTotalCOB] = useState();

  const handleTotalPerCollege = (allUsers) => {
    setTotalCPAG(
      allUsers.filter(
        (user) =>
          user.college === "College of Public Administration and Governance"
      ).length || 0
    );
    setTotalCOE(
      allUsers.filter((user) => user.college === "College of Education")
        .length || 0
    );
    setTotalCOT(
      allUsers.filter((user) => user.college === "College of Technology")
        .length || 0
    );
    setTotalCON(
      allUsers.filter((user) => user.college === "College of Nursing").length ||
        0
    );
    setTotalCAS(
      allUsers.filter((user) => user.college === "College of Arts and Science")
        .length || 0
    );
    setTotalCOB(
      allUsers.filter((user) => user.college === "College of Business")
        .length || 0
    );
  };
  const today = moment().format("YYYY-MM-DD");

  const handleDefault = (date) => {
    const todayUsers = props.activities.filter((activity) => {
      const activityDate = moment(activity.createdAt).format("YYYY-MM-DD");
      return activity.component === "Login" && activityDate === date;
    });
    const uniqueUsersMap = new Map();
    todayUsers.forEach((a) => {
      const user = a.userId;
      if (!uniqueUsersMap.has(user._id)) {
        uniqueUsersMap.set(user._id, user);
      }
    });

    handleTotalPerCollege(Array.from(uniqueUsersMap.values()));
    setUsers(Array.from(uniqueUsersMap.values()));
    setTotal(Array.from(uniqueUsersMap.values()).length);
  };

  useEffect(() => {
    handleDefault(today);
  }, [props.activities]);

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
      name: "College",
      selector: (row) => row.college || "N/A",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) =>
        row.activeUntil && new Date(row.activeUntil) > new Date()
          ? "Active"
          : "Inactive",
      sortable: true,
      center: true,
    },
  ];

  const grouped = CustomeDateDataHandler(props.activities);

  const handleYearChange = (value) => {
    const currentUsers = grouped.annually[value] || [];
    console.log(currentUsers.length);
    setMonth("");
    setQuarter("");
    setDay("");
    handleTotalPerCollege(currentUsers);
    setYear(value);
    setTotal(currentUsers.length);
    setUsers(currentUsers);
  };
  const handleMonthChange = (value) => {
    let currentUsers;
    console.log(year);

    if (day) {
      const input = `${year}-${value}-${day}`;
      const date = new Date(input);
      const formatted = date.toISOString().split("T")[0];
      handleDefault(formatted);
      setMonth(value);
      return;
    }
    if (!year) {
      currentUsers = grouped.monthly[`${value} 2025`] || [];
    } else {
      currentUsers = grouped.monthly[`${value} ${year}`] || [];
    }
    setMonth(value);
    handleTotalPerCollege(currentUsers);
    console.log(currentUsers.length);
    setTotal(currentUsers.length);
    setUsers(currentUsers);
  };
  const handleDayChange = (value) => {
    if (!year) {
      setYear(new Date().getFullYear());
    }
    if (!month) {
      const today = new Date();
      setMonth(String(today.getMonth() + 1).padStart(2, "0"));
    }
    const input = `${year}-${month}-${value}`;
    const date = new Date(input);
    const formatted = date.toISOString().split("T")[0];
    console.log(formatted);
    setDay(value);
    handleDefault(formatted);
  };
  const handleQuarterChange = (value) => {
    let currentUsers;
    if (!year) {
      currentUsers = grouped.quarterly[`${value} 2025`] || [];
    } else {
      currentUsers = grouped.quarterly[`${value} ${year}`] || [];
    }
    setDay("");
    setMonth("");
    setTotal(currentUsers.length);
    handleTotalPerCollege(currentUsers);
    setUsers(currentUsers);
    setQuarter(value);
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p>Login Frequency</p>
            <MdOutlineClose
              fontSize={25}
              cursor={"pointer"}
              onClick={props.handleTriggerActiveLoginFrequency}
            />
          </div>
          <div className={styles.bottomContainer}>
            <div className={styles.heading}>
              <input
                type="number"
                min="1900"
                max="2100"
                step="1"
                value={year}
                placeholder="Select year"
                onChange={(e) => handleYearChange(e.target.value)}
              />

              <select
                value={month}
                onChange={(e) => handleMonthChange(e.target.value)}
              >
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              <input
                type="number"
                min="1"
                max="31"
                step="1"
                value={day}
                placeholder="Select day"
                onChange={(e) => handleDayChange(e.target.value)}
              />
              <select
                value={quarter}
                onChange={(e) => handleQuarterChange(e.target.value)}
              >
                <option value="">Select Quarter</option>
                <option value="Q1">Q1 (Jan - Mar)</option>
                <option value="Q2">Q2 (Apr - Jun)</option>
                <option value="Q3">Q3 (Jul - Sep)</option>
                <option value="Q4">Q4 (Oct - Dec)</option>
              </select>
            </div>
            <div className={styles.chartContainer}>
              <p>
                TOTAL <span>{total}</span>
              </p>
              <div className={styles.chartCanvas}>
                <div className={styles.chart}>
                  {totalCAS !== undefined ? (
                    <BarChart
                      totalCOE={totalCOE}
                      totalCOB={totalCOB}
                      totalCPAG={totalCPAG}
                      totalCAS={totalCAS}
                      totalCOT={totalCOT}
                      totalCON={totalCON}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className={styles.tableContainer}>
              <UserTable users={users} title="" columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginFrequencyPerCollege;
