# 05 Custom Record Validator

In this example we are going to create a custom record validator with Fonk.

## Play with demo:

[![React Final Form and Fonk 05-custom-record-validator example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/lemoncode/final-form-fonk-by-example/tree/master/05-custom-record-validator)

## Steps to build it

- Install project dependencies

```bash
npm install
```

Well we have had a great time adding field validations, but there are validations that are tied up to the whole record we are editing than to a given field, for instance let's face this scenario:

- You are not allowed to transfer more than 1000 € to Switzerland using this form (for instance: you have to go through another form where some additional documentation is required).

- The best place to fire this validation is at record level.

- Record validation functions accept as input parameter that whole form record info, and return the result of the validation (it accepts both flavours sync and promise based), let's check the code for this validator:

_./src/custom-validators/switzerland-transfer.validator.js_

```javascript
import { Validators } from '@lemoncode/fonk';

const isSwitzerlandAccount = value => {
  const pattern = /^CH/i;
  const { succeeded } = Validators.pattern.validator({
    value,
    customArgs: { pattern },
  });
  return succeeded;
};

export const switzerlandTransfer = ({ values }) => {
  const succeeded =
    !isSwitzerlandAccount(values.account) ||
    Number(values.integerAmount) < 1000 ||
    (Number(values.integerAmount) === 1000 &&
      Number(values.decimalAmount) <= 0);

  return {
    type: 'SWITZERLAND_TRANSFER',
    succeeded,
    message: succeeded
      ? ''
      : 'Not allowed to transfer more than 1000 € in Swiss account',
  };
};

```

- Update barrel file:

_./src/custom-validators/index.js_

```diff
export * from './country-black-list.validator';
export * from './iban-black-list.validator';
+ export * from './switzerland-transfer.validator';

```

- In order to set it up in our form validation schema there is a new setion called _record_ where we can add our validation:

_./src/form-validation.js_

```diff
import { Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { iban } from '@lemoncode/fonk-iban-validator';
import { rangeNumber } from '@lemoncode/fonk-range-number-validator';
- import { ibanBlackList } from './custom-validators';
+ import { ibanBlackList, switzerlandTransfer } from './custom-validators';

export const validationSchema = {
  field: {
    ...
  },
+ record: {
+   switzerlandTransfer: [switzerlandTransfer],
+ },
};

export const formValidation = createFinalFormValidation(validationSchema);

```

- Now let's add some plumbing in the UI code to display the record error message (it will only be displayed once IBAN and Amount fields has been touched):

_./src/playground.jsx_

```diff
...
      <Form
        ...
-       render={({ handleSubmit }) => (
+       render={({ handleSubmit, errors }) => (
          <form onSubmit={handleSubmit}>
            ...
            </Field>
+           {errors.recordErrors && errors.recordErrors.switzerlandTransfer && (
+             <span>{errors.recordErrors.switzerlandTransfer}</span>
+           )}
            <div className="buttons">
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
