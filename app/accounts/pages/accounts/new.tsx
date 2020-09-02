import React from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, BlitzPage } from "blitz"
import createAccount from "app/accounts/mutations/createAccount"
import AccountForm from "app/accounts/components/AccountForm"

const NewAccountPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>New Account</title>
      </Head>

      <main>
        <h1>Create New Account</h1>

        <AccountForm
          initialValues={{ name: "", verified: false }}
          onSubmit={async (input) => {
            try {
              const account = await createAccount(input)
              router.push("/accounts/[accountId]", `/accounts/${account.id}`)
            } catch (error) {
              alert("Error creating account " + JSON.stringify(error, null, 2))
            }
          }}
        />

        <p>
          <Link href="/accounts">
            <a>Accounts</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

NewAccountPage.getLayout = (page) => <Layout title={"Create New Account"}>{page}</Layout>

export default NewAccountPage
