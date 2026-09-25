import { NextResponse } from "next/server";
import QRCode from "qrcode";
import nodemailer from "nodemailer";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { contactInfo } from "@/data/company";
import fs from "fs";

type FormValues = Record<string, string | undefined>;

type PdfInput = { serviceTitle: string; form: FormValues; reference: string; requestDate: string; };

function getMailer() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  if (!host || !user || !password) return null;

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass: password },
  });
}

function wrapText(text: string, maxCharacters = 70) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > maxCharacters && line) {
      lines.push(line);
      line = word;
    } else {
      line = `${line} ${word}`.trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function generatePdfBuffer({ serviceTitle, form, reference, requestDate }: PdfInput) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  // Define colors
  const bg = rgb(0.98, 0.98, 0.97); // #FAF8F3
  const darkNavy = rgb(0.02, 0.18, 0.30); // #052f4d
  const blue = rgb(0.03, 0.25, 0.40); // #073f67
  const grayText = rgb(0.42, 0.48, 0.52); // #6b7a84
  const lightBorder = rgb(0.87, 0.89, 0.91); // #dde3e7

  // Background
  page.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: rgb(1, 1, 1) });
  
  // Header section
  page.drawRectangle({ x: 0, y: 742, width: 595, height: 100, color: darkNavy });
  page.drawText("SABA", { x: 40, y: 795, size: 28, font: bold, color: rgb(1, 1, 1) });
  page.drawText("AVIATION SERVICE & FLIGHT SUPPORT", { x: 40, y: 775, size: 9, font: regular, color: rgb(0.8, 0.85, 0.9) });
  
  page.drawText("SERVICE REQUEST CONFIRMATION", { x: 330, y: 795, size: 12, font: bold, color: rgb(1, 1, 1) });
  page.drawText(`Ref: ${reference}`, { x: 330, y: 775, size: 10, font: regular, color: rgb(0.8, 0.85, 0.9) });
  page.drawText(`Date: ${requestDate}`, { x: 330, y: 760, size: 10, font: regular, color: rgb(0.8, 0.85, 0.9) });

  let cursorY = 700;

  // Title
  page.drawText(serviceTitle.toUpperCase(), { x: 40, y: cursorY, size: 16, font: bold, color: blue });
  cursorY -= 30;

  // Separate Contact vs Operation fields
  const contactKeys = ["name", "company", "email", "phone"];
  const allKeys = Object.keys(form).filter(k => form[k] && form[k].trim() !== "");
  const contactData = contactKeys.filter(k => allKeys.includes(k));
  const operationData = allKeys.filter(k => !contactKeys.includes(k) && k !== "details");
  
  function drawSection(title: string, keys: string[]) {
    if (keys.length === 0) return;
    
    // Section header
    page.drawText(title, { x: 40, y: cursorY, size: 11, font: bold, color: darkNavy });
    cursorY -= 15;
    page.drawLine({ start: { x: 40, y: cursorY }, end: { x: 555, y: cursorY }, thickness: 1, color: lightBorder });
    cursorY -= 20;

    // Grid layout for fields
    const startX = 40;
    const colWidth = 250;
    let col = 0;

    keys.forEach((key, index) => {
      const label = key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());
      const value = String(form[key]);
      
      const currentX = startX + (col * colWidth);
      
      page.drawText(label.toUpperCase(), { x: currentX, y: cursorY, size: 8, font: bold, color: grayText });
      
      const wrappedValues = wrapText(value, 40);
      wrappedValues.forEach((line, i) => {
        page.drawText(line, { x: currentX, y: cursorY - 14 - (i * 12), size: 10, font: regular, color: darkNavy });
      });
      
      const heightUsed = 14 + (wrappedValues.length * 12);
      
      col++;
      if (col > 1) {
        col = 0;
        cursorY -= heightUsed + 10;
      }
    });
    
    if (col > 0) cursorY -= 40; // Add padding if ended on first column
    else cursorY -= 10;
  }

  drawSection("CONTACT DETAILS", contactData);
  cursorY -= 10;
  drawSection("OPERATION DETAILS", operationData);

  // Additional Notes (Full width)
  if (form.details && form.details.trim() !== "") {
    cursorY -= 10;
    page.drawText("ADDITIONAL NOTES", { x: 40, y: cursorY, size: 11, font: bold, color: darkNavy });
    cursorY -= 15;
    page.drawLine({ start: { x: 40, y: cursorY }, end: { x: 555, y: cursorY }, thickness: 1, color: lightBorder });
    cursorY -= 20;
    
    const notes = wrapText(form.details, 95);
    notes.forEach((line) => {
      page.drawText(line, { x: 40, y: cursorY, size: 10, font: regular, color: darkNavy });
      cursorY -= 14;
    });
  }

  // Footer
  const footerY = 100;
  page.drawRectangle({ x: 40, y: footerY - 60, width: 515, height: 75, color: bg });
  page.drawText("SABA OPERATIONS", { x: 55, y: footerY - 5, size: 9, font: bold, color: darkNavy });
  page.drawText("24/7 Operational Support", { x: 55, y: footerY - 20, size: 9, font: regular, color: grayText });
  page.drawText(`Phone: ${contactInfo.phone}`, { x: 55, y: footerY - 35, size: 9, font: regular, color: grayText });
  page.drawText(`Email: ${contactInfo.operations}`, { x: 250, y: footerY - 35, size: 9, font: regular, color: grayText });
  
  page.drawText("SABA AVIATION SERVICE & FLIGHT SUPPORT PLC", { x: 40, y: 25, size: 7, font: bold, color: darkNavy });
  page.drawText("Your Trusted Gateway to Seamless Airport Operations", { x: 40, y: 15, size: 7, font: regular, color: grayText });

  return Buffer.from(await pdfDoc.save());
}

