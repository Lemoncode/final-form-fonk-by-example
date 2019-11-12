const mockCountries = ['FR', 'ES'];

export const getDisabledCountryIBANCollection = () =>
  Promise.resolve(mockCountries);

const mockIBANBlackList = ['BE71 0961 2345 6769'];

export const isIBANInBlackList = iban =>
  Promise.resolve(mockIBANBlackList.includes(iban));
