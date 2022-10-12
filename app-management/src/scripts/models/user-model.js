import axios from 'axios';

export default class UserModel {
  constructor() {
    axios.defaults.baseURL = 'https://sneakers-shop-db.herokuapp.com';
  }

  /**
   * Get the list of users from the database 
   * @returns {Array} the users data
   */
  async getUser() {
    try {
      const users = axios.get('/users');
      return users;
    } catch {
      Toast.error('Something went wrong when accessing the data');
    }
  };

  authenticate = () => {
    this.getUser();
  }
}