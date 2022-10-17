import axios from "axios";

export default class IndexModel {
  constructor() {
    axios.defaults.baseURL = "https://sneakers-shop-db.herokuapp.com";
  }
}