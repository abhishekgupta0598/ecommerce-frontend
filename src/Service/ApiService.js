import AuthService from "./AuthService";
import axios from "axios";
import settings from "../settings"

export default class ApiService {

  static _ADDRESS = settings.backend;

  static post(path, body, headers) {
    const authService = AuthService.get();
    if (!headers) headers = {};
    if (authService.isAuthenticated()) {
      headers = {
        ...headers,
        Authorization: `Bearer ${authService.getAuthToken()}`
      }
    }
    return axios.post(`${settings.backend}${path}`, body, { headers });
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
    return axios.get(`${settings.backend}${path}`, { headers });
  }
}