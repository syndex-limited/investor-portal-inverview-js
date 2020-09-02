import { SessionContext } from "blitz"
import db, { FindManyAccountArgs } from "db"
import { getCurrentUserAccount } from "app/users/getCurrentUserAccount"

type GetAccountsInput = {
  where?: FindManyAccountArgs["where"]
  orderBy?: FindManyAccountArgs["orderBy"]
  skip?: FindManyAccountArgs["skip"]
  take?: FindManyAccountArgs["take"]
  include?: FindManyAccountArgs["include"]
}

export default async function getAccounts(
  { where: inputWhere, orderBy, skip = 0, take }: GetAccountsInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const account = await getCurrentUserAccount(null, ctx)

  const where = {
    OR: [{ id: account!.id }, { officers: { some: { secondaryAccountId: account!.id } } }],
    AND: inputWhere,
  }

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
