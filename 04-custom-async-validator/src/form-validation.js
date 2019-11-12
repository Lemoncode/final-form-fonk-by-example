import { Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { iban } from '@lemoncode/fonk-iban-validator';
import { rangeNumber } from '@lemoncode/fonk-range-number-validator';
import { ibanBlackList } from './custom-validators';

export const validationSchema = {
  field: {
    account: [Validators.required.validator, iban.validator, ibanBlackList],
    name: [Validators.required.validator],
    integerAmount: [
      Validators.required.validator,
      {
        validator: rangeNumber.validator,
        customArgs: {
          min: {
            value: 0,
            inclusive: true,
          },
          max: {
            value: 10000,
            inclusive: true,
          },
        },
      },
    ],
    decimalAmount: [
      Validators.required.validator,
      {
        validator: rangeNumber.validator,
        customArgs: {
          min: {
            value: 0,
            inclusive: true,
          },
          max: {
            value: 99,
            inclusive: true,
          },
        },
      },
    ],
    reference: [Validators.required.validator],
    email: [Validators.required.validator, Validators.email.validator],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
