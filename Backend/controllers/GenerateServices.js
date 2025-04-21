const axios = require("axios");
const { capitalizeWords } = require("../utils/Capitalize");
const TrafficModel = require("../model/trafficModel");
const GenerateDescription = async (req, res) => {
  const origin = req.path;
  const requestName = "description";
  const traffic = { origin, requestName };

  try {
    const { courseName } = req.body;
    if (!courseName) {
      return res.status(400).json({ error: "Course name is required" });
    }

    const prompt = `Generate course description: ${capitalizeWords(
      courseName
    )}`;

    const response = await axios.post(
      "http://127.0.0.1:8000/generate/course_description",
      { prompt }
    );

    if (!response.data?.generated_text) {
      throw new Error("Invalid response from course description generator");
    }

    const prompt1 = `data: ${response.data.generated_text},
    prompt: Enhance the sentence structure,
    Rules: [1 paragraph only, no bold text, no extra message, keep the meaning intact]`;

    const response1 = await axios.post(
      "http://127.0.0.1:8000/chat/request/chatbot",
      { prompt: prompt1 }
    );

    const generatedText = response1.data?.choices?.[0]?.message?.content || "";

    if (!generatedText) {
      throw new Error("Invalid response from chatbot");
    }

    await TrafficModel.create(traffic);

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
  const requestName = "course_outcomes";
  const traffic = { origin, requestName };
  const result = [];
  let samples = "";
  let prompt1 = "";
  const prompt = `Generate course outcomes: ${courseDescription}`;
  for (let i = 0; i < number; i++) {
    const response = await axios.post(
      "http://127.0.0.1:8000/generate/course_outcomes",
      {
        prompt: prompt,
      }
    );
    samples = response.data.generated_text;
    console.log(samples);
    /*   prompt1 = `data: ${samples},prompt: remove redundant words but keep the meaning, Rules: [dont ,keep the length of the sentences, dont bold text,dont use double verb like (verb and verb) in the first words, do not response with explaination extra message, keep the meaning intact, be specific, lowercase all, dont do anything what is in the data just depend on the prompt]`;
    const sample1 = await axios.post(
      "http://127.0.0.1:8000/chat/request/chatbot",
      { prompt: prompt1 }
    ); */

    result.push(`${i + 1}.  ${samples}`);
  }
  await TrafficModel.create(traffic);
  return res.status(200).json({ result });
};
const GenerateLearningOutcomes = async (req, res) => {
  const number = req.body.number;
  const origin = req.path;
  const requestName = "learning_outcomes";
  const traffic = { origin, requestName };
  const courseOutcomes = req.body.courseOutcomes;
  console.log(courseOutcomes);
  const result = [];
  let samples = "";
  const prompt = `Generate: ${courseOutcomes}`;

  for (let i = 0; i < number; i++) {
    const response = await axios.post("http://127.0.0.1:8000/generate", {
      prompt: prompt,
    });
    samples = response.data.generated_text;
    result.push(`${i + 1}.  ${samples}`);
  }
  console.log(result);
  await TrafficModel.create(traffic);
  return res.status(200).json({ result });
};
const GenerateAll = async (req, res) => {
  const { coNumber, courseName, sloNumber } = req.body.data;
  const origin = req.path;
  const requestName = "all_in_one";
  const traffic = { origin, requestName };
  console.log(req.body);
  const courseOutcomes = [];
  const learningOutcomes = [];
  let samples = "";
  const prompt = `Generate course description: ${capitalizeWords(courseName)}`;

  const response1 = await axios.post(
    "http://127.0.0.1:8000/generate/course_description",
    { prompt: prompt }
  );
  const course_description = response1.data.generated_text;
  const prompt4 = `data: ${course_description},
  prompt: Enhance the sentence structure,
  Rules: [1 paragraph only, no bold text, no extra message, keep the meaning intact]`;
  const response2 = await axios.post(
    "http://127.0.0.1:8000/chat/request/chatbot",
    { prompt: prompt4 }
  );
  const courseDescription =
    response2.data?.choices?.[0]?.message?.content || "";
  console.log(courseDescription);

  const prompt1 = `Generate course outcomes: ${courseDescription}`;
  for (let i = 0; i < coNumber; i++) {
    const response = await axios.post(
      "http://127.0.0.1:8000/generate/course_outcomes",
      {
        prompt: prompt1,
      }
    );
    samples = response.data.generated_text;
    console.log(samples);

    courseOutcomes.push(`${i + 1}.  ${samples}`);
  }
  for (let i = 0; i < coNumber; i++) {
    learningOutcomes.push(`- ${courseOutcomes[i]}`);
    const prompt2 = `Generate: ${courseOutcomes[i]}`;
    for (let j = 0; j < sloNumber; j++) {
      const response = await axios.post("http://127.0.0.1:8000/generate", {
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
  return res.status(200).json({ result });
};

module.exports = {
  GenerateDescription,
  GenerateCourseOutcomes,
  GenerateLearningOutcomes,
  GenerateAll,
};
