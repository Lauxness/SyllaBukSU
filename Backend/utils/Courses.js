function GetCourse(college) {
  const CAS = [
    "Bachelor of Arts in Economics",
    "Bachelor of Arts in English Language",
    "Bachelor of Arts in Philosophy Pre-Law",
    "Bachelor of Arts in Philosophy Teaching Track",
    "Bachelor of Arts in Sociology",
    "Bachelor of Science in Biology Major in Biotechnology",
    "Bachelor of Science in Community Development",
    "Bachelor of Science in Development Communication",
    "Bachelor of Science in Environmental Science major in Environmental Heritage Studies",
    "Bachelor of Science in Mathematics",
  ];
  const COB = [
    "Bachelor of Science in Accountancy",
    "Bachelor of Science in Business Administration major in Financial Management",
    "Bachelor of Science in Hospitality Management",
  ];
  const COE = [
    "Bachelor of Early Childhood Education",
    "Bachelor of Elementary Education",
    "Bachelor of Physical Education",
    "Bachelor of Secondary Education",
  ];
  const CON = ["Bachelor of Science in Nursing"];
  const COT = [
    "Bachelor of Science in Automotive Technology",
    "Bachelor of Science in Electronics Technology",
    "Bachelor of Science in Entertainment and Multimedia Computing Major in Digital Animation Technology",
    "Bachelor of Science in Food Technology",
    "Bachelor of Science in Information Technology",
  ];
  const CPAG = ["Bachelor of Public Administration"];

  switch (college) {
    case "College of Technology":
      return COT;
    case "College of Business":
      return COB;
    case "College of Public Administration and Governance":
      return CPAG;
    case "College of Nursing":
      return CON;
    case "College of Education":
      return COE;
    case "College of Arts and Sciences":
      return CAS;
    default:
      return "";
  }
}
module.exports = { GetCourse };
