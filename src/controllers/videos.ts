import User from "../models/user";
import IUser, { ILabelValue } from "../utils/interfaces";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const consent = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: { message: "No File Uploaded." } });
  }
  const customerAttributes = new mongoose.Types.DocumentArray(
    JSON.parse(req.body.customerAttributes),
  ) as mongoose.Types.DocumentArray<ILabelValue>;
  const id = new mongoose.Types.ObjectId(req.body.shareId as string);
  try {
    const existingUser = await User.findOne({ _id: id });
    if (existingUser) {
      existingUser.customerAttributes = customerAttributes;
      await existingUser.save();
      res.status(200).json({ data: "ok" });
    } else {
      res.status(404).json({ error: { message: "User Not Found" } });
    }
  } catch (err) {
    res.status(500).json({ error: { message: "Something Went Wrong" }, err });
  }
};

export const scripts = async (req: Request, res: Response) => {
  const language = req.query.language;
  const shareId = req.query.shareId as string;
  const id = new mongoose.Types.ObjectId(shareId);

  try {
    const existingUser = await User.findOne({ _id: id });
    if (existingUser) {
      const script = existingUser.script;
      const speechUrl =
        existingUser.relativePath + "/" + shareId + `/speech-${language}.mp3`;
      const customerAttributes = existingUser.customerAttributes;
      res.json({ data: { script, speechUrl, customerAttributes } });
    } else {
      res.status(404).json({ error: { message: "User Not Found" } });
    }
  } catch (err) {
    res.status(500).json({ error: { message: "Something Went Wrong" }, err });
  }
};
