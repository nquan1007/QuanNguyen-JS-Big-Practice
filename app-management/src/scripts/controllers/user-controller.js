import { getElementById, querySelector, createElement } from "../helpers/dom";
import axios from 'axios';

export default class UserController {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.bindViewEventListener();
  }

  handleLogin = () => {
    this.model.authenticate();
  }

  bindViewEventListener = () => {
    this.view.handleBtnLoginClick = this.handleLogin;
  }
}