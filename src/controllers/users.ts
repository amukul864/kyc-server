import User from "../models/user";
import IUser from "../utils/interfaces";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const users = async (req: Request, res: Response) => {
  const shareId = req.params.shareId as string;
  const id = new mongoose.Types.ObjectId(shareId);

  try {
    const existingUser = await User.findOne({ _id: id });
    if (existingUser) {
      res.status(200).json({
        data: {
          proposalNumber: existingUser.proposalNumber,
          referalNumber: existingUser.referalNumber,
          personal: existingUser.personal,
          plan: existingUser.plan,
          rider: existingUser.rider,
        },
      });
    } else {
      res.status(404).json({ error: { message: "User Not Found" } });
    }
  } catch (err) {
    res.status(500).json({ error: { message: "Something Went Wrong" }, err });
  }
};
