const REGEXP = {
    REGEXP_MAIL: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    REGEXP_PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/g,
  };
  
  const MINIMUM_PASSWORD_LENGTH = 8;
  
  export { REGEXP, MINIMUM_PASSWORD_LENGTH };