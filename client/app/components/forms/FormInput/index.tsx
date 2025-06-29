import React from 'react'
import { Field } from 'formik'

interface Props {
  className?: string
  type: string
  name: string
  label?: string
  placeholder?: string
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput: React.FC<Props> = ({ type, name, label, placeholder, onInput, ...otherProps }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onInput={onInput}
        autoComplete="off"
        className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#732a46] focus:border-[#732a46] text-gray-800 placeholder-gray-400 text-sm"
        {...otherProps}
      />
    </div>
  )
}

export default FormInput
