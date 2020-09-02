import { SessionContext } from "blitz"
import db, { AccountDeleteArgs } from "db"
import getAccount from "../queries/getAccount"

type DeleteAccountInput = {
  where: AccountDeleteArgs["where"]
}

export default async function deleteAccount(
  { where }: DeleteAccountInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const existingAccount = await getAccount({ where })

  const account = await db.account.delete({ where: { id: existingAccount.id } })

  return account
}
