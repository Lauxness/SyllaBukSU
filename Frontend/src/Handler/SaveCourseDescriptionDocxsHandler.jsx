import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

const SaveCourseDescriptionDocxsHandler = (text = "") => {
  if (typeof text !== "string") {
    console.error("Course description must be a string.");
    return;
  }

  const paragraph = new Paragraph({
    children: [
      new TextRun({
        text: "Course Description:",
        bold: true,
        size: 24, // 12pt (size is half-points in docx)
        font: "Book Antiqua",
      }),
      new TextRun({
        text: " " + text,
        size: 22, // 11pt
        font: "Book Antiqua",
      }),
    ],
    spacing: { after: 200 },
  });

  const doc = new Document({
    creator: "Your App",
    title: "Course Description",
    description: "A document containing a course description",
    sections: [
      {
        properties: {},
        children: [paragraph],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "Course_Description.docx");
  });
};

export default SaveCourseDescriptionDocxsHandler;
