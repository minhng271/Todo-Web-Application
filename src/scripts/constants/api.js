const URL_API = {
    URL: 'http://localhost:3000',
    USERS_URL: '/users',
    TODOS_URL: '/todos',
  };
  
  const TODOS_URL = `${URL_API.URL}${URL_API.TODOS_URL}`;
  const USERS_URL = `${URL_API.URL}${URL_API.USERS_URL}`;
  
  export { TODOS_URL, USERS_URL };