import { NotFoundError, SessionContext } from "blitz"
import db, { FindOneAccountArgs } from "db"
import getAccounts from "./getAccounts"

type GetAccountInput = {
  where: FindOneAccountArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneAccountArgs['include']
}

export default async function getAccount(
  { where /* include */ }: GetAccountInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const accounts = await getAccounts({ where, take: 1 })
  const account = accounts[0]

  if (!account) throw new NotFoundError()

  return account
}
