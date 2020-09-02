import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getIssue from "app/issues/queries/getIssue"

export const Issue = () => {
  const issueId = useParam("issueId", "number")
  const [issue] = useQuery(getIssue, { where: { id: issueId } })

  return (
    <div>
      <h1>{issue.name}</h1>
      <p>Minimum quantity: {issue.minimumQuantity}</p>
      <p>Price: {issue.price}</p>
    </div>
  )
}

const ShowIssuePage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Issue</title>
      </Head>

      <main>
        <p>
          <Link href="/issues">
            <a>Issues</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Issue />
        </Suspense>
      </main>
    </div>
  )
}

ShowIssuePage.getLayout = (page) => <Layout title={"Issue"}>{page}</Layout>

export default ShowIssuePage
