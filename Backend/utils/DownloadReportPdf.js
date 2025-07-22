const PDFDocument = require("pdfkit");
const innovateLogo =
  "https://res.cloudinary.com/dvhfgstud/image/upload/v1733239402/467198922_588876523648635_1569889043517254517_n_nnoyav.jpg";
const buksuLogo =
  "https://res.cloudinary.com/dvhfgstud/image/upload/v1733117339/buksu-logo-min-1024x1024_ye6b58.png";
module.exports = class ReportPDF {
  constructor() {
    this.doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });
  }

  footer(officerName) {
    let startx = 50;
    let startY = this.doc.page.height - 125;
    this.doc
      .font("Helvetica")
      .fontSize(12)
      .text("Sales P. Aribe", startx, startY - 15, {
        align: "center",
        width: 150,
      });
    this.doc
      .moveTo(startx, startY)
      .lineTo(startx + 150, startY)
      .stroke();
    this.doc
      .font("Helvetica")
      .fontSize(10)
      .text("Department Head", startx, startY + 5, {
        align: "center",
        width: 150,
      });

    this.doc
      .font("Helvetica")
      .fontSize(10)
      .text("(Signature over Printed Name)", startx, startY + 20, {
        align: "center",
        width: 150,
      });

    startx = 400;
    startY = this.doc.page.height - 125;
    this.doc
      .font("Helvetica")
      .fontSize(12)
      .text(officerName, startx, startY - 15, {
        align: "center",
        width: 150,
      });
    this.doc
      .moveTo(startx, startY)
      .lineTo(startx + 150, startY)
      .stroke();
    this.doc
      .font("Helvetica")
      .fontSize(10)
      .text("Enrollment Officer", startx, startY + 5, {
        align: "center",
        width: 150,
      });

    this.doc
      .font("Helvetica")
      .fontSize(10)
      .text("(Signature over Printed Name)", startx, startY + 20, {
        align: "center",
        width: 150,
      });

    startx = 220;
    startY = this.doc.page.height - 85;
    this.doc
      .font("Helvetica")
      .fontSize(12)
      .text("Marilou O. Espina", startx, startY - 15, {
        align: "center",
        width: 150,
      });
    this.doc
      .moveTo(startx, startY)
      .lineTo(startx + 150, startY)
      .stroke();
    this.doc
      .font("Helvetica")
      .fontSize(10)
      .text("Department Dean", startx, startY + 5, {
        align: "center",
        width: 150,
      });

    this.doc
      .font("Helvetica")
      .fontSize(10)
      .text("(Signature over Printed Name)", startx, startY + 20, {
        align: "center",
        width: 150,
      });
  }

  async addHeader(date, data) {
    this.doc
      .image("log buk.png", 50, 50, { width: 50 })
      .font("Helvetica-Bold")
      .fontSize(12)
      .text("BUKIDNON STATE UNIVERSITY", 200, 50)
      .font("Helvetica")
      .fontSize(10)
      .text("Malaybalay City, Bukidnon 8700", 220, 65)
      .text("Tel (088) 813-5661 to 5663; Telefax (088) 813-2717, ", 130, 80)
      .fillColor("blue")
      .text("www.buksu.edu.ph", 360, 80, { link: "http://www.buksu.edu.ph" })

      .moveTo(50, 110)
      .lineTo(550, 110)
      .lineWidth(3)
      .stroke();
    this.doc
      .font("Helvetica-Bold")
      .fillColor("black")
      .fontSize(17)
      .text("Student Information Report Summary", 50, 150)
      .font("Helvetica")
      .fontSize(10)
      .text(`Date: ${date}`, 350, 125)
      .fontSize(13)
      .text("Report Table: ", 50, 180);
    const tableData = data;

    const startX = 50;
    const startY = 200;
    const columnWidths = [396, 100];
    const rowHeight = 30;

    for (let i = 0; i < tableData.length; i++) {
      const rowY = startY + i * rowHeight;

      if (i === 0) {
        this.doc
          .rect(
            startX,
            rowY,
            columnWidths.reduce((a, b) => a + b),
            rowHeight
          )
          .fill("#cccccc");
        this.doc.fillColor("black");
      }

      for (let j = 0; j < tableData[i].length; j++) {
        const columnX =
          startX + columnWidths.slice(0, j).reduce((a, b) => a + b, 0);
        this.doc.lineWidth(0.5);
        this.doc
          .font("Helvetica")
          .fontSize(10)
          .text(tableData[i][j], columnX + 5, rowY + 10, {
            width: columnWidths[j] - 10,
            align: "left",
          });
      }

      this.doc
        .rect(
          startX,
          rowY,
          columnWidths.reduce((a, b) => a + b),
          rowHeight
        )
        .stroke();
    }

    let currentX = startX;
    columnWidths.forEach((width) => {
      this.doc
        .moveTo(currentX, startY)
        .lineTo(currentX, startY + tableData.length * rowHeight)
        .stroke();
      currentX += width;
    });

    return this;
  }
};
