import { SessionContext } from "blitz"
import db, { AccountUpdateArgs } from "db"
import { AccountInputType, AccountInput } from "../validations"

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

  const account = await db.account.update({ where, data })

  return account
}
