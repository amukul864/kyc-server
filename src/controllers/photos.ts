import User from "../models/user";
import IUser from "../utils/interfaces";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const screenshots = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: { message: "No File Uploaded." } });
  }

  res.status(200).json({ data: "ok" });
};

export const faceDetect = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: { message: "No File Uploaded." } });
  }

  const shareId = req.body.shareId as string;
  const id = new mongoose.Types.ObjectId(shareId);

  try {
    const existingUser = await User.findOne({ _id: id });
    if (existingUser) {
      existingUser.faceDetected = true;
      await existingUser.save();
      res
        .status(200)
        .json({ data: { faceDetected: existingUser.faceDetected } });
    } else {
      res.status(404).json({ error: { message: "User Not Found" } });
    }
  } catch (err) {
    res.status(500).json({ error: { message: "Something Went Wrong" }, err });
  }
};

export const faceCompare = async (req: Request, res: Response) => {
  const fileArrays = Object.values(req.files || {});
  if (!req.files || fileArrays.length !== 2) {
    return res.status(400).json({ error: { message: "No File Uploaded." } });
  }

  const shareId = req.body.shareId as string;
  const id = new mongoose.Types.ObjectId(shareId);

  try {
    const existingUser = await User.findOne({ _id: id });
    if (existingUser) {
      existingUser.isSimilar = true;
      existingUser.similarity = 99;
      await existingUser.save();
      res.status(200).json({
        data: {
          isSimilar: existingUser.isSimilar,
          similarity: existingUser.similarity,
        },
      });
    } else {
      res.status(404).json({ error: { message: "User Not Found" } });
    }
  } catch (err) {
    res.status(500).json({ error: { message: "Something Went Wrong" }, err });
  }
};
