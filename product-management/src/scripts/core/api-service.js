import { axiosClient } from './http-client';

const ApiService = {
  /**
   * Get list data
   * @param url
   * @param params
   */
  async getList(url) {
    return axiosClient.get(url);
  },

  /**
   * Get item data
   * @param url
   */
  async getItemById(url) {
    return axiosClient.get(url);
  },

  /**
   * Create data
   * @param url
   * @param data
   */
  async create(url, data) {
    return axiosClient.post(url, data);
  },

  /**
   * Update data
   * @param url
   * @param data
   */
  async update(url, data) {
    return axiosClient.patch(url, data);
  },

  /**
   * Delete data
   * @param url
   */
  async delete(url) {
    return axiosClient.delete(url);
  },
};

export { ApiService };
