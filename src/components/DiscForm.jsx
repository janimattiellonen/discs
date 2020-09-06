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

const Main = styled.div`
  max-width: 900px;
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

const checkBox = ({ field, id, label, form, ...props }) => {
  const idVal = !!id ? id : field.name

  return (
    <Label htmlFor={idVal}>
      {label}
      <input type="checkbox" id={idVal} {...field} {...props} />
    </Label>
  )
}

const defaultValues = () => ({
  price: '',
  price_status: '',
  type: '',
  name: '',
  manufacturer: '',
  color: '',
  material: '',
  speed: '',
  glide: '',
  stability: '',
  fade: '',
  additional: '',
  weight: '',
  image: '',
  is_missing: false,
  missing_description: '',
  is_sold: false,
  sold_at: '',
  sold_for: '',
  is_broken: false,
  is_hole_in_one: false,
  hole_in_one_date: '',
  hole_in_one_description: '',
  is_collection_item: false,
  is_own_stamp: false,
  is_donated: false,
})

const DiscForm = ({ manufacturers, onSave, types }) => {
  return (
    <Main>
      <h2>New disc</h2>

      <div>
        <Formik
          initialValues={defaultValues()}
          onSubmit={async values => {
            onSave(values)
          }}
        >
          {({ isSubmitting, getFieldProps, handleChange, handleBlur, values }) => (
            <Form>
              <Field name="name" label="Name" component={TextInput} />

              <Field name="price" label="Price" component={TextInput} />

              <Label htmlFor="price_status">
                <LabelSpan>Price status</LabelSpan>
                <Field component="select" id="type" name="price_status" multiple={false}>
                  <option value="">Has price</option>
                  <option value="gift">Gift</option>
                  <option value="price_unknown">Price unknown</option>
                </Field>
              </Label>

              <Label htmlFor="type">
                <LabelSpan>Type</LabelSpan>
                <Field component="select" id="type" name="type" multiple={false}>
                  <option value="">Select type...</option>
                  {types.map((type, i) => (
                    <option key={i} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Field>
              </Label>

              <Label htmlFor="manufacturer">
                <LabelSpan>Manufacturer</LabelSpan>
                <Field component="select" id="type" name="manufacturer" multiple={false}>
                  <option value="">Select manufacturer...</option>
                  {manufacturers.map((manufacturer, i) => (
                    <option key={i} value={manufacturer.id}>
                      {manufacturer.name}
                    </option>
                  ))}
                </Field>
              </Label>

              <Field name="color" label="Color" component={TextInput} />

              <Field name="material" label="Material" component={TextInput} />

              <Field name="speed" label="Speed" component={TextInput} />

              <Field name="glide" label="Glide" component={TextInput} />

              <Field name="stability" label="Stability" component={TextInput} />

              <Field name="fade" label="Fade" component={TextInput} />

              <Field name="weight" label="Weight" component={TextInput} />

              <Label htmlFor="is_missing">
                <LabelSpan>Missing</LabelSpan>
                <Field name="is_missing" id="is_missing" type="checkbox" />
              </Label>

              <Field name="missing_description" label="Missing description" component={TextInput} />

              <Label htmlFor="is_sold">
                <LabelSpan>Sold</LabelSpan>
                <Field name="is_sold" id="is_sold" type="checkbox" />
              </Label>

              <Field name="sold_at" label="Sold at" component={TextInput} />

              <Field name="sold_for" label="Sold for" component={TextInput} />

              <Label htmlFor="is_broken">
                <LabelSpan>Broken</LabelSpan>

                <Field name="is_broken" id="is_broken" type="checkbox" />
              </Label>

              <Label htmlFor="is_hole_in_one">
                <LabelSpan>Hole in one</LabelSpan>
                <Field name="is_hole_in_one" id="is_hole_in_one" type="checkbox" />
              </Label>

              <Field name="hole_in_one_date" label="Hole in one date" component={TextInput} />

              <Label htmlFor="hole_in_one_description">
                <LabelSpan>Hole in one description</LabelSpan>
                <Field id="hole_in_one_description" name="hole_in_one_description" type="textarea" />
              </Label>

              <Label htmlFor="is_collection_item">
                <LabelSpan>Collection item</LabelSpan>
                <Field name="is_collection_item" id="is_collection_item" type="checkbox" />
              </Label>

              <Label htmlFor="is_own_stamp">
                <LabelSpan>Own stamp</LabelSpan>
                <Field name="is_own_stamp" id="is_own_stamp" type="checkbox" />
              </Label>

              <Label htmlFor="is_donated">
                <LabelSpan>Donated</LabelSpan>
                <Field name="is_donated" id="is_donated" type="checkbox" />
              </Label>

              <Label htmlFor="donation_description">
                <LabelSpan>Donation description</LabelSpan>
                <Field name="donation_description" id="donation_description" type="textarea" />
              </Label>

              <Label htmlFor="additional">
                <LabelSpan>Additional</LabelSpan>
                <Field name="additional" id="Additional" type="textarea" />
              </Label>

              <Button variant="contained" type="submit" color="primary" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Main>
  )
}

export default DiscForm
