const axios = require("axios");

const GenerateDescription = async (req, res) => {
  try {
    const { courseName } = req.body;
    const prompt = `Generate: ${courseName}`;

    const response = await axios.post("http://127.0.0.1:8000/generate", {
      prompt: prompt,
    });
    return res.status(200).json({
      result: response.data.generated_text,
    });
  } catch (error) {
    console.error("Error generating description:", error.message);
    return res.status(500).json({ error: "Failed to generate text" });
  }
};
const GenerateCourseOutcomes = async (req, res) => {
  const number = req.body.number;
  const courseDescription = req.body.courseDescription;
  const result = [];
  let samples = "";
  const prompt = `Generate: ${courseDescription}`;
  for (let i = 0; i < number; i++) {
    const response = await axios.post("http://127.0.0.1:8000/generate", {
      prompt: prompt,
    });
    samples = response.data.generated_text;
    result.push(`${i + 1}.  ${samples}`);
  }

  console.log(result);
  return res.status(200).json({ result });
};
const GenerateLearningOutcomes = async (req, res) => {
  const number = req.body.number;
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
  return res.status(200).json({ result });
};
const GenerateAll = async (req, res) => {
  const { coNumber } = req.body.data;
  const { sloNumber } = req.body.data;
  console.log(req.body);
  const courseDescription =
    "This is the generated course description: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae ducimus distinctio quisquam sint minima. Laudantium quas obcaecati, odit, minima dolore eum distinctio sapiente delectus quaerat. Tempora ea illo nam nulla qui officia nisi quis.";

  // Course Outcomes List
  const courseOutcomesSamples = [
    "Demonstrate proficiency in software engineering principles, including agile methodologies and system design best practices.",
    "Explain the fundamentals of artificial intelligence, including machine learning models and neural network architectures.",
    "Apply cybersecurity practices such as ethical hacking, encryption, and risk management to enhance digital security.",
    "Develop dynamic web applications using HTML, CSS, JavaScript, and modern frameworks like React and Vue.",
    "Utilize Python for data analysis, visualization, and predictive modeling in real-world scenarios.",
    "Design and manage optimized databases using SQL, including query writing, indexing, and performance tuning.",
    "Implement cloud computing solutions using AWS, Azure, and Google Cloud for scalable and secure deployments.",
    "Build cross-platform mobile applications using Flutter, React Native, or Swift with seamless backend integration.",
    "Create interactive game experiences using Unity and Unreal Engine, utilizing C# and Blueprint programming.",
    "Manage software development projects effectively using Agile, Scrum, and Kanban methodologies.",
  ];

  // Specific Learning Outcomes List
  const specificLearningOutcomesSamples = [
    "Demonstrate a deep understanding of software engineering principles, including agile methodologies and system design best practices.",
    "Apply artificial intelligence and machine learning models to solve real-world problems using neural networks and deep learning techniques.",
    "Implement cybersecurity strategies such as ethical hacking, encryption techniques, and risk management to protect digital assets.",
    "Build responsive and interactive web applications using HTML, CSS, JavaScript, and modern frameworks like React and Vue.",
    "Analyze and visualize data effectively using Python, leveraging libraries like Pandas, Matplotlib, and Scikit-learn for predictive modeling.",
    "Construct optimized and scalable databases using SQL, including query writing, indexing, and performance tuning.",
    "Deploy and manage cloud-based solutions using AWS, Azure, and Google Cloud, ensuring security and scalability in cloud computing environments.",
    "Develop fully functional mobile applications using Flutter, React Native, or Swift, integrating frontend and backend services seamlessly.",
    "Design and develop interactive game environments using Unity and Unreal Engine, incorporating C# scripting and Blueprint programming.",
    "Apply Agile, Scrum, and Kanban methodologies to manage projects efficiently, ensuring effective collaboration and timely delivery.",
  ];

  // Generate Course Outcomes and Learning Outcomes based on the requested number
  const courseOutcomes = [];
  const learningOutcomes = [];

  for (let i = 0; i < coNumber; i++) {
    const randomIndex = Math.floor(
      Math.random() * courseOutcomesSamples.length
    );
    courseOutcomes.push(`${i + 1}. ${courseOutcomesSamples[randomIndex]}`);
  }

  // Generate Specific Learning Outcomes
  for (let i = 0; i < sloNumber; i++) {
    const randomIndex = Math.floor(
      Math.random() * specificLearningOutcomesSamples.length
    );
    learningOutcomes.push(
      `${i + 1}. ${specificLearningOutcomesSamples[randomIndex]}`
    );
  }
  const result = {
    description: courseDescription,
    courseOutcomes: courseOutcomes,
    learningOutcomes: learningOutcomes,
  };

  console.log(result);
  return res.status(200).json({ result });
};

module.exports = {
  GenerateDescription,
  GenerateCourseOutcomes,
  GenerateLearningOutcomes,
  GenerateAll,
};
