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
