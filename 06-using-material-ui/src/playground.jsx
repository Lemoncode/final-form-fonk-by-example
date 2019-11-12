import React from 'react';
import { Form, Field } from 'react-final-form';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { formValidation, validationSchema } from './form-validation';
import { getDisabledCountryIBANCollection } from './api';
import { countryBlackList } from './custom-validators';
import { TextField, RecordError } from './components';

export const Playground = () => {
  React.useEffect(() => {
    getDisabledCountryIBANCollection().then(countries => {
      const newValidationSchema = {
        ...validationSchema,
        field: {
          ...validationSchema.field,
          account: [
            ...validationSchema.field.account,
            {
              validator: countryBlackList,
              customArgs: {
                countries,
              },
            },
          ],
        },
      };

      formValidation.updateValidationSchema(newValidationSchema);
    });
  }, []);

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
        render={({ handleSubmit, errors }) => (
          <form onSubmit={handleSubmit}>
            <Field name="account">
              {({ input, meta }) => (
                <TextField {...input} label="Beneficiary IBAN" meta={meta} />
              )}
            </Field>
            <Field name="name">
              {({ input, meta }) => (
                <TextField
                  {...input}
                  label="Beneficiary fullname"
                  meta={meta}
                />
              )}
            </Field>
            <div>
              <Field name="integerAmount" type="number">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Amount of wire"
                    meta={meta}
                    fullWidth={false}
                  />
                )}
              </Field>
              <strong>.</strong>
              <Field name="decimalAmount" type="number">
                {({ input, meta }) => (
                  <>
                    <TextField {...input} meta={meta} fullWidth={false} />
                    <Typography>EUR</Typography>
                  </>
                )}
              </Field>
            </div>
            <Field name="reference">
              {({ input, meta }) => (
                <TextField {...input} label="Reference" meta={meta} />
              )}
            </Field>
            <Typography>
              If you want to send a notice to the beneficiary, inform the e-mail
            </Typography>
            <Field name="email">
              {({ input, meta }) => (
                <TextField {...input} label="Beneficiary Email" meta={meta} />
              )}
            </Field>
            <RecordError name="switzerlandTransfer" errors={errors} />
            <div className="buttons">
              <Button color="primary" variant="contained" type="submit">
                Submit
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};
