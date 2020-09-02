import { NotFoundError, SessionContext } from "blitz"
import db, { FindOneAccountArgs } from "db"

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

  const account = await db.account.findOne({ where })

  if (!account) throw new NotFoundError()

  return account
}
