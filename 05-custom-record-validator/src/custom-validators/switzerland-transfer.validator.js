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
