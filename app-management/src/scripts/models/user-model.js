import axios from 'axios';

export default class UserModel {
  constructor() {

  }

  authenticate = () => {
    axios.defaults.baseURL = 'https://sneakers-shop-db.herokuapp.com/'
  }
}