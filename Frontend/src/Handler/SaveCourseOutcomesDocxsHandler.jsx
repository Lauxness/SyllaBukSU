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
    const noNumber = str.replace(/^\d+\.\s*/, "");
    return noNumber.charAt(0).toUpperCase() + noNumber.slice(1);
  });

  const cleanedCourseOutcomes2 = cleanedTexts.map((str, index, array) => {
    const noNumber = str.replace(/^\d+\.\s*/, "").trim();
    const capitalized = noNumber.charAt(0).toLowerCase() + noNumber.slice(1);

    let ending = ";";
    if (index === array.length - 2) {
      ending = "; and";
    } else if (index === array.length - 1) {
      ending = ".";
    }

    return `CO${index + 1}: ${capitalized}${ending}`;
  });

  const createParagraph = (text) =>
    new Paragraph({
      children: [
        new TextRun({
          text: text,
          bold: false,
          size: 22,
          font: "Book Antiqua",
        }),
      ],
    });
  const COParagraphs = cleanedCourseOutcomes2.map((text) =>
    createParagraph(text)
  );

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
          ...COParagraphs,
          new Paragraph({ spacing: { after: 200 } }),
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
