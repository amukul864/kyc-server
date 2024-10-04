import User from "../models/user";
import IUser, { IWorkflows } from "../utils/interfaces";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const workflows = async (req: Request, res: Response) => {
  let i = 0;
  const pages: IWorkflows[] = [];
  const shareId = req.params.shareId as string;
  const id = new mongoose.Types.ObjectId(shareId);

  try {
    const existingUser = await User.findOne({ _id: id });
    if (existingUser) {
      if (existingUser.workflows.length !== 0) {
        res.status(200).json({ data: { pages: existingUser.workflows } });
        return;
      }
      pages.push({ url: "permissions", sortOrder: ++i });
      if (existingUser.isSimilar !== undefined) {
        pages.push({ url: "upload-id", sortOrder: ++i });
        pages.push({ url: "photo-consent", sortOrder: ++i });
      }
      if (existingUser.personal.length !== 0) {
        pages.push({ url: "personal-details", sortOrder: ++i });
      }
      if (existingUser.plan.length !== 0) {
        pages.push({ url: "plan-details", sortOrder: ++i });
      }
      if (existingUser.rider.length !== 0) {
        pages.push({ url: "rider-details", sortOrder: ++i });
      }
      pages.push({ url: "disclaimer", sortOrder: ++i });
      pages.push({ url: "video-consent", sortOrder: ++i });
      pages.push({ url: "customer-feedback", sortOrder: ++i });
      existingUser.workflows = new mongoose.Types.DocumentArray(pages);
      await existingUser.save();
      res.status(200).json({ data: { pages } });
    } else {
      res.status(404).json({ error: { message: "User Not Found" } });
    }
  } catch (err) {
    res.status(500).json({ error: { message: "Something Went Wrong" }, err });
  }
};
