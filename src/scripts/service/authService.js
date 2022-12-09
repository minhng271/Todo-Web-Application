import LocalStorage from '../helpers/localStorageHelpers';
import STORAGE_KEYS from '../constants/storageKeys';

export default class AuthService {
  constructor() {
    this.auth = new LocalStorage(STORAGE_KEYS.AUTHEN);
  }

  /**
   * Set userId key to localStorage
   * @returns {object} userId key in localStorage
   */
  setUser(item) {
    return this.auth.setItemLocalStorage(item);
  }

  /**
   * Get value of userId from localStorage
   * @returns {number} value of userId
   */
  getUser() {
    return this.auth.getItemLocalStorage();
  }

  /**
   * Get value of userId from localStorage
   * @returns {number} value of userId
   */
  removeUser() {
    return this.auth.removeItemLocalStorage();
  }

  /**
   * Check status of userId in localStorage
   * @returns {boolean} checkUser
   */
  isAuthenticatedUser() {
    const haveUser = !!this.getUser();
    return haveUser;
  }
}

export const authService = new AuthService();