import React from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { Form, FORM_ERROR } from "app/components/Form"
import { LabelledTextField } from "app/components/LabelledTextField"
import signup from "app/auth/mutations/signup"
import { SignupInput, SignupInputType } from "app/auth/validations"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <h1>Create an Account</h1>

      <Form<SignupInputType>
        submitText="Create Account"
        schema={SignupInput}
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signup({ name: values.name, email: values.email, password: values.password })
            router.push("/")
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabelledTextField name="name" label="Name" placeholder="Name" />
        <LabelledTextField name="email" label="Email" placeholder="Email" />
        <LabelledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </div>
  )
}

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
