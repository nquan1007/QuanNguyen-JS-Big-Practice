import axios from "axios";

export default class UserModel {
  constructor() {
    axios.defaults.baseURL = "https://sneakers-shop-db.herokuapp.com";
  }
}