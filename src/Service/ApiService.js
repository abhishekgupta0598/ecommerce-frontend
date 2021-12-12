import AuthService from "./AuthService";
import axios from "axios";

export default class ApiService {

  static _ADDRESS = 'https://dishyhut.appspot.com';

  static post(path, body, headers) {
    const authService = AuthService.get();
    if (!headers) headers = {};
    if (authService.isAuthenticated()) {
      headers = {
        ...headers,
        Authorization: `Bearer ${authService.getAuthToken()}`
      }
    }
    return axios.post(`${ApiService._ADDRESS}${path}`, body, { headers });
  }

  static get(path, headers) {
    const authService = AuthService.get();
    if (!headers) headers = {};
    if (authService.isAuthenticated()) {
      headers = {
        ...headers,
        Authorization: `Bearer ${authService.getAuthToken()}`
      }
    }
    return axios.get(`${ApiService._ADDRESS}${path}`, { headers });
  }
}