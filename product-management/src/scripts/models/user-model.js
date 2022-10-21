import axios from 'axios';
import { USERS_URL } from '../constants/api';

export default class UserModel {
  constructor() {
  }
  
  /**
   * Get all the users from the database 
   * @returns 
   */
  getUsers = async () => {
    return await axios.get(USERS_URL);
  }
  
  /**
   * Create new user with data from view and add it to the database
   * @param {Object} data 
   */
  createNewUser = async (data) => {
    await axios.post(USERS_URL, data);
  }

  /**
   * Pass the id of the user to delete it in the database
   * @param {Number} id 
   */
  deleteUserById = async (id) => {
    await axios.delete(`${USERS_URL}/${id}`);
  }
}