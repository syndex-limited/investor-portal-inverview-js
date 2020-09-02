import { NotFoundError, SessionContext } from "blitz"
import db, { FindOneIssueArgs } from "db"

type GetIssueInput = {
  where: FindOneIssueArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneIssueArgs['include']
}

export default async function getIssue(
  { where /* include */ }: GetIssueInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const issue = await db.issue.findOne({ where })

  if (!issue) throw new NotFoundError()

  return issue
}
