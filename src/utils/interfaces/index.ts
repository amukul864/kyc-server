export interface IActivities {
  cameraMicrophoneEnabled?: boolean;
  locationEnabled?: boolean;
  latitude?: string;
  longitude?: string;
  personAlive?: boolean;
  browser?: string;
  version?: string;
  appName?: string;
  userAgent?: string;
}

export interface ILabelValue {
  label: string;
  value: string;
  sortOrder: number;
}

export interface IWorkflows {
  url: string;
  sortOrder: number;
}

export interface IDisagreements {
  url: string;
  sortOrder: string;
}

export default interface IUser {
  language: string;
  relativePath: string;
  activities: IActivities;
  isSimilar?: boolean;
  similarity?: number;
  faceDetected?: boolean;
  proposalNumber: string;
  referalNumber?: string;
  personal: ILabelValue[];
  plan: ILabelValue[];
  rider: ILabelValue[];
  script?: string;
  customerAttributes: ILabelValue[];
  feedbacks: ILabelValue[];
  workflows: IWorkflows[];
  disagreements: IDisagreements[];
}
