const API_MSG = {
    GET: 'Get data from API failed',
    POST: 'Post data to API failed',
    DELETE: 'Delete data failed',
    PATCH: 'Update data failed',
  };
  
  const ERROR_MSG = {
    // Email message
    EMAIL_INCORRECT: 'Unable to log in with provided credentials.',
    EMAIL_INVALID: 'Invalid email',
    EMAIL_EMPTY: 'Email cannot be empty',
  
    // Password message
    PASSWORD_INCORRECT: 'Unable to log in with provided credentials.',
    PASSWORD_INVALID: 'Invalid password',
    PASSWORD_EMPTY: 'Password cannot be empty',
    PASSWORD_LEAST: 'Password must be at least 8 characters',
  };
  
  export { API_MSG, ERROR_MSG };