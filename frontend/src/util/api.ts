import axios, { AxiosResponse, Method } from 'axios';
import { BACKEND_PORT } from '../config';

const API_PATH = `http://localhost:${BACKEND_PORT}`;

interface ApiResponse {
  ok: boolean;
  error?: string; // ? means optional
  [key: string]: unknown; // [key: string] means any key can be used
}

/**
 * Makes an HTTP request to the backend API.
 * @param {string} method - The HTTP method to use for the request (e.g. "GET", "POST").
 * @param {string} path - The API endpoint to send the request to.
 * @param {Object} [data] - Optional request body as an object (for "POST" and "PUT" requests).
 * @param {string} [token] - Optional user authentication token to include in the request headers.
 * @returns {Promise<ApiResponse>} - A promise that resolves to the response data (as a JavaScript object).
 */
const apiRequest = async (
  method: Method,
  path: string,
  data: object | null = null,
  token: string | null = null
): Promise<ApiResponse> => {
  // Set up the axios instance with default options
  const instance = axios.create({
    baseURL: API_PATH,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add an interceptor to handle errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response) {
        error.response = {
          data: {
            ok: false,
            error:
              'Could not connect to server. Is your internet connection ok?',
          },
        };
      } else if (error.response.status >= 400) {
        error.response.data.ok = false;
      }
      return Promise.reject(error);
    }
  );

  // Append the request auth token
  if (token !== null) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  try {
    // Attempt to make the axios request async
    const response: AxiosResponse = await instance({
      method,
      url: path,
      data,
    });
    response.data.ok = true;
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    return {
      ok: false,
      error: 'An unexpected error occurred.',
    };
  }
};

export default apiRequest;
