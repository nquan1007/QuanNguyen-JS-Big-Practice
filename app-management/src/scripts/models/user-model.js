import axios from "axios";

export default class UserModel {
  constructor() {
    axios.defaults.baseURL = "https://sneakers-shop-db.herokuapp.com";
  }

  /**
   * Get the list of users from the database
   * @returns {Array} the users data
   */
  async getUser() {
    try {
      const users = await axios.get("/users");
      return users.data;
    } catch (error) {
      Toast.error(error);
    }
  }

  /**
   * Add a new user and save to the database
   * @param {object} userInfo 
   * @returns 
   */
  async addNewUser(userInfo) {
    try {
      const userData = await axios({
        method: "post",
        url: "/user",
        data: userInfo
      });
      return userData;
    } catch (error) {
      Toast.error(error);
    }
  }

  /**
   * Used to verify that the email has already existed or not
   * @param {string} email
   * @returns {boolean}
   */
  async findUserByEmail(email) {
    try {
      const users = this.getUser();
      const hasEmail = users.find((key) => key.email === email);
      return hasEmail;
    } catch (error) {
      Toast.error(error);
    }
  }
}
