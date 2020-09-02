import { SessionContext } from "blitz"
import db from "db"
import { AccountInputType, AccountInput } from "../validations"

export default async function createAccount(
  input: AccountInputType,
  ctx: { session?: SessionContext } = {}
) {
  const { name, verified } = AccountInput.parse(input)

  ctx.session!.authorize()

  const account = await db.account.create({ data: { name, verified } })

  return account
}
