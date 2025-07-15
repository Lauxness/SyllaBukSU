const { Document, Packer, Paragraph, TextRun } = require("docx");

const DownloadDocxs = async (req, res) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun("Hello!"),
              new TextRun({
                text: " This document was generated using docx in Node.js.",
                bold: true,
              }),
            ],
          }),
        ],
      },
    ],
  });

  try {
    const buffer = await Packer.toBuffer(doc);
    res.setHeader("Content-Disposition", "attachment; filename=sample.docx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.send(buffer);
  } catch (err) {
    console.error("Error generating document:", err);
    res.status(500).json({ message: "Failed to generate document." });
  }
};

module.exports = { DownloadDocxs };
