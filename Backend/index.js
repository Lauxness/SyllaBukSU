const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const AuthenticationRoute = require("./routes/Authentication");
const mongoose = require("mongoose");
const GenerateRoute = require("./routes/Generate");
const AdminRoute = require("./routes/Admin");
const ChatBotRoute = require("./routes/ChatBot");
const DocxsRoute = require("./routes/DownloadDocxs");
const SavePromptRoute = require("./routes/SavePrompts");
const Announcement = require("./routes/Announcement");
const { Middleware } = require("./utils/Middleware");
const UserRoute = require("./routes/User");
const cors = require("cors");
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/account", AuthenticationRoute);
app.use("/generate", Middleware, GenerateRoute);
app.use("/chat", Middleware, ChatBotRoute);
app.use("/admin", Middleware, AdminRoute);
app.use("/prompts", Middleware, SavePromptRoute);
app.use("/docx", DocxsRoute);
app.use("/announcement", Announcement);
app.use("/users", UserRoute);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Connected to DATABSE and server is Listening to port ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
