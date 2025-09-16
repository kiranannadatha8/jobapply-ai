import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const ProfileSchema = z.object({
  basics: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email().optional().nullable(),
    phone: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    linkedin: z.string().optional().nullable(),
    github: z.string().optional().nullable(),
    website: z.string().url().optional().nullable(),
  }),
  education: z
    .array(
      z.object({
        school: z.string(),
        degree: z.string().optional().nullable(),
        start: z.string().optional().nullable(),
        end: z.string().optional().nullable(),
      })
    )
    .default([]),
  experience: z
    .array(
      z.object({
        company: z.string(),
        title: z.string().optional().nullable(),
        start: z.string().optional().nullable(),
        end: z.string().optional().nullable(),
        bullets: z.array(z.string()).default([]),
      })
    )
    .default([]),
  projects: z
    .array(
      z.object({
        name: z.string(),
        description: z.string().optional().nullable(),
        skills: z.array(z.string()).default([]),
      })
    )
    .default([]),
  skills: z.array(z.string()).default([]),
});

export type Profile = z.infer<typeof ProfileSchema>;

export const ProfileJsonSchema = zodToJsonSchema(ProfileSchema, {
  name: "Profile",
});
