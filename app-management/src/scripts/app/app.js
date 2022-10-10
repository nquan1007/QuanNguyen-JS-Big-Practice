import { getElementById, querySelector } from "../helpers/getElement";
import { createElement } from "../helpers/createElement";

const btnLogin = getElementById('btn-login');
const btnSignup = getElementById('btn-signup');
const btnCloseForm = querySelector('.form-close-icon');

btnLogin.addEventListener('click', () => {
  querySelector('.login-popup').style.display = 'flex';
})

btnCloseForm.addEventListener('click', () => {
  querySelector('.login-popup').style.display = 'none';
})


