import type { Department } from "./department";

export interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  bio?: string;
  imageUrl?: string;
  department?: Department | string;
  createdAt?: string;
  updatedAt?: string;
}
