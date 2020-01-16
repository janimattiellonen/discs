import React from 'react'

import { Formik, Field, Form } from 'formik'

import Button from '@material-ui/core/Button'

import styled from 'styled-components'

const Label = styled.label`
  color: black;
  display: block;

  & > input {
    width: 100%;
  }

  & > select {
    min-width: 100%;
  }

  @media (min-width: 380px) {
    & > input {
      width: inherit;
    }

    & > select {
      min-width: 200px;
    }
  }

  & > input[type='checkbox'] {
    width: inherit;
  }
`

const LabelSpan = styled.span`
  display: inline-block;
  width: 100%;
  display: block;

  @media (min-width: 380px) {
    display: inline-block;
    width: 50%;
  }
`

const TextInput = ({ field, id, label, form, ...props }) => {
  const idVal = !!id ? id : field.name

  return (
    <Label htmlFor={idVal}>
      <LabelSpan>{label}</LabelSpan>
      <input type="text" id={idVal} {...field} {...props} />
    </Label>
  )
}

const PasswordInput = ({ field, id, label, form, ...props }) => {
  const idVal = !!id ? id : field.name

  return (
    <Label htmlFor={idVal}>
      <LabelSpan>{label}</LabelSpan>
      <input type="password" id={idVal} {...field} {...props} />
    </Label>
  )
}

const LoginForm = ({ onLogin }) => (
  <div>
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async values => {
        onLogin(values.username, values.password)
      }}
    >
      {({ isSubmitting, getFieldProps, handleChange, handleBlur, values }) => (
        <Form>
          <Field name="username" label="User" component={TextInput} />

          <Field name="password" label="Password" component={PasswordInput} />

          <Button variant="contained" type="submit" color="primary" disabled={isSubmitting}>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  </div>
)

export default LoginForm
