import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";

export async function generateResumePDF(resumeData: any) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = height - 50;
  const lineHeight = 20;

  // anto change line
  const drawWrappedText = (
    text: string,
    size = 12,
    bold = false,
    indent = 50,
    maxWidth = 495
  ) => {
    const cleanText = (text || "")
      .replace(/\[.*?\]/g, "")
      .replace(/[^\x00-\x7F]/g, "")
      .replace(/\n/g, " ")
      .trim();

    const words = cleanText.split(" ");
    let line = "";

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const textWidth = (bold ? boldFont : font).widthOfTextAtSize(testLine, size);

      if (textWidth > maxWidth) {
        page.drawText(line.trim(), {
          x: indent,
          y,
          size,
          font: bold ? boldFont : font,
          color: rgb(0, 0, 0),
        });
        y -= lineHeight;

        if (y < 50) {
          page = pdfDoc.addPage([595, 842]);
          y = height - 50;
        }

        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }

    if (line.trim()) {
      page.drawText(line.trim(), {
        x: indent,
        y,
        size,
        font: bold ? boldFont : font,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight;
    }
  };

  const drawCenteredText = (
    text: string,
    size = 12,
    bold = false,
  ) => {
    const clean = (text || "")
      .replace(/\[.*?\]/g, "")
      .replace(/[^\x00-\x7F]/g, "")
      .replace(/\n/g, " ")
      .trim();

    const usedFont = bold ? boldFont : font;
    const textWidth = usedFont.widthOfTextAtSize(clean, size);
    const centerX = (width - textWidth) / 2;

    page.drawText(clean, {
      x: centerX,
      y,
      size,
      font: usedFont,
      color: rgb(0, 0, 0),
    });
    y -= lineHeight;
  };

  // second title
  const drawTitle = (title: string) => {
    y -= 10;
    drawWrappedText(title, 16, true);
  };

  // second title and year
  const drawLabelRight = (left: string, right: string) => {
    if (y < 50) {
      page = pdfDoc.addPage([595, 842]);
      y = height - 50;
    }
    page.drawText(left.trim(), {
      x: 50,
      y,
      size: 12,
      font: boldFont,
    });
    page.drawText(right.trim(), {
      x: 400,
      y,
      size: 12,
      font,
    });
    y -= lineHeight;
  };

  // === Header (Name + contact info) ===
  const lines = (resumeData.cv_heading || "").split("\n");

  // Name
  const nameLine = lines[0]?.replace(/^Name:\s*/, "").trim();
  drawCenteredText(nameLine || "YOUR NAME", 20, true);

  // Phone / E-mail
  for (let i = 1; i < lines.length; i++) {
    drawCenteredText(lines[i], 10, false);
  }

  // Line
  page.drawLine({
    start: { x: 50, y },
    end: { x: 545, y },
    thickness: 1,
    color: rgb(0.5, 0.5, 0.5),
  });
  y -= 10;

  // === Profile ===
  drawTitle("Profile");
  drawWrappedText(resumeData.profile_content);

  // === Education ===
  drawTitle("Education");
  resumeData.education_list?.forEach((item: string) => {
    const [title, years] = item.split(/\((.*?)\)/).map(s => s.trim());
    drawLabelRight(title, years?.replace(")", "") || "");
  });
  drawWrappedText(resumeData.education_content);

  // === Experience ===
  drawTitle("Experience");
  resumeData.experience_list?.forEach((item: string) => {
    const [title, years] = item.split(/\((.*?)\)/).map(s => s.trim());
    drawLabelRight(title, years?.replace(")", "") || "");
  });
  drawWrappedText(resumeData.experience_content);

  // === Save and download ===
  const pdfBytes = await pdfDoc.save();
  saveAs(new Blob([pdfBytes], { type: "application/pdf" }), "resume.pdf");
}
