import { SessionContext } from "blitz"
import db, { IssueCreateArgs } from "db"
import { IssueInputType, IssueInput } from "../validations"

type CreateIssueInput = {
  input: IssueInputType
}
export default async function createIssue(
  { input }: CreateIssueInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const data = IssueInput.parse(input)

  const issue = await db.issue.create({ data })

  return issue
}
