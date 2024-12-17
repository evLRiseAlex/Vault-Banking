import createServerVariables from "../server/firebase";
import axios from "axios";

//Tip: Extract main private keys within the environment ( .env.local file )
const variables = createServerVariables();

//Tip: Instance used to do HTTP Requests (e.g. REST API Call(s))
const axiosInstance = axios.create({
  baseURL: variables.DATABASE_URL,
  timeout: 5000,
});

//Tip: Instance used to do the register and login.
const authInstance = axios.create({
  baseURL: variables.FIREBASE_API_URL,
  timeout: 5000,
  params: {
    key: variables.FIREBASE_API_KEY,
  },
});

//Tip: Interceptor for authorization
axiosInstance.interceptors.request.use(
  (config) => {
    const idToken = sessionStorage.getItem("id_token");
    if (idToken) {
      config.params = { ...config.params, auth: idToken }; //url?auth=<idToken>
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance, authInstance };
