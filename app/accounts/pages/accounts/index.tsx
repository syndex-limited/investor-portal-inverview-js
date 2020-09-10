import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getAccounts from "app/accounts/queries/getAccounts"

const ITEMS_PER_PAGE = 100

export const AccountsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ accounts, hasMore }] = usePaginatedQuery(getAccounts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            <Link href="/accounts/[accountId]" as={`/accounts/${account.id}`}>
              <a>{account.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const AccountsPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Accounts</title>
      </Head>

      <main>
        <h1>Accounts</h1>

        <p>
          <Link href="/accounts/new">
            <a className="btn-purple">Create Account</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <AccountsList />
        </Suspense>
      </main>
    </div>
  )
}

AccountsPage.getLayout = (page) => <Layout title={"Accounts"}>{page}</Layout>

export default AccountsPage
