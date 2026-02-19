import { z } from "zod";

const mongoId = z.string().regex(/^[a-f\d]{24}$/i, "Invalid id");

export const idParamSchema = z.object({
  body: z.object({}).passthrough(),
  params: z.object({ id: mongoId }),
  query: z.object({}).passthrough(),
});

export const createDepartmentSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(80),
    description: z.string().trim().min(10).max(500),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

export const updateDepartmentSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(80).optional(),
    description: z.string().trim().min(10).max(500).optional(),
  }).refine((body) => Object.keys(body).length > 0, "Provide at least one field"),
  params: z.object({ id: mongoId }),
  query: z.object({}).passthrough(),
});

export const createDoctorSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(120),
    specialty: z.string().trim().min(2).max(120),
    department: mongoId.optional(),
    bio: z.string().trim().max(1200).optional(),
    imageUrl: z.string().url().optional(),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

export const updateDoctorSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(2).max(120).optional(),
      specialty: z.string().trim().min(2).max(120).optional(),
      department: mongoId.optional(),
      bio: z.string().trim().max(1200).optional(),
      imageUrl: z.string().url().optional(),
    })
    .refine((body) => Object.keys(body).length > 0, "Provide at least one field"),
  params: z.object({ id: mongoId }),
  query: z.object({}).passthrough(),
});

export const createAppointmentSchema = z.object({
  body: z.object({
    doctor: mongoId,
    date: z.coerce.date(),
    notes: z.string().trim().max(500).optional(),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

export const updateAppointmentSchema = z.object({
  body: z
    .object({
      doctor: mongoId.optional(),
      date: z.coerce.date().optional(),
      notes: z.string().trim().max(500).optional(),
      status: z.enum(["pending", "confirmed", "cancelled"]).optional(),
    })
    .refine((body) => Object.keys(body).length > 0, "Provide at least one field"),
  params: z.object({ id: mongoId }),
  query: z.object({}).passthrough(),
});

export const createBlogPostSchema = z.object({
  body: z.object({
    title: z.string().trim().min(6).max(150),
    content: z.string().trim().min(40).max(12000),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

export const updateBlogPostSchema = z.object({
  body: z
    .object({
      title: z.string().trim().min(6).max(150).optional(),
      content: z.string().trim().min(40).max(12000).optional(),
    })
    .refine((body) => Object.keys(body).length > 0, "Provide at least one field"),
  params: z.object({ id: mongoId }),
  query: z.object({}).passthrough(),
});
