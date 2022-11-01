import axios from 'axios';
import { USERS_URL } from '../constants/api';

export default class UserModel {
  constructor() {}

  /**
   * Get an array of all users from the database
   * @returns {Array}
   */
  getUsers = async () => {
    const response = await axios.get(USERS_URL);
    return response.data;
  };

  /**
   * Check if the email is existed in the database or not
   * @param {String} email
   * @returns {Boolean}
   */
  hasUser = async (email) => {
    const users = await this.getUsers();
    const result = users.filter((user) => user.email === email);
    return result.length !== 0;
  };

  /**
   * Create new user with data from view and add it to the database
   * @param {Object} data
   */
  createNewUser = async (data) => {
    await axios.post(USERS_URL, data);
  };

  /**
   * Pass the email to get the corresponding password in the database
   * @param {String} email
   * @returns {String}
   */
  getPasswordByEmail = async (email) => {
    const users = await this.getUsers();
    const user = users.filter((user) => user.email === email);
    return user.map((user) => user.password).toString();
  };

  /**
   * Pass the id of the user to delete it in the database
   * @param {Number} id
   */
  deleteUserById = async (id) => {
    await axios.delete(`${USERS_URL}/${id}`);
  };

  /**
   * Pass the email to get the corresponding user's name
   * @param {String} email
   * @returns {String}
   */
  getNameByEmail = async (email) => {
    const users = await this.getUsers();
    const result = users.find((user) => user.email === email);
    return result.name;
  };

  /**
   * Pass the email to get the corresponding user's id
   * @param {String} email
   * @returns {Number}
   */
  getIdByEmail = async (email) => {
    const users = await this.getUsers();
    const result = users.find((user) => user.email === email);
    return result.id;
  };
}
