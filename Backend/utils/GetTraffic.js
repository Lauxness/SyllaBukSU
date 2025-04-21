const TrafficModel = require("../model/trafficModel");
const GetTraffic = async () => {
  const traffic = await TrafficModel.find();
  const today = new Date();
  const trafficByRequest = {
    description: { daily: {}, monthly: {}, yearly: {} },
    course_outcomes: { daily: {}, monthly: {}, yearly: {} },
    learning_outcomes: { daily: {}, monthly: {}, yearly: {} },
    all_in_one: { daily: {}, monthly: {}, yearly: {} },
  };
  const last10Days = [];
  const last12Months = [];
  const last10Years = [];

  for (let i = 9; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const dayKey = `${day.getFullYear()}-${(day.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${day.getDate().toString().padStart(2, "0")}`;
    last10Days.push(dayKey);
  }

  for (let i = 0; i < 12; i++) {
    const monthKey = `${today.getFullYear()}-${(i + 1)
      .toString()
      .padStart(2, "0")}`;
    last12Months.push(monthKey);
  }

  for (let i = 9; i >= 0; i--) {
    last10Years.push((today.getFullYear() - i).toString());
  }
  traffic.forEach((entry) => {
    const date = new Date(entry.createdAt);
    const dayKey = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    const yearKey = date.getFullYear().toString();
    if (trafficByRequest[entry.requestName]) {
      if (last10Days.includes(dayKey)) {
        trafficByRequest[entry.requestName].daily[dayKey] =
          (trafficByRequest[entry.requestName].daily[dayKey] || 0) + 1;
      }
      if (last12Months.includes(monthKey)) {
        trafficByRequest[entry.requestName].monthly[monthKey] =
          (trafficByRequest[entry.requestName].monthly[monthKey] || 0) + 1;
      }
      if (last10Years.includes(yearKey)) {
        trafficByRequest[entry.requestName].yearly[yearKey] =
          (trafficByRequest[entry.requestName].yearly[yearKey] || 0) + 1;
      }
    }
  });
  const responseData = {
    description: {
      daily: last10Days.map((date) => ({
        date: date,
        count: trafficByRequest.description.daily[date] || 0,
      })),
      monthly: last12Months.map((month) => ({
        month: month,
        count: trafficByRequest.description.monthly[month] || 0,
      })),
      yearly: last10Years.map((year) => ({
        year: year,
        count: trafficByRequest.description.yearly[year] || 0,
      })),
    },
    course_outcomes: {
      daily: last10Days.map((date) => ({
        date: date,
        count: trafficByRequest.course_outcomes.daily[date] || 0,
      })),
      monthly: last12Months.map((month) => ({
        month: month,
        count: trafficByRequest.course_outcomes.monthly[month] || 0,
      })),
      yearly: last10Years.map((year) => ({
        year: year,
        count: trafficByRequest.course_outcomes.yearly[year] || 0,
      })),
    },
    learning_outcomes: {
      daily: last10Days.map((date) => ({
        date: date,
        count: trafficByRequest.learning_outcomes.daily[date] || 0,
      })),
      monthly: last12Months.map((month) => ({
        month: month,
        count: trafficByRequest.learning_outcomes.monthly[month] || 0,
      })),
      yearly: last10Years.map((year) => ({
        year: year,
        count: trafficByRequest.learning_outcomes.yearly[year] || 0,
      })),
    },
    all_in_one: {
      daily: last10Days.map((date) => ({
        date: date,
        count: trafficByRequest.all_in_one.daily[date] || 0,
      })),
      monthly: last12Months.map((month) => ({
        month: month,
        count: trafficByRequest.all_in_one.monthly[month] || 0,
      })),
      yearly: last10Years.map((year) => ({
        year: year,
        count: trafficByRequest.all_in_one.yearly[year] || 0,
      })),
    },
  };
  return responseData;
};

module.exports = { GetTraffic };
