export const capitalizeFirstLetter = (str: string) => {
  return str && str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export function getTestID(testID: string) {
  const appPrefix = "boiler";
  if (!testID) {
    return "undefined";
  }
  const prefix = `${appPrefix}:id/`;
  const hasPrefix = testID.startsWith(prefix);
  return !hasPrefix ? `${prefix}${testID}` : testID;
}
