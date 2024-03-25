import { z } from "zod";

/**
 * Hedgehog interface shared between server and client
 */

// TODO: loput siilin tietomallista. Zod:lta löytyy esimerkiksi tällaisia tyyppejä: z.enum(), z.string(), z.number() jne. joita voi olla tarpeen hyödyntää
export const hedgehogSchema = z.object({ 
  id: z.number(),
  name: z.string(),
  cakeday: z.date(),
  genger: z.string(),
//   cakeday: z.string().transform((str) => new Date(str)),
});

export type Hedgehog = z.infer<typeof hedgehogSchema>;
