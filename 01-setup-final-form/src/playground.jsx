import React from 'react';
import { Form, Field } from 'react-final-form';

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
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="account">
              {({ input }) => (
                <div>
                  <label>Beneficiary IBAN:</label>
                  <input {...input} />
                </div>
              )}
            </Field>
            <Field name="name">
              {({ input }) => (
                <div>
                  <label>Beneficiary fullname:</label>
                  <input {...input} />
                </div>
              )}
            </Field>
            <div>
              <label>Amount of wire:</label>
              <Field name="integerAmount" type="number">
                {({ input }) => <input {...input} />}
              </Field>
              <strong>.</strong>
              <Field name="decimalAmount" type="number">
                {({ input }) => (
                  <>
                    <input {...input} />
                    <label>EUR</label>
                  </>
                )}
              </Field>
            </div>
            <Field name="reference">
              {({ input }) => (
                <div>
                  <label>Reference:</label>
                  <input {...input} />
                </div>
              )}
            </Field>
            <p>
              If you want to send a notice to the beneficiary, inform the e-mail
            </p>
            <Field name="email">
              {({ input }) => (
                <div>
                  <label>Beneficiary Email:</label>
                  <input {...input} />
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
