import axios from 'axios';

export default class UserModel {
  constructor() {
    axios.defaults.baseURL = 'https://sneakers-shop-db.herokuapp.com';
  }

  getUser() {
    const users = axios.get('/users');
    console.log(users);
    return users;
  }

  authenticate = () => {
    this.getUser();
  }
}