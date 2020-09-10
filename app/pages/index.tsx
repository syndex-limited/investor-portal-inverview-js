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

      <button disabled={page === 0} onClick={goToPreviousPage} className="btn-clear mt-4">
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage} className="btn-clear ml-4 mt-4">
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
        <h1 className="text-4xl">Issues</h1>

        <div className="my-6">
          <Link href="/issues/new">
            <a className="btn-purple">Create Issue</a>
          </Link>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <IssuesList />
        </Suspense>
      </main>
    </div>
  )
}

IssuesPage.getLayout = (page) => <Layout title={"Issues"}>{page}</Layout>

export default IssuesPage
