import { z } from "zod";

/**
 * Hedgehog interface shared between server and client
 */

export const hedgehogSchema = z.object({ 
  id: z.number(),
  hedgehog_name: z.string(),
  hedgehog_cakeday: z.date().nullable(),
  hedgehog_gender: z.string(),
  hedgehog_location: z.string()
});

export type Hedgehog = z.infer<typeof hedgehogSchema>;