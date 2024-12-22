import { authInstance } from "../index.config";

const entity = {
  //Methods for user
  register: async (payload) => {
    // Tip: payload example = { email: "alex@myemail.com", password: "myPassword" }
    try {
      const response = await authInstance.post("/accounts:signUp", {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      });
      return response.data; // { idToken: "...", refreshToken: "..." ,...}
    } catch (error) {
      console.log(
        "[API-ERROR]: Method: register | Message - ",
        error.toString()
      );
    }
  },
  login: async (payload) => {
    try {
      const response = await authInstance.post("/accounts:signInWithPassword", {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      });
      console.log(response.data);
      return response.data; // {idToken: "...", refreshToken: "..."}
    } catch (error) {
      console.log("[API-ERROR]: Method: login | Message - ", error.toString());
    }
  },
  logout: () => {
    try {
      sessionStorage.removeItem("id_token");
      sessionStorage.removeItem("userID");
    } catch (error) {
      console.log("[API-ERROR]: Method: logout | Message - ", error.toString());
    }
  },
};

export default entity;
