import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "docx";

function TestPage() {
  const exportToDOcx = () => {
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
          ],
        },
      ],
    });

    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync("My Document.docx", buffer);
    });
  };

  return <button onClick={() => exportToDOcx()}>test</button>;
}

export default TestPage;
