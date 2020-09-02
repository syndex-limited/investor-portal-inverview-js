import db, { Account } from "db"
import { SessionContext } from "blitz"

export async function getCurrentUserAccount(
  _ = null,
  ctx: { session?: SessionContext } = {}
): Promise<Account | null> {
  if (!ctx.session?.userId) return null

  const account = await db.user
    .findOne({
      where: { id: ctx.session!.userId! },
    })
    .account()

  return account
}
