# 04 Custom Async Validator

In this example we are going to create an async custom validator with Fonk.

## Play with demo:

[![React Final Form and Fonk 04-custom-async-validator example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/lemoncode/final-form-fonk-by-example/tree/master/04-custom-async-validator)

## Steps to build it

- Install project dependencies

```bash
npm install
```

_Implementing custom synchronous validations is great, but what about asynchronous ones?_ Let's chek how to do this by coding an example:

- In this case once the user has entered a valid IBAN, we want to check against the server if that IBAN number belongs to a blacklist, we have the following fake simulation of a rest api call already implemented:

_./src/api.js_

```javascript
const mockIBANBlackList = ['BE71 0961 2345 6769'];

export const isIBANInBlackList = iban =>
  Promise.resolve(mockIBANBlackList.includes(iban));

```

- We can write our own custom validator:

_./src/custom-validators/iban-black-list.validator.js_

```javascript
import { isIBANInBlackList } from '../api';

export const ibanBlackList = ({ value }) =>
  isIBANInBlackList(value).then(isInBlackList => ({
    type: 'IBAN_BLACK_LIST',
    succeeded: !isInBlackList,
    message: isInBlackList ? 'This IBAN is not allowed' : '',
  }));

```

- Update barrel file:

_./src/custom-validators/index.js_

```diff
export * from './country-black-list.validator';
+ export * from './iban-black-list.validator';

```

- And add it to our schema:

_./src/form-validation.js_

```diff
import { Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { iban } from '@lemoncode/fonk-iban-validator';
import { rangeNumber } from '@lemoncode/fonk-range-number-validator';
+ import { ibanBlackList } from './custom-validators';

export const validationSchema = {
  field: {
    account: [
      Validators.required.validator,
      iban.validator,
+     ibanBlackList,
    ],
    ...
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
