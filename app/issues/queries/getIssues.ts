import { SessionContext } from "blitz"
import db, { FindManyIssueArgs } from "db"

type GetIssuesInput = {
  where?: FindManyIssueArgs["where"]
  orderBy?: FindManyIssueArgs["orderBy"]
  skip?: FindManyIssueArgs["skip"]
  take?: FindManyIssueArgs["take"]
  // Only available if a model relationship exists
  // include?: FindManyIssueArgs['include']
}

export default async function getIssues(
  { where, orderBy, skip = 0, take }: GetIssuesInput,
  ctx: { session?: SessionContext } = {}
) {
  const issues = await db.issue.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.issue.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    issues,
    nextPage,
    hasMore,
  }
}
