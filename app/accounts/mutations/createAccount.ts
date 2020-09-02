import { SessionContext } from "blitz"
import db from "db"
import { AccountInputType, AccountInput } from "../validations"
import { getCurrentUserAccount } from "app/users/getCurrentUserAccount"

export default async function createAccount(
  input: AccountInputType,
  ctx: { session?: SessionContext } = {}
) {
  const { name, verified } = AccountInput.parse(input)
  const session = ctx.session!

  session.authorize()

  const currentAccount = await getCurrentUserAccount(null, ctx)

  const account = await db.account.create({
    data: {
      name,
      verified,
      officers: { create: [{ secondaryAccount: { connect: { id: currentAccount!.id } } }] },
    },
  })

  return account
}
