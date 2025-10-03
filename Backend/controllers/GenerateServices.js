const axios = require("axios");
const { capitalizeWords } = require("../utils/Capitalize");
const Account = require("../model/accountsModel");
const TrafficModel = require("../model/trafficModel");

const Activity = require("../model/userActivityModel");
const base_url = process.env.GENERATOR_BASE_URL;
const GenerateDescription = async (req, res) => {
  const origin = req.path;
  const requestName = "description";
  const traffic = { origin, requestName };

  try {
    const { courseName } = req.body;
    const user = await Account.findOne({ email: req.user.email });
    if (!courseName) {
      return res.status(400).json({ error: "Course name is required" });
    }

    const prompt = `Generate course description: ${capitalizeWords(
      courseName
    )}`;

    const response = await axios.post(
      `${base_url}/generate/course_description`,
      { prompt }
    );

    if (!response.data?.generated_text) {
      throw new Error("Invalid response from course description generator");
    }

    const prompt1 = `data: ${response.data.generated_text},
    prompt: Enhance the sentence structure,
    Rules: [1 paragraph only, no bold text, no extra message, keep the meaning intact]`;

    const response1 = await axios.post(`${base_url}/chat/request/chatbot`, {
      prompt: prompt1,
    });

    const generatedText = response1.data?.choices?.[0]?.message?.content || "";

    if (!generatedText) {
      throw new Error("Invalid response from chatbot");
    }

    await TrafficModel.create(traffic);
    await Activity.create({
      userId: user._id,
      action: "Generate a course description",
      component: "Course Description",
    });

    return res.status(200).json({ result: generatedText });
  } catch (error) {
    console.error("Error generating description:", error.message);
    return res
      .status(500)
      .json({ error: error.message || "Failed to generate text" });
  }
};
const GenerateCourseOutcomes = async (req, res) => {
  const number = req.body.number;
  const courseDescription = req.body.courseDescription;
  const origin = req.path;

  const user = await Account.findOne({ email: req.user.email });
  console.log(user._id);
  const requestName = "course_outcomes";
  const traffic = { origin, requestName };
  const result = [];
  let samples = "";
  let prompt1 = "";
  const prompt = `Generate course outcomes: ${courseDescription}`;
  for (let i = 0; i < number; i++) {
    const response = await axios.post(`${base_url}/generate/course_outcomes`, {
      prompt: prompt,
    });
    samples = response.data.generated_text;

    result.push(`${i + 1}.  ${samples}`);
  }
  await TrafficModel.create(traffic);
  await Activity.create({
    userId: user._id,
    action: "Generate a course outcomes",
    component: "Course Outcomes",
  });
  return res.status(200).json({ result });
};
const GenerateLearningOutcomes = async (req, res) => {
  const number = req.body.number;
  const origin = req.path;
  const requestName = "learning_outcomes";
  const traffic = { origin, requestName };
  const courseOutcomes = req.body.courseOutcomes;
  const result = [];
  let samples = "";
  const prompt = `Generate: ${courseOutcomes}`;
  const user = await Account.findOne({ email: req.user.email });

  for (let i = 0; i < number; i++) {
    const response = await axios.post(`${base_url}/generate`, {
      prompt: prompt,
    });
    samples = response.data.generated_text;
    result.push(`${i + 1}.  ${samples}`);
  }
  await TrafficModel.create(traffic);
  await Activity.create({
    userId: user._id,
    action: "Generate a specific learning outcomes",
    component: "Specific learning outcomes",
  });
  return res.status(200).json({ result });
};
const GenerateAll = async (req, res) => {
  const { coNumber, courseName, sloNumber } = req.body.data;
  const origin = req.path;
  const requestName = "all_in_one";
  const traffic = { origin, requestName };
  const courseOutcomes = [];
  const learningOutcomes = [];
  const user = await Account.findOne({ email: req.user.email });
  let samples = "";
  const prompt = `Generate course description: ${capitalizeWords(courseName)}`;

  const response1 = await axios.post(`${base_url}/course_description`, {
    prompt: prompt,
  });
  const course_description = response1.data.generated_text;
  const prompt4 = `data: ${course_description},
  prompt: Enhance the sentence structure,
  Rules: [1 paragraph only, no bold text, no extra message, keep the meaning intact]`;
  const response2 = await axios.post(`${base_url}/chat/request/chatbot`, {
    prompt: prompt4,
  });
  const courseDescription =
    response2.data?.choices?.[0]?.message?.content || "";

  const prompt1 = `Generate course outcomes: ${courseDescription}`;
  for (let i = 0; i < coNumber; i++) {
    const response = await axios.post(`${base_url}/generate/course_outcomes`, {
      prompt: prompt1,
    });
    samples = response.data.generated_text;

    courseOutcomes.push(`${i + 1}.  ${samples}`);
  }
  for (let i = 0; i < coNumber; i++) {
    learningOutcomes.push(`- ${courseOutcomes[i]}`);
    const prompt2 = `Generate: ${courseOutcomes[i]}`;
    for (let j = 0; j < sloNumber; j++) {
      const response = await axios.post(`${base_url}/generate`, {
        prompt: prompt2,
      });
      samples = response.data.generated_text;
      learningOutcomes.push(`${j + 1}.  ${samples}`);
    }
  }

  const result = {
    description: courseDescription,
    courseOutcomes: courseOutcomes,
    learningOutcomes: learningOutcomes,
  };

  console.log(result);
  await TrafficModel.create(traffic);
  await Activity.create({
    userId: user._id,
    action: "Generate a all in one",
    component: "All in one",
  });
  return res.status(200).json({ result });
};

module.exports = {
  GenerateDescription,
  GenerateCourseOutcomes,
  GenerateLearningOutcomes,
  GenerateAll,
};
