import User from "../models/user";
import IUser from "../utils/interfaces";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const activities = async (req: Request, res: Response) => {
  const shareId = req.params.shareId as string;
  const id = new mongoose.Types.ObjectId(shareId);

  try {
    const existingUser = await User.findOne({ _id: id });
    if (existingUser) {
      if (!existingUser.activities) {
        existingUser.activities = {};
      }
      const { clientInfo, coordinates } = req.body;
      existingUser.activities.cameraMicrophoneEnabled =
        req.body.cameraMicrophoneEnabled !== undefined
          ? req.body.cameraMicrophoneEnabled
          : existingUser.activities.cameraMicrophoneEnabled;
      existingUser.activities.locationEnabled =
        req.body.locationEnabled !== undefined
          ? req.body.locationEnabled
          : existingUser.activities.locationEnabled;
      existingUser.activities.latitude =
        coordinates && coordinates.latitude !== undefined
          ? coordinates.latitude
          : existingUser.activities.latitude;
      existingUser.activities.longitude =
        coordinates && coordinates.longitude !== undefined
          ? coordinates.longitude
          : existingUser.activities.longitude;
      existingUser.activities.personAlive =
        req.body.personAlive !== undefined
          ? req.body.personAlive
          : existingUser.activities.personAlive;
      existingUser.activities.browser =
        clientInfo && clientInfo.browser !== undefined
          ? clientInfo.browser
          : existingUser.activities.browser;
      existingUser.activities.version =
        clientInfo && clientInfo.version !== undefined
          ? clientInfo.version
          : existingUser.activities.version;
      existingUser.activities.appName =
        clientInfo && clientInfo.appName !== undefined
          ? clientInfo.appName
          : existingUser.activities.appName;
      existingUser.activities.userAgent =
        clientInfo && clientInfo.userAgent !== undefined
          ? clientInfo.userAgent
          : existingUser.activities.userAgent;
      await existingUser.save();
      res.status(200).json({ data: "ok" });
    } else {
      res.status(404).json({ error: { message: "User Not Found" } });
    }
  } catch (err) {
    res.status(500).json({ error: { message: "Something Went Wrong" }, err });
    console.log(err);
  }
};
