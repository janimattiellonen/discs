import React from 'react'

import { Formik, Field, Form } from 'formik'

import { TextField } from 'formik-material-ui'

import styled from 'styled-components'

const Label = styled.label`
  color: black;
  display: block;
`

const LabelSpan = styled.span`
  display: inline-block;
  width: 250px;
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
  price: 10.9,
  price_status: null,
  type: 'mid-range',
  name: 'Mako3',
  manufacturer: 'Innova',
  color: 'White',
  material: 'Star',
  speed: 5,
  glide: 5,
  stability: 0,
  fade: 0,
  additional: 'Not much to say',
  weight: 180,
  image: null,
  is_missing: false,
  missing_description: null,
  is_sold: false,
  sold_at: null,
  sold_for: null,
  is_broken: false,
  is_hole_in_one: false,
  hole_in_one_date: null,
  hole_in_one_description: null,
  is_collection_item: false,
  is_own_stamp: false,
  is_donated: false,
  donation_description: null,
  jobType: [''],
})

const DiscForm = ({ onSave }) => (
  <div>
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
            <Field name="price" label="Price" component={TextField} />

            <Label htmlFor="price_status">
              <LabelSpan>Price status</LabelSpan>
              <Field component="select" id="type" name="price_status" multiple={false}>
                <option value="">Has price</option>
                <option value="gift">Gift</option>
                <option value="price_unknown">Price unknown</option>
              </Field>
            </Label>

            <Field name="name" label="Name" component={TextInput} variant="outlined" />

            <Label htmlFor="type">
              <LabelSpan>Type</LabelSpan>
              <Field component="select" id="type" name="type" multiple={false}>
                <option value="">Select type...</option>
                <option value="putter">Putter</option>
                <option value="approach">Approach</option>
                <option value="mid-range">Mid-range</option>
                <option value="fairway-driver">Fairway driver</option>
                <option value="distance-driver">Distance driver</option>
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

            <label htmlFor="hole_in_one_description">
              <LabelSpan>Hole in one description</LabelSpan>
              <Field id="hole_in_one_description" name="hole_in_one_description" type="textarea" />
            </label>

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

            {/*
            Multiple checkboxes with the same name attribute, but different
            value attributes will be considered a "checkbox group". Formik will automagically
            bind the checked values to a single array for your benefit. All the add and remove
            logic will be taken care of for you.
          */}
            <div className="label">What best describes you? (check all that apply)</div>
            <label>
              <Field type="checkbox" name="jobType" value="designer" />
              Designer
            </label>
            <label>
              <Field type="checkbox" name="jobType" value="developer" />
              Developer
            </label>
            <label>
              <Field type="checkbox" name="jobType" value="product" />
              Product Manager
            </label>
            {/*
           You do not _need_ to use <Field>/useField to get this behaviorr,
           using handleChange, handleBlur, and values works as well.
          */}
            <label>
              <input
                type="checkbox"
                name="jobType"
                value="founder"
                checked={values.jobType.includes('founder')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              CEO / Founder
            </label>

            {/*
           The <select> element will also behave the same way if
           you pass `multiple` prop to it.
          */}
            <label htmlFor="location">Where do you work?</label>
            <Field component="select" id="location" name="location" multiple={true}>
              <option value="NY">New York</option>
              <option value="SF">San Francisco</option>
              <option value="CH">Chicago</option>
              <option value="OTHER">Other</option>
            </Field>
            <label>
              <Field type="checkbox" name="terms" />I accept the terms and conditions.
            </label>
            {/* Here's how you can use a checkbox to show / hide another field */}
            {!!values.terms ? (
              <div>
                <label>
                  <Field type="checkbox" name="newsletter" />
                  Send me the newsletter{' '}
                  <em style={{ color: 'rebeccapurple' }}>(This is only shown if terms = true)</em>
                </label>
              </div>
            ) : null}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
)

export default DiscForm
