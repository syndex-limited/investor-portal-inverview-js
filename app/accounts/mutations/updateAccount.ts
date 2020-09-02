import { SessionContext } from "blitz"
import db, { AccountUpdateArgs } from "db"
import { AccountInputType, AccountInput } from "../validations"
import getAccount from "../queries/getAccount"

type UpdateAccountInput = {
  where: AccountUpdateArgs["where"]
  input: AccountInputType
}

export default async function updateAccount(
  { where, input }: UpdateAccountInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const data = AccountInput.parse(input)
  const existingAccount = await getAccount({ where })

  const account = await db.account.update({ where: { id: existingAccount.id }, data })

  return account
}
