const { response } = require("express");
const Accounts = require("../model/accountsModel");
const SavedPrompts = require("../model/savedPromptsModel");
const UserActivities = require("../model/userActivityModel");
const { GetTraffic } = require("../utils/GetTraffic");
const { GetLoginFrequency } = require("../utils/GetLoginFrequency");
const { GetCourse } = require("../utils/Courses");
const DownloadReport = require("../utils/DownloadReportPdf");

const GetDashboard = async (req, res) => {
  const colleges = [
    "College of Arts and Sciences",
    "College of Business",
    "College of Education",
    "College of Nursing",
    "College of Technology",
    "College of Public Administration and Governance",
  ];

  try {
    const traffic = await GetTraffic();
    const users = await Accounts.find();

    const cobCount = users.filter(
      (user) => user.college === "College of Business"
    ).length;
    const cotCount = users.filter(
      (user) => user.college === "College of Technology"
    ).length;
    const cpagCount = users.filter(
      (user) =>
        user.college === "College of Public Administration and Governance"
    ).length;
    const casCount = users.filter(
      (user) => user.college === "College of Arts and Sciences"
    ).length;
    const conCount = users.filter(
      (user) => user.college === "College of Nursing"
    ).length;
    const coeCount = users.filter(
      (user) => user.college === "College of Education"
    ).length;
    const savedPrompts = await SavedPrompts.find();
    const loginFrequency = await GetLoginFrequency();
    const activities = await UserActivities.find({
      component: "Login",
    }).populate("userId");
    const userPerCourse = [];
    colleges.forEach((college) => {
      const courses = GetCourse(college);
      const counts = courses.map(
        (course) => users.filter((user) => user.program === course).length
      );
      userPerCourse.push(counts);
    });

    const dashboardData = {
      loginFrequency,
      traffic,
      users,
      activities,
      savedPrompts,
      userPerCourse,
      collegeCounts: {
        cob: cobCount || 0,
        coe: coeCount || 0,
        cas: casCount || 0,
        cpag: cpagCount || 0,
        cot: cotCount || 0,
        con: conCount || 0,
      },
    };

    return res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Error fetching traffic data:", error);
    return res.status(500).json({ error: "Failed to fetch traffic data" });
  }
};

const DonwloadReport = async (req, res) => {
  const data = req.body;
  const pdf = new DownloadReport();
  const date = new Date().toLocaleDateString();
  try {
    pdf.addHeader(date, data);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

    pdf.doc.pipe(res);
    pdf.doc.end();
  } catch (error) {
    console.log(error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = { GetDashboard, DonwloadReport };
