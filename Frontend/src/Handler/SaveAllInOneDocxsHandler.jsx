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

const SaveAllInOneDocxs = (texts) => {
  const courseOutcomes = texts.courseOutcomes;
  const description = texts.description;
  const learningOutcomes = texts.learningOutcomes;
  const cleanedCourseOutcomes = courseOutcomes.map((str, index) => {
    const noNumber = str.replace(/^\d+\.\s*/, "").trim();
    const capitalized = noNumber.charAt(0).toUpperCase() + noNumber.slice(1);
    return `CO${index + 1}: ${capitalized}`;
  });

  const cleanedCourseOutcomes2 = courseOutcomes.map((str, index, array) => {
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

  const cleanedSpecificLearningOutcomes = Array.from(
    new Set(
      learningOutcomes
        .filter((text) => !text.trim().startsWith("-"))
        .map((text) => {
          let cleaned = text.replace(/^\s*\d+\.\s*(\d+\.\s*)?/, "").trim();
          cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
          return cleaned;
        })
    )
  );
  const countPerCO = Math.floor(
    cleanedSpecificLearningOutcomes.length / cleanedCourseOutcomes.length
  );
  const grouped = [];

  let currentIndex = 0;

  cleanedCourseOutcomes.forEach((co, i) => {
    const nextIndex =
      i === cleanedCourseOutcomes.length - 1
        ? cleanedSpecificLearningOutcomes.length
        : currentIndex + countPerCO;

    const assignedSLOs = cleanedSpecificLearningOutcomes.slice(
      currentIndex,
      nextIndex
    );
    grouped.push({
      courseOutcome: co,
      specificLearningOutcomes: assignedSLOs,
    });

    currentIndex = nextIndex;
  });

  const formatText = (text, bold = false) =>
    new Paragraph({
      children: [
        new TextRun({
          text,
          font: "Book Antiqua",
          size: 22,
          bold,
        }),
      ],
    });

  const paragraph = new Paragraph({
    children: [
      new TextRun({
        text: "Course Description:",
        bold: true,
        size: 24,
        font: "Book Antiqua",
      }),
      new TextRun({
        text: " " + description,
        size: 22,
        font: "Book Antiqua",
      }),
    ],
    spacing: { after: 200 },
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

  const tableRows = grouped.map(
    ({ courseOutcome, specificLearningOutcomes }) => {
      return new TableRow({
        children: [
          new TableCell({
            margins: {
              top: 100,
              bottom: 100,
              left: 200,
              right: 200,
            },
            width: { size: 40, type: WidthType.PERCENTAGE },
            children: [formatText(courseOutcome)],
          }),
          new TableCell({
            margins: {
              top: 100,
              bottom: 100,
              left: 200,
              right: 200,
            },
            width: { size: 60, type: WidthType.PERCENTAGE },
            children: specificLearningOutcomes.flatMap((slo, index) => [
              formatText(slo),
              ...(index !== specificLearningOutcomes.length - 1
                ? [new Paragraph({ children: [] })]
                : []),
            ]),
          }),
        ],
      });
    }
  );

  const doc = new Document({
    sections: [
      {
        children: [
          paragraph,
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
              ...tableRows,
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

export default SaveAllInOneDocxs;
