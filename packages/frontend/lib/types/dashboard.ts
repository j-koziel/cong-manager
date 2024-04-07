import { z } from "zod";

export const generateTokenFormSchema = z.object({
  userEmail: z.string().email(),
});

export const newInformationBoardItemFormSchema = z.object({
  // We can discuss what other things it could or could not be
  type: z.enum(["Announcement", "Information", "Event", ""]),
  summary: z.optional(z.string()),
  file: z.optional(z.instanceof(File)),
});

export type GenerateTokenFormData = z.infer<typeof generateTokenFormSchema>;
export type NewInformationBoardItemFormData = z.infer<
  typeof newInformationBoardItemFormSchema
>;
