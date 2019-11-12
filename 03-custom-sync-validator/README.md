# 03 Custom Validators

In this example we are going to create a sync custom validator with Fonk.

## Play with demo:

[![React Final Form and Fonk 03-custom-sync-validator example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/lemoncode/final-form-fonk-by-example/tree/master/03-custom-sync-validator)

## Steps to build it

- Install project dependencies

```bash
npm install
```

- What if we want to pass a list of country prefix? E.g. there are temporary issues for IBAN belonging to Germany and France, we want to pass an array of country prefixes. Is time to create our own validator:

_./src/custom-validators/country-black-list.validator.js_

```javascript
import { Validators } from '@lemoncode/fonk';

export const countryBlackList = ({ value, customArgs }) => {
  const { countries } = customArgs;

  const countriesRegExp = countries.reduce(
    (regex, country, i) => (i === 0 ? `(${country})` : `${regex}|(${country})`),
    ''
  );
  const pattern = new RegExp(`^(?!${countriesRegExp})`, 'i');

  const { succeeded } = Validators.pattern.validator({
    value,
    customArgs: { pattern },
  });

  return {
    type: 'COUNTRY_BLACK_LIST',
    succeeded,
    message: succeeded ? '' : 'This country is not available',
  };
};

```

- Add barrel file:

_./src/custom-validators/index.js_

```javascript
export * from './country-black-list.validator';

```

- Let's instantiate it in our schema (for instance let's disable France and Spain)

```diff
import { Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { iban } from '@lemoncode/fonk-iban-validator';
import { rangeNumber } from '@lemoncode/fonk-range-number-validator';
+ import { countryBlackList } from './custom-validators';

const validationSchema = {
  field: {
    account: [
      Validators.required.validator,
      iban.validator,
-     {
-       validator: Validators.pattern.validator,
-       customArgs: {
-         pattern: /^(?!FR)/ig,
-       },
-       message: 'Not available transfers to France',
-     },
+     { validator: countryBlackList, customArgs: { countries: ['FR', 'ES'] } },
    ],
    ...
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
