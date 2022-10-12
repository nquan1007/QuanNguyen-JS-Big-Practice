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
      return users;
    } catch (error) {
      Toast.error(error);
    }
  }

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
