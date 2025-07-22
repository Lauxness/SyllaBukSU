import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";

const generateCourseOutcomesTable = (texts) => {
  const cleanedTexts = texts.map((str) => {
    // Remove leading number and dot (e.g., "1. ")
    const noNumber = str.replace(/^\d+\.\s*/, "");

    // Capitalize first letter
    return noNumber.charAt(0).toUpperCase() + noNumber.slice(1);
  });
  const createTextCell = (text, opts = {}) =>
    new TableCell({
      margins: {
        top: 100,
        bottom: 100,
        left: 100,
        right: 100,
      },
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text,
              font: "Book Antiqua",
              size: 22,
              ...opts,
            }),
          ],
        }),
      ],
    });
  const rows = cleanedTexts.map(
    (text, index) =>
      new TableRow({
        children: [createTextCell(`CO${index + 1}: ${text}`)],
      })
  );

  const doc = new Document({
    sections: [
      {
        children: [
          new Table({
            width: {
              size: 100,
              type: "pct",
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    margins: {
                      top: 100,
                      bottom: 100,
                      left: 200,
                      right: 200,
                    },
                    children: [
                      new Paragraph({
                        alignment: "center",
                        children: [
                          new TextRun({
                            text: "Course Outcomes",
                            font: "Book Antiqua",
                            size: 22,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              ...rows,
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "CourseOutcomes.docx");
  });
};

export default generateCourseOutcomesTable;
