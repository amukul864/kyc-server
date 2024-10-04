import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import User from "../models/user";
import ensureDirectoryExists from "../utils/createDirectory";

export const validate = async (req: Request, res: Response) => {
  const shareId = req.params.shareId as string;
  const id = new mongoose.Types.ObjectId(shareId);

  try {
    const existingUser = await User.findOne({ _id: id });
    if (existingUser) {
      res.status(200).json({ data: { language: existingUser.language } });
    } else {
      res.status(404).json({ error: { message: "User Not Found" } });
    }
  } catch (err) {
    res.status(500).json({ error: { message: "Something Went Wrong" }, err });
  }
};

export const reports = async (req: Request, res: Response) => {
  const shareId = req.params.shareId as string;
  const id = new mongoose.Types.ObjectId(shareId);

  try {
    const existingUser = await User.findOne({ _id: id });
    if (existingUser) {
      const reportUrl = existingUser.relativePath + "/" + shareId;
      ensureDirectoryExists(reportUrl);
      if (fs.existsSync(reportUrl + `/report.pdf`)) {
        try {
          fs.renameSync(
            reportUrl + `/report.pdf`,
            reportUrl + `/report-${Date.now()}.pdf`,
          );
        } catch (err) {
          console.error("Error renaming file:", err);
        }
      }
      const doc = new PDFDocument();
      let include = false;
      doc.pipe(fs.createWriteStream(reportUrl + `/report.pdf`));
      for (let i = 0; i < existingUser.workflows.length; i++) {
        if (existingUser.workflows[i].url === "upload-id") {
          include = true;
          doc.fontSize(18).text("Upload-Id", {
            align: "center",
          });
          const files = fs.readdirSync(reportUrl + "/upload-id");
          files.forEach((file, index) => {
            const filePath = path.join(reportUrl + "/upload-id", file);
            const fileExtension = path.extname(file).toLowerCase();
            if (fileExtension.match(/\.(jpg|jpeg|png|gif)$/)) {
              {
                index % 2 !== 0
                  ? doc.addPage()
                  : index !== 0 && doc.moveDown(12);
              }
              doc.image(filePath, {
                fit: [250, 200],
                align: "center",
                valign: "center",
              });
            }
          });
        } else if (existingUser.workflows[i].url === "personal-details") {
          doc.fontSize(18).text("Personal Details", {
            align: "center",
          });
          const files = fs.readdirSync(reportUrl + "/personal-details");
          files.forEach((file, index) => {
            const filePath = path.join(reportUrl + "/personal-details", file);
            const fileExtension = path.extname(file).toLowerCase();
            if (
              fileExtension.match(/\.(jpg|jpeg|png|gif)$/) &&
              (include || (!include && file !== "photoFace.jpg"))
            ) {
              {
                if (include) {
                  index % 2 !== 0
                    ? doc.addPage()
                    : index !== 0 && doc.moveDown(12);
                }
              }
              doc.image(filePath, {
                fit: [250, 200],
                align: "center",
                valign: "center",
              });
            }
          });
        } else if (existingUser.workflows[i].url === "plan-details") {
          doc.fontSize(18).text("Plan Details", {
            align: "center",
          });
          const files = fs.readdirSync(reportUrl + "/plan-details");
          files.forEach((file, index) => {
            const filePath = path.join(reportUrl + "/plan-details", file);
            const fileExtension = path.extname(file).toLowerCase();
            if (fileExtension.match(/\.(jpg|jpeg|png|gif)$/)) {
              {
                index % 2 !== 0
                  ? doc.addPage()
                  : index !== 0 && doc.moveDown(12);
              }
              doc.image(filePath, {
                fit: [250, 200],
                align: "center",
                valign: "center",
              });
            }
          });
        } else if (existingUser.workflows[i].url === "rider-details") {
          doc.fontSize(18).text("Rider Details", {
            align: "center",
          });
          const files = fs.readdirSync(reportUrl + "/rider-details");
          files.forEach((file, index) => {
            const filePath = path.join(reportUrl + "/rider-details", file);
            const fileExtension = path.extname(file).toLowerCase();
            if (fileExtension.match(/\.(jpg|jpeg|png|gif)$/)) {
              {
                index % 2 !== 0
                  ? doc.addPage()
                  : index !== 0 && doc.moveDown(12);
              }
              doc.image(filePath, {
                fit: [250, 200],
                align: "center",
                valign: "center",
              });
            }
          });
        } else if (existingUser.workflows[i].url === "disclaimer") {
          doc.fontSize(18).text("Disclaimer", {
            align: "center",
          });
          const files = fs.readdirSync(reportUrl + "/disclaimer");
          files.forEach((file, index) => {
            const filePath = path.join(reportUrl + "/disclaimer", file);
            const fileExtension = path.extname(file).toLowerCase();
            if (fileExtension.match(/\.(jpg|jpeg|png|gif)$/)) {
              {
                index % 2 !== 0
                  ? doc.addPage()
                  : index !== 0 && doc.moveDown(12);
              }
              doc.image(filePath, {
                fit: [250, 200],
                align: "center",
                valign: "center",
              });
            }
          });
        } else if (existingUser.workflows[i].url === "customer-feedback") {
          doc.fontSize(18).text("Customer Feedback", {
            align: "center",
          });
          if (existingUser.language === "en-IN") {
            for (let i = 0; i < existingUser.feedbacks.length; i++) {
              doc
                .moveDown()
                .fontSize(14)
                .text(
                  `${existingUser.feedbacks[i].label} => ${existingUser.feedbacks[i].value}`,
                  {
                    align: "center",
                  },
                );
            }
          }
          const files = fs.readdirSync(reportUrl + "/customer-feedback");
          files.forEach((file, index) => {
            const filePath = path.join(reportUrl + "/customer-feedback", file);
            const fileExtension = path.extname(file).toLowerCase();
            if (fileExtension.match(/\.(jpg|jpeg|png|gif)$/)) {
              {
                index % 2 !== 0
                  ? doc.addPage()
                  : index !== 0 && doc.moveDown(12);
              }
              doc.image(filePath, {
                fit: [250, 200],
                align: "center",
                valign: "center",
              });
            }
          });
        } else if (existingUser.workflows[i].url === "photo-consent") {
          doc.fontSize(18).text("Photo Consent", {
            align: "center",
          });
          doc.moveDown();
          doc.fontSize(14).text(`Similar: ${existingUser.isSimilar}`, {
            align: "center",
          });
          doc.moveDown();
          doc
            .fontSize(14)
            .text(`Similarity Score: ${existingUser.similarity}`, {
              align: "center",
            });
          const files = fs.readdirSync(reportUrl + "/photo-consent");
          files.forEach((file, index) => {
            const filePath = path.join(reportUrl + "/photo-consent", file);
            const fileExtension = path.extname(file).toLowerCase();
            if (fileExtension.match(/\.(jpg|jpeg|png|gif)$/)) {
              {
                index % 2 !== 0
                  ? doc.addPage()
                  : index !== 0 && doc.moveDown(12);
              }
              doc.image(filePath, {
                fit: [250, 200],
                align: "center",
                valign: "center",
              });
            }
          });
        } else if (existingUser.workflows[i].url === "video-consent") {
          doc.fontSize(18).text("Video Consent", {
            align: "center",
          });
          if (existingUser.language === "en-IN") {
            doc.moveDown();
            doc.fontSize(14).text(`Script: ${existingUser.script}`, {
              align: "center",
            });
            doc.moveDown();
            doc.fontSize(18).text("Customer Attributes", {
              align: "center",
            });
            for (let i = 0; i < existingUser.customerAttributes.length; i++) {
              doc
                .moveDown()
                .fontSize(14)
                .text(
                  `${existingUser.customerAttributes[i].label} => ${existingUser.customerAttributes[i].value}`,
                  {
                    align: "center",
                  },
                );
            }
          }
          doc.moveDown();
          doc
            .fontSize(14)
            .text(
              `${
                "localhost:4000/" +
                reportUrl +
                "/video-consent/videoConsent.mp4"
              } : Video Link`,
              {
                align: "center",
              },
            );
          const files = fs.readdirSync(reportUrl + "/video-consent");
          files.forEach((file, index) => {
            const filePath = path.join(reportUrl + "/video-consent", file);
            const fileExtension = path.extname(file).toLowerCase();
            if (
              fileExtension.match(/\.(jpg|jpeg|png|gif)$/) &&
              (include ||
                (!include &&
                  file !== "photoId.jpg" &&
                  file !== "photoConsent.jpg"))
            ) {
              {
                if (include) {
                  index % 2 !== 0
                    ? doc.addPage()
                    : index !== 0 && doc.moveDown(12);
                }
              }
              doc.image(filePath, {
                fit: [250, 200],
                align: "center",
                valign: "center",
              });
            }
          });
        } else if (existingUser.workflows[i].url === "permissions") {
          doc.fontSize(18).text("Permissions", {
            align: "center",
          });
          doc.moveDown();
          doc
            .fontSize(14)
            .text(
              `Camera And Microphone Enabled: ${existingUser.activities?.cameraMicrophoneEnabled}`,
              {
                align: "center",
              },
            );
          doc.moveDown();
          doc
            .fontSize(14)
            .text(
              `Location Enabled: ${existingUser.activities?.locationEnabled}`,
              {
                align: "center",
              },
            );
          doc.moveDown();
          doc
            .fontSize(14)
            .text(`Longitude: ${existingUser.activities?.longitude}`, {
              align: "center",
            });
          doc.moveDown();
          doc
            .fontSize(14)
            .text(`Latitude: ${existingUser.activities?.latitude}`, {
              align: "center",
            });
          doc.moveDown();
          doc
            .fontSize(14)
            .text(`Browser: ${existingUser.activities?.browser}`, {
              align: "center",
            });
          doc.moveDown();
          doc
            .fontSize(14)
            .text(`Version: ${existingUser.activities?.version}`, {
              align: "center",
            });
          doc.moveDown();
          doc
            .fontSize(14)
            .text(`App Name: ${existingUser.activities?.appName}`, {
              align: "center",
            });
          doc.moveDown();
          doc
            .fontSize(14)
            .text(`User Agent: ${existingUser.activities?.userAgent}`, {
              align: "center",
            });
          if (existingUser.disagreements.length > 0) {
            doc.moveDown();
            doc.fontSize(18).text(`Disagreements`, {
              align: "center",
            });
            for (let i = 0; i < existingUser.disagreements.length; i++) {
              doc
                .moveDown()
                .fontSize(14)
                .text(
                  `${existingUser.disagreements[i].url} => ${existingUser.disagreements[i].disagreement}`,
                  {
                    align: "center",
                  },
                );
            }
          }
        }
        if (i !== existingUser.workflows.length - 1) {
          doc.addPage();
        }
      }
      doc.end();
      res.status(200).json({ data: { reportUrl: reportUrl + `/report.pdf` } });
    } else {
      res.status(404).json({ error: { message: "User Not Found" } });
    }
  } catch (err) {
    res.status(500).json({ error: { message: "Something Went Wrong" }, err });
  }
};
