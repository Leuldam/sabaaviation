import { NextResponse } from "next/server";
import QRCode from "qrcode";
import nodemailer from "nodemailer";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { contactInfo } from "@/data/company";

const navy = rgb(0.03, 0.16, 0.26);
const gold = rgb(0.71, 0.49, 0.05);
const slate = rgb(0.29, 0.36, 0.41);
const pale = rgb(0.95, 0.97, 0.98);

type FormValues = Record<string, string | undefined>;

type PdfInput = { serviceTitle: string; form: FormValues; reference: string; requestDate: string; qrData: string };

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

function drawLabelValue(page: ReturnType<PDFDocument["addPage"]>, font: Awaited<ReturnType<PDFDocument["embedFont"]>>, label: string, value: string, x: number, y: number, width: number) {
  page.drawText(label.toUpperCase(), { x, y, size: 7, font, color: slate });
  const lines = wrapText(value || "-", Math.max(18, Math.floor(width / 5.3)));
  page.drawText(lines[0], { x, y: y - 14, size: 10, font, color: navy });
  return y - 14 - (lines.length - 1) * 12;
}

async function generatePdfBuffer({ serviceTitle, form, reference, requestDate, qrData }: PdfInput) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const qrMatch = qrData.match(/^data:.+;base64,(.+)$/);

  page.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: rgb(1, 1, 1) });
  page.drawRectangle({ x: 0, y: 770, width: 595, height: 72, color: navy });
  page.drawText("SABA", { x: 34, y: 807, size: 25, font: bold, color: rgb(1, 1, 1) });
  page.drawText("AVIATION SERVICE & FLIGHT SUPPORT PLC", { x: 35, y: 789, size: 7, font: regular, color: rgb(0.78, 0.84, 0.87) });
  page.drawText("SERVICE CONFIRMATION", { x: 390, y: 805, size: 10, font: bold, color: gold });
  page.drawText("REQUEST INFORMATION", { x: 35, y: 735, size: 9, font: bold, color: navy });
  page.drawLine({ start: { x: 35, y: 726 }, end: { x: 560, y: 726 }, thickness: 1, color: gold });

  drawLabelValue(page, bold, "Reference", reference, 35, 705, 160);
  drawLabelValue(page, bold, "Status", "PENDING REVIEW", 210, 705, 150);
  drawLabelValue(page, bold, "Service", serviceTitle.toUpperCase(), 380, 705, 170);
  drawLabelValue(page, bold, "Request date", requestDate, 35, 660, 160);

  page.drawText("CUSTOMER", { x: 35, y: 610, size: 9, font: bold, color: navy });
  page.drawLine({ start: { x: 35, y: 601 }, end: { x: 560, y: 601 }, thickness: 1, color: gold });
  drawLabelValue(page, bold, "Company", form.company || "-", 35, 580, 160);
  drawLabelValue(page, bold, "Contact", form.name || "-", 210, 580, 160);
  drawLabelValue(page, bold, "Email", form.email || "-", 385, 580, 170);
  drawLabelValue(page, bold, "Phone", form.phone || "-", 35, 535, 160);

  page.drawText("OPERATION", { x: 35, y: 485, size: 9, font: bold, color: navy });
  page.drawLine({ start: { x: 35, y: 476 }, end: { x: 560, y: 476 }, thickness: 1, color: gold });
  const operationFields = [
    ["Aircraft", form.aircraftType || "-"], ["Registration", form.aircraftRegistration || "-"], ["Flight", form.flightNumber || "-"],
    ["Arrival", form.arrivalAirport || form.airport || form.pickup || form.origin || "-"], ["ETA / Pickup", form.arrivalTime || form.pickupTime || form.upliftTime || "-"],
    ["Departure", form.departureAirport || form.dropoff || form.destination || "-"], ["ETD / Delivery", form.departureTime || form.deliveryDate || form.returnTime || "-"], ["Operation date", form.date || form.shipmentDate || form.upliftDate || form.returnDate || "-"],
  ];
  operationFields.forEach(([label, value], index) => drawLabelValue(page, bold, label, value || "-", 35 + (index % 3) * 175, 455 - Math.floor(index / 3) * 43, 160));

  page.drawText("REQUESTED SUPPORT", { x: 35, y: 320, size: 9, font: bold, color: navy });
  page.drawLine({ start: { x: 35, y: 311 }, end: { x: 560, y: 311 }, thickness: 1, color: gold });
  const excluded = new Set(["name", "email", "phone", "company", "details", "date", "shipmentDate", "upliftDate", "returnDate", "aircraftType", "aircraftRegistration", "flightNumber", "arrivalAirport", "departureAirport", "airport", "arrivalTime", "departureTime", "pickup", "dropoff", "pickupTime"]);
  const requested = Object.entries(form).filter(([key, value]) => value && !excluded.has(key)).map(([key, value]) => `${key.replace(/([A-Z])/g, " $1")}: ${value}`).join(" | ");
  const supportLines = wrapText(requested || "Operational coordination requested", 86);
  supportLines.slice(0, 4).forEach((line, index) => page.drawText(line, { x: 35, y: 290 - index * 15, size: 9, font: regular, color: slate }));
  page.drawText("SPECIAL REQUIREMENTS", { x: 35, y: 220, size: 9, font: bold, color: navy });
  const notes = wrapText(form.details || "No additional notes provided.", 86);
  notes.slice(0, 3).forEach((line, index) => page.drawText(line, { x: 35, y: 198 - index * 15, size: 9, font: regular, color: slate }));

  page.drawRectangle({ x: 35, y: 87, width: 525, height: 70, color: pale });
  page.drawText("SABA OPERATIONS", { x: 50, y: 133, size: 8, font: bold, color: navy });
  page.drawText("24/7 Operational Support", { x: 50, y: 116, size: 9, font: regular, color: slate });
  page.drawText(`Phone: ${contactInfo.phone}`, { x: 50, y: 101, size: 8, font: regular, color: slate });
  page.drawText(`Email: ${contactInfo.operations}`, { x: 220, y: 101, size: 8, font: regular, color: slate });
  if (qrMatch) page.drawImage(await pdfDoc.embedPng(Buffer.from(qrMatch[1], "base64")), { x: 474, y: 93, width: 52, height: 52 });

  page.drawText("SABA AVIATION SERVICE & FLIGHT SUPPORT PLC", { x: 35, y: 52, size: 7, font: bold, color: navy });
  page.drawText("Precision on the Ground. Confidence in the Air.", { x: 35, y: 39, size: 7, font: regular, color: slate });
  page.drawText("This document confirms receipt of the service request and does not constitute an airline ticket or boarding pass.", { x: 35, y: 24, size: 6.5, font: regular, color: slate });

  return Buffer.from(await pdfDoc.save());
}

export async function POST(req: Request) {
  try {
    const { serviceTitle, serviceSlug, form = {} } = await req.json() as { serviceTitle: string; serviceSlug: string; form: FormValues };
    const now = new Date();
    const reference = `SABA-${now.getFullYear()}-${String(Date.now() % 1000000).padStart(6, "0")}`;
    const requestDate = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const qrData = await QRCode.toDataURL(JSON.stringify({ reference, serviceSlug, email: form.email }));
    const pdfBuffer = await generatePdfBuffer({ serviceTitle, form, reference, requestDate, qrData });
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
