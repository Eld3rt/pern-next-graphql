import React from 'react'
import { Field } from 'formik'

interface Props {
  type: string
  name: string
  label?: string
  placeholder?: string
  className?: string
  onInput?: (e: any) => void
}

const FormInput: React.FC<Props> = ({ type, name, label, className, ...otherProps }) => {
  return (
    <div className="formRow">
      {label && <label>{label}</label>}

      <Field name={name} type={type} className={className} {...otherProps} />
    </div>
  )
}

export default FormInput
