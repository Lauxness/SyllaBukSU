const { response } = require("express");
const Accounts = require("../model/accountsModel");
const SavedPrompts = require("../model/savedPromptsModel");
const { GetTraffic } = require("../utils/GetTraffic");

const GetDashboard = async (req, res) => {
  try {
    const traffic = await GetTraffic();
    const users = await Accounts.find();
    const savedPrompts = await SavedPrompts.find();
    const dashboardData = { traffic, users, savedPrompts };

    return res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Error fetching traffic data:", error);
    return res.status(500).json({ error: "Failed to fetch traffic data" });
  }
};

module.exports = { GetDashboard };
