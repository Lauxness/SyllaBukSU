const Activities = require("../model/userActivityModel");

const GetLoginFrequency = async () => {
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 9);

  const loginFrequency = await Activities.aggregate([
    {
      $match: {
        component: "Login",
        createdAt: { $gte: tenDaysAgo },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
  const result = [];
  for (let i = 0; i < 10; i++) {
    const date = new Date(tenDaysAgo);
    date.setDate(tenDaysAgo.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];

    // Find count from aggregation, or default to 0
    const record = loginFrequency.find((d) => d._id === dateStr);
    result.push({
      date: dateStr,
      count: record ? record.count : 0,
    });
  }
  return result;
};
module.exports = { GetLoginFrequency };
