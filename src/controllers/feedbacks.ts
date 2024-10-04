import User from "../models/user";
import IUser from "../utils/interfaces";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const feedbacks = async (req: Request, res: Response) => {
  const shareId = req.params.shareId as string;
  const id = new mongoose.Types.ObjectId(shareId);

  try {
    const existingUser = await User.findOne({ _id: id });
    if (existingUser) {
      existingUser.feedbacks = new mongoose.Types.DocumentArray(req.body.feedbacks);
      await existingUser.save();
      res.json({ data: "ok" });
    } else {
      res.status(404).json({ error: { message: "User Not Found" } });
    }
  } catch (err) {
    res.status(500).json({ error: { message: "Something Went Wrong" }, err });
  }
};

export const disagreements = async (req: Request, res: Response) => {
  const shareId = req.params.shareId as string;
  const id = new mongoose.Types.ObjectId(shareId);

  try {
    const existingUser = await User.findOne({ _id: id });
    if (existingUser) {
      existingUser.disagreements = new mongoose.Types.DocumentArray(req.body.disagreements);
      await existingUser.save();
      res.json({ data: "ok" });
    } else {
      res.status(404).json({ error: { message: "User Not Found" } });
    }
  } catch (err) {
    res.status(500).json({ error: { message: "Something Went Wrong" }, err });
  }
};

export const getFeedbacks = async (req: Request, res: Response) => {
  const shareId = req.params.shareId as string;
  const id = new mongoose.Types.ObjectId(shareId);

  try {
    const existingUser = await User.findOne({ _id: id });
    if (existingUser) {
      res.json({ data: { feedbacks: existingUser.feedbacks } });
    } else {
      res.status(404).json({ error: { message: "User Not Found" } });
    }
  } catch (err) {
    res.status(500).json({ error: { message: "Something Went Wrong" }, err });
  }
};
