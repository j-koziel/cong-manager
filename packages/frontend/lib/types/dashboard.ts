import { z } from "zod";

export const generateTokenFormSchema = z.object({
  userEmail: z.string().email(),
});

export const newInformationBoardItemFormSchema = z.object({
  // We can discuss what other things it could or could not be
  type: z.enum(["Announcement", "Information", "Event", ""]),
  summary: z.optional(z.string()),
  congregationId: z.number().min(0).nullable(),
});

export const informationBoardItemSchema = z.object({
  type: z.enum(["Announcement", "Information", "Event"]),
  summary: z.string(),
  congregationId: z.number().min(0),
});

export type GenerateTokenFormData = z.infer<typeof generateTokenFormSchema>;
export type InformationBoardItem = z.infer<typeof informationBoardItemSchema>;
export type NewInformationBoardItem = z.infer<
  typeof newInformationBoardItemFormSchema
>;
