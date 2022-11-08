const VALIDATION_REGEX = {
  EMAIL: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
  PASSWORD: /^[0-9a-zA-Z]{8,}$/,
  INPUT_CHARACTER: /^[a-zA-Z_ ]*$/,
  PRODUCT_NAME: /^[a-z0-9A-Z_ ]*$/,
  FILE_FORMAT: /^.*\.(jpg|JPG|jpeg|JPEG|png|PNG)$/,
};

export { VALIDATION_REGEX };
