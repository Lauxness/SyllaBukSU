const { response } = require("express");
const Accounts = require("../model/accountsModel");
const SavedPrompts = require("../model/savedPromptsModel");
const { GetTraffic } = require("../utils/GetTraffic");
const { GetLoginFrequency } = require("../utils/GetLoginFrequency");

const GetDashboard = async (req, res) => {
  try {
    const traffic = await GetTraffic();
    const users = await Accounts.find();

    const bsitCount = users.filter((user) => user.program === "BSIT").length;
    const emcCount = users.filter((user) => user.program === "BSEMC").length;
    const savedPrompts = await SavedPrompts.find();
    const loginFrequency = await GetLoginFrequency();

    const dashboardData = {
      loginFrequency,
      traffic,
      users,
      savedPrompts,
      programCounts: {
        bsit: bsitCount,
        bsemc: emcCount,
      },
    };

    return res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Error fetching traffic data:", error);
    return res.status(500).json({ error: "Failed to fetch traffic data" });
  }
};

module.exports = { GetDashboard };
