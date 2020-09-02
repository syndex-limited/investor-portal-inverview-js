import * as z from "zod"

export const AccountInput = z.object({
  name: z.string(),
  verified: z.boolean(),
})
export type AccountInputType = z.infer<typeof AccountInput>
