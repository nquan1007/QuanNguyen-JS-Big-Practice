import { ApiService } from '../core/api-service';
import { API_URLS } from '../core/app-config';

export default class UserModel {
  constructor() {}

  /**
   * Get an array of all users from the database
   * @returns {Array}
   */
  getUsers = async () => {
    return await ApiService.getList(API_URLS.USER);
  };

  /**
   * Check if the email is existed in the database or not
   * @param {String}
   * @returns {Boolean}
   */
  hasUser = async (email) => {
    const users = await this.getUsers();
    const result = users.filter((user) => user.email === email);
    return result.length !== 0;
  };

  /**
   * Create new user
   * @param {Object}
   */
  createNewUser = async (user) => {
    await ApiService.create(API_URLS.USER, user);
  };

  /**
   * Pass the email to get the corresponding password in the database
   * @param {String}
   * @returns {String}
   */
  getPasswordByEmail = async (email) => {
    const users = await this.getUsers();
    const user = users.filter((user) => user.email === email);
    return user.map((user) => user.password).toString();
  };

  /**
   * Pass the email to get the corresponding user's name
   * @param {String}
   * @returns {String}
   */
  getNameByEmail = async (email) => {
    const users = await this.getUsers();
    const result = users.find((user) => user.email === email);
    return result.name;
  };

  /**
   * Pass the email to get the corresponding user's id
   * @param {String}
   * @returns {Number}
   */
  getIdByEmail = async (email) => {
    const users = await this.getUsers();
    const result = users.find((user) => user.email === email);
    return result.id;
  };
}
