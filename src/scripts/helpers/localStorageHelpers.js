export default class LocalStorage {
    constructor(name) {
      this.localStorage = window.localStorage;
      this.name = name;
    }
  
    /**
     * Get data from LocalStorage
     * @returns {{object} || {number}}
     */
    getItemLocalStorage() {
      return JSON.parse(this.localStorage.getItem(this.name));
    }
  
    /**
     * Save data to LocalStorage
     * @param {*} item value of key localStorage
     */
    setItemLocalStorage(item) {
      this.localStorage.setItem(this.name, JSON.stringify(item));
    }
  
    /**
     * Save data to LocalStorage
     */
    removeItemLocalStorage() {
      this.localStorage.removeItem(this.name);
    }
  }