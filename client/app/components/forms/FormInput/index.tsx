import React from 'react'
import { Field, ErrorMessage } from 'formik'

interface Props {
  type: string
  name: string
  label?: string
  placeholder?: string
  errMsg?: string
}

const FormInput: React.FC<Props> = ({ type, name, label, ...otherProps }) => {
  return (
    <div className="formRow">
      {label && <label>{label}</label>}

      <Field name={name} type={type} {...otherProps} />
      <ErrorMessage name={name} />
    </div>
  )
}

export default FormInput
