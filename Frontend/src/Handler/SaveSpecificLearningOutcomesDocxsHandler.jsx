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

const GenerateSpecificLearningOutcomesTable = (texts) => {
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
      children: text.flatMap((t, index) => [
        new Paragraph({
          children: [
            new TextRun({
              text: t,
              font: "Book Antiqua",
              size: 22,
              ...opts,
            }),
          ],
        }),
        ...(index !== text.length - 1
          ? [new Paragraph({ children: [new TextRun({ text: "" })] })]
          : []),
      ]),
    });
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
                            text: "Specific Learning Outcomes",
                            font: "Book Antiqua",
                            size: 22,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [createTextCell(cleanedTexts)],
              }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "SpecificLearningOutcomes.docx");
  });
};

export default GenerateSpecificLearningOutcomesTable;
