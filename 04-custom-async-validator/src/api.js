const mockCountries = ['FR', 'ES'];

export const getDisabledCountryIBANCollection = () =>
  Promise.resolve(mockCountries);

const mockIBANBlackList = ['BE71 0961 2345 6769', 'CH56 0483 5012 3456 7800 9'];

export const isIBANInBlackList = iban =>
  Promise.resolve(mockIBANBlackList.includes(iban));
