import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getIssues from "app/issues/queries/getIssues"

const ITEMS_PER_PAGE = 100

export const IssuesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ issues, hasMore }] = usePaginatedQuery(getIssues, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <Link href="/issues/[issueId]" as={`/issues/${issue.id}`}>
              <a>{issue.name}</a>
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

const IssuesPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Issues</title>
      </Head>

      <main>
        <h1>Issues</h1>

        <p>
          <Link href="/issues/new">
            <a>Create Issue</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <IssuesList />
        </Suspense>
      </main>
    </div>
  )
}

IssuesPage.getLayout = (page) => <Layout title={"Issues"}>{page}</Layout>

export default IssuesPage
