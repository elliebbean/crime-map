const postcodeRegex = /[A-Z]{1,2}[0-9A-Z]{1,2}[0-9][A-Z]{2}/;

/**
 * Split a comma-separated string of postcodes,
 * normalise them to an all-upperase, no whitespace format,
 * and remove any invalid postcodes
 */
export const getValidPostcodes = (query: string) =>
  query
    .split(",")
    .map((postcode) => postcode.replaceAll(/\W/g, "").toUpperCase())
    .filter((postcode) => postcodeRegex.test(postcode));
