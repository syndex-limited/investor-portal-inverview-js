import { SessionContext } from "blitz"
import db, { AccountDeleteArgs } from "db"

type DeleteAccountInput = {
  where: AccountDeleteArgs["where"]
}

export default async function deleteAccount(
  { where }: DeleteAccountInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const account = await db.account.delete({ where })

  return account
}
