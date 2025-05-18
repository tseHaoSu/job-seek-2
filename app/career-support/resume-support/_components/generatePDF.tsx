import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";

interface ResumeData {
  name: string;
  cv_heading?: string;
  profile_heading?: string;
  profile_content?: string;
  education_heading?: string;
  education_list?: string[];
  education_content?: string;
  experience_heading?: string;
  experience_list?: string[];
  experience_content?: string;
  logs?: string[];
}

export async function generateResumePDF(resumeData: ResumeData) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]);
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = height - 50;
  const lineHeight = 20;

  const drawWrappedText = (
    text: string,
    size = 12,
    bold = false,
    indent = 50,
    maxWidth = 495
  ) => {
    const cleanText = (text || "")
      .replace(/[^\x00-\x7F]/g, "")
      .replace(/\n/g, " ")
      .trim();

    const words = cleanText.split(" ");
    let line = "";

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const textWidth = (bold ? boldFont : font).widthOfTextAtSize(
        testLine,
        size
      );

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

  const drawCenteredText = (text: string, size = 12, bold = false) => {
    const clean = (text || "")
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

  const drawTitle = (title: string) => {
    y -= 10;
    drawWrappedText(title, 16, true);
  };

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

  // Handle the CV heading section
  const lines = (resumeData.cv_heading || `Name: ${resumeData.name}`).split(
    "\n"
  );

  const nameLine = lines[0]?.replace(/^Name:\s*/, "").trim();
  drawCenteredText(nameLine || resumeData.name, 20, true);

  // Skip drawing email/phone if they're placeholder text
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (
      line.includes("[Please enter your") ||
      line.includes("[Please provide your")
    ) {
      continue;
    }
    drawCenteredText(line, 10, false);
  }

  page.drawLine({
    start: { x: 50, y },
    end: { x: 545, y },
    thickness: 1,
    color: rgb(0.5, 0.5, 0.5),
  });
  y -= 10;

  // Profile section
  if (resumeData.profile_content) {
    drawTitle("Profile");
    drawWrappedText(resumeData.profile_content);
  }

  // Education section
  if (
    resumeData.education_content ||
    (resumeData.education_list && resumeData.education_list.length > 0)
  ) {
    drawTitle("Education");
    if (resumeData.education_list && resumeData.education_list.length > 0) {
      resumeData.education_list.forEach((item: string) => {
        const parts = item.split(/\s+at\s+|\s+\(|\)\s*$/).filter(Boolean);
        if (parts.length >= 2) {
          const title = `${parts[0]} at ${parts[1]}`;
          const years = parts.length > 2 ? parts[2] : "";
          drawLabelRight(title, years);
        } else {
          drawWrappedText(item);
        }
      });
    }
    if (resumeData.education_content) {
      drawWrappedText(resumeData.education_content);
    }
  }

  // Experience section
  if (
    resumeData.experience_content ||
    (resumeData.experience_list && resumeData.experience_list.length > 0)
  ) {
    drawTitle("Experience");
    if (resumeData.experience_list && resumeData.experience_list.length > 0) {
      resumeData.experience_list.forEach((item: string) => {
        const parts = item.split(/\s+at\s+|\s+\(|\)\s*$/).filter(Boolean);
        if (parts.length >= 2) {
          const title = `${parts[0]} at ${parts[1]}`;
          const years = parts.length > 2 ? parts[2] : "";
          drawLabelRight(title, years);
        } else {
          drawWrappedText(item);
        }
      });
    }
    if (resumeData.experience_content) {
      drawWrappedText(resumeData.experience_content);
    }
  }

  const pdfBytes = await pdfDoc.save();
  saveAs(new Blob([pdfBytes], { type: "application/pdf" }), "resume.pdf");
}
