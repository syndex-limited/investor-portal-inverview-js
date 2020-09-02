import { SessionContext } from "blitz"
import db, { FindManyAccountArgs } from "db"

type GetAccountsInput = {
  where?: FindManyAccountArgs["where"]
  orderBy?: FindManyAccountArgs["orderBy"]
  skip?: FindManyAccountArgs["skip"]
  take?: FindManyAccountArgs["take"]
  // Only available if a model relationship exists
  // include?: FindManyAccountArgs['include']
}

export default async function getAccounts(
  { where, orderBy, skip = 0, take }: GetAccountsInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const accounts = await db.account.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.account.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    accounts,
    nextPage,
    hasMore,
  }
}
