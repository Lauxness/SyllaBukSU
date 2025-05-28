const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
} = require("docx");
const fs = require("fs");
const SavedPrompts = require("./model/savedPromptsModel");

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const AuthenticationRoute = require("./routes/Authentication");
const mongoose = require("mongoose");
const GenerateRoute = require("./routes/Generate");
const AdminRoute = require("./routes/Admin");
const ChatBotRoute = require("./routes/ChatBot");
const SavePromptRoute = require("./routes/SavePrompts");
const { Middleware } = require("./utils/Middleware");
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
app.get("/export", async (req, res) => {
  const courseOutcome = await SavedPrompts.findOne();

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun("Hello World"),
              new TextRun({
                text: "Foo Bar",
                bold: true,
              }),
              new TextRun({
                text: "\tGithub is the best",
                bold: true,
              }),
            ],
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: courseOutcome.currentResult.toString(),
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Column 2",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
  res.setHeader("Content-Disposition", "attachment; filename=MyDocument.docx");
  res.send(buffer);
});
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
