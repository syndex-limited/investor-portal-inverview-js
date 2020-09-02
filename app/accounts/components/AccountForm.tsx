import React from "react"
import { Form, FormProps } from "app/components/Form"
import { AccountInput, AccountInputType } from "app/accounts/validations"
import LabelledTextField from "app/components/LabelledTextField"
import LabelledCheckbox from "app/components/LabelledCheckbox"

type AccountFormProps = {
  initialValues: AccountInputType
  onSubmit: FormProps<AccountInputType>["onSubmit"]
}

const AccountForm = ({ initialValues, onSubmit }: AccountFormProps) => {
  return (
    <Form<AccountInputType>
      submitText="Create Account"
      schema={AccountInput}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <LabelledTextField name="name" label="Name" placeholder="Name" />
      <LabelledCheckbox name="verified" label="Verified?" />
    </Form>
  )
}

export default AccountForm
