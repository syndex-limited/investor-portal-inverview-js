import * as z from "zod"

export const IssueInput = z.object({
  name: z.string(),
  minimumQuantity: z.number().positive().int(),
  price: z.number().positive(),
})
export type IssueInputType = z.infer<typeof IssueInput>
