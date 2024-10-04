import mongoose from "mongoose";

const activitiesSchema = new mongoose.Schema(
  {
    cameraMicrophoneEnabled: { type: Boolean },
    locationEnabled: { type: Boolean },
    latitude: { type: String },
    longitude: { type: String },
    personAlive: { type: Boolean },
    browser: { type: String },
    version: { type: String },
    appName: { type: String },
    userAgent: { type: String },
  },
  { _id: false },
);

const labelValueSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    sortOrder: { type: Number, required: true },
  },
  { _id: false },
);

const workflowsSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    sortOrder: { type: Number, required: true },
  },
  { _id: false },
);

const disagreementsSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    disagreement: { type: String, required: true },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    language: { type: String, required: true },
    relativePath: { type: String, required: true },
    activities: activitiesSchema,
    isSimilar: { type: Boolean },
    similarity: { type: Number },
    faceDetected: { type: Boolean },
    proposalNumber: { type: String, required: true, unique: true },
    referalNumber: { type: String },
    personal: [labelValueSchema],
    plan: [labelValueSchema],
    rider: [labelValueSchema],
    script: { type: String },
    customerAttributes: [labelValueSchema],
    feedbacks: [labelValueSchema],
    workflows: [workflowsSchema],
    disagreements: [disagreementsSchema]
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