export async function POST(req: Request) {
  try {
    const { serviceTitle, serviceSlug, form = {} } = await req.json() as { serviceTitle: string; serviceSlug: string; form: FormValues };
    const now = new Date();
    const reference = `SABA-${now.getFullYear()}-${String(Date.now() % 1000000).padStart(6, "0")}`;
    const requestDate = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const pdfBuffer = await generatePdfBuffer({ serviceTitle, form, reference, requestDate });
    const subject = encodeURIComponent(`${reference} - ${serviceTitle} request`);
    const bodyText = encodeURIComponent(`Request ${reference}\nService: ${serviceTitle}\nContact: ${form.name || "-"}\nPlease review this operation request.`);
    const mailto = `mailto:${contactInfo.operations}?subject=${subject}&body=${bodyText}`;
    const mailer = getMailer();
    let emailSent = false;

    if (mailer && form.email) {
      const from = process.env.BOOKING_FROM_EMAIL || process.env.SMTP_USER;
      const attachment = { filename: `${reference.toLowerCase()}-service-confirmation.pdf`, content: pdfBuffer, contentType: "application/pdf" };
      const emailText = `Your SABA service request has been received.\n\nReference: ${reference}\nService: ${serviceTitle}\nStatus: Pending Review\n\nThe service confirmation PDF is attached. A SABA operations representative will review the request and contact you.`;
      await Promise.all([
        mailer.sendMail({ from, to: contactInfo.operations, replyTo: form.email, subject: `[Operations] ${reference} - ${serviceTitle}`, text: `New service request received.\n\n${emailText}`, attachments: [attachment] }),
        mailer.sendMail({ from, to: form.email, subject: `${reference} - SABA service confirmation`, text: emailText, attachments: [attachment] }),
      ]);
      emailSent = true;
    }

    return NextResponse.json({ success: true, reference, requestDate, emailSent, ticketBase64: pdfBuffer.toString("base64"), ticketFilename: `${reference.toLowerCase()}-service-confirmation.pdf`, mailto });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
