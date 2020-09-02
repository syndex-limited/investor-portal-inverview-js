import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getAccount from "app/accounts/queries/getAccount"
import updateAccount from "app/accounts/mutations/updateAccount"
import AccountForm from "app/accounts/components/AccountForm"

export const EditAccount = () => {
  const router = useRouter()
  const accountId = useParam("accountId", "number")
  const [account, { mutate }] = useQuery(getAccount, { where: { id: accountId } })

  return (
    <div>
      <h1>Edit Account {account.name}</h1>

      <AccountForm
        initialValues={{ name: account.name, verified: account.verified }}
        onSubmit={async (input) => {
          try {
            const updated = await updateAccount({
              where: { id: account.id },
              input,
            })
            mutate(updated)
            router.push("/accounts/[accountId]", `/accounts/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating account " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditAccountPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Edit Account</title>
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditAccount />
        </Suspense>

        <p>
          <Link href="/accounts">
            <a>Accounts</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

EditAccountPage.getLayout = (page) => <Layout title={"Edit Account"}>{page}</Layout>

export default EditAccountPage
