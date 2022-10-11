import { getElementById, querySelector } from "../helpers/getElement";
import { createElement } from "../helpers/createElement";

const btnLogin = getElementById('btn-login');
const btnSignup = getElementById('btn-signup');
const btnLoginCloseIcon = getElementById('login-form-close');
const btnSignupCloseIcon = getElementById('signup-form-close');
const loginPopup = querySelector('.login-popup');
const signupPopup = querySelector('.signup-popup');
const btnViewProducts = querySelector('.home-main button');
const btnRegister = loginPopup.querySelector('form h3 a');

btnLogin.addEventListener('click', () => {
  loginPopup.style.display = 'flex';
})

btnLoginCloseIcon.addEventListener('click', () => {
  loginPopup.style.display = 'none';
})

btnSignup.addEventListener('click', () => {
  signupPopup.style.display = 'flex';
})

btnSignupCloseIcon.addEventListener('click', () => {
  signupPopup.style.display = 'none';
})

btnViewProducts.addEventListener('click', () => {
  loginPopup.style.display = 'flex';
})

btnRegister.addEventListener('click', () => {
  signupPopup.style.display = 'flex';
})

import UserController from "../controllers/user-controller";
import UserModel from "../models/user-model";
import UserView from "../views/user-view";

const app = new UserController(new UserModel(), new UserView())
