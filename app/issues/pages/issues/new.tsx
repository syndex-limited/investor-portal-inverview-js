import React from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, BlitzPage } from "blitz"
import createIssue from "app/issues/mutations/createIssue"
import IssueForm from "app/issues/components/IssueForm"

const NewIssuePage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>New Issue</title>
      </Head>

      <main>
        <h1>Create New Issue</h1>

        <IssueForm
          initialValues={{ name: "", minimumQuantity: NaN, price: NaN }}
          onSubmit={async (input) => {
            try {
              const issue = await createIssue({ input })
              router.push("/issues/[issueId]", `/issues/${issue.id}`)
            } catch (error) {
              alert("Error creating issue " + JSON.stringify(error, null, 2))
            }
          }}
        />

        <p>
          <Link href="/issues">
            <a>Issues</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

NewIssuePage.getLayout = (page) => <Layout title={"Create New Issue"}>{page}</Layout>

export default NewIssuePage
