import React from 'react';
import { Form, Field } from 'react-final-form';
import { formValidation } from './form-validation';

export const Playground = () => {
  return (
    <div>
      <h1>React Final Form and Fonk</h1>
      <h2>Wire transfer form</h2>
      <Form
        onSubmit={values => {
          console.log({ values });
        }}
        initialValues={{
          account: '',
          name: '',
          integerAmount: 0,
          decimalAmount: 0,
          reference: '',
          email: '',
        }}
        validate={values => formValidation.validateForm(values)}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="account">
              {({ input, meta }) => (
                <div>
                  <label>Beneficiary IBAN:</label>
                  <input {...input} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="name">
              {({ input, meta }) => (
                <div>
                  <label>Beneficiary fullname:</label>
                  <input {...input} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div>
              <label>Amount of wire:</label>
              <Field name="integerAmount" type="number">
                {({ input, meta }) => (
                  <div className="amount-field">
                    <input {...input} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <strong>.</strong>
              <Field name="decimalAmount" type="number">
                {({ input, meta }) => (
                  <>
                    <div className="amount-field">
                      <input {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                    <label>EUR</label>
                  </>
                )}
              </Field>
            </div>
            <Field name="reference">
              {({ input, meta }) => (
                <div>
                  <label>Reference:</label>
                  <input {...input} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <p>
              If you want to send a notice to the beneficiary, inform the e-mail
            </p>
            <Field name="email">
              {({ input, meta }) => (
                <div>
                  <label>Beneficiary Email:</label>
                  <input {...input} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className="buttons">
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      />
    </div>
  );
};
