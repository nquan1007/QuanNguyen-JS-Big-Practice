import { getElementById, querySelector } from "../helpers/getElement";
import { createElement } from "../helpers/createElement";
import axios from 'axios';

axios.defaults.baseURL = 'https://sneakers-shop-db.herokuapp.com';

async function getUsers() {
  try {
    const response = await axios.get('/users');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getUsers();
export default class UserController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  
}