// if v is number
export const isNumber = (v) => typeof v === 'number';

// if v is string
export const isString = (v) => typeof v === 'string';

// if v is boolean
export const isBool = (v) => typeof v === 'boolean';

// if v is longer than n
export const isLongerThan = (n) => (v) => v.length > n;

// if v contains letters
export const containsLetter = (v) => isString(v) && /[a-zA-Z]/.test(v);

// if v contains uppercase letters
export const containsUppercaseLetter = (v) => isString(v) && /[A-Z]/.test(v);

// if v contains lowercase letters
export const containsLowercaseLetter = (v) => isString(v) && /[a-z]/.test(v);

// if v contains only letters
export const containsLetterOnly = (v) => isString(v) && /^[a-zA-Z]+$/.test(v);

// if v contains number
export const containsNumber = (v) => isString(v) && /[0-9]/.test(v);
