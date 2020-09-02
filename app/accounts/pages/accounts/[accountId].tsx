import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getAccount from "app/accounts/queries/getAccount"
import deleteAccount from "app/accounts/mutations/deleteAccount"

export const Account = () => {
  const router = useRouter()
  const accountId = useParam("accountId", "number")
  const [account] = useQuery(getAccount, { where: { id: accountId } })

  return (
    <div>
      <h1>Account {account.name}</h1>
      {account.verified ? <p>Verified</p> : <p>Not Verified</p>}

      <Link href="/accounts/[accountId]/edit" as={`/accounts/${account.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteAccount({ where: { id: account.id } })
            router.push("/accounts")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowAccountPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Account</title>
      </Head>

      <main>
        <p>
          <Link href="/accounts">
            <a>Accounts</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Account />
        </Suspense>
      </main>
    </div>
  )
}

ShowAccountPage.getLayout = (page) => <Layout title={"Account"}>{page}</Layout>

export default ShowAccountPage
