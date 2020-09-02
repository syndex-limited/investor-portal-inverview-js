import React from "react"
import LabelledTextField from "app/components/LabelledTextField"
import { IssueInput, IssueInputType } from "app/issues/validations"
import { Form, FormProps } from "app/components/Form"
import { LabelledNumberField } from "app/components/LabelledNumberField"

type IssueFormProps = {
  initialValues: IssueInputType
  onSubmit: FormProps<IssueInputType>["onSubmit"]
}

const IssueForm = ({ initialValues, onSubmit }: IssueFormProps) => {
  return (
    <Form<IssueInputType>
      submitText="Create Issue"
      schema={IssueInput}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <LabelledTextField name="name" label="Name" placeholder="Name" />
      <LabelledNumberField
        name="minimumQuantity"
        label="Minimum quantity"
        placeholder="Minimum quantity"
        type="number"
      />
      <LabelledNumberField name="price" label="Price" placeholder="Price" type="number" />
    </Form>
  )
}

export default IssueForm
