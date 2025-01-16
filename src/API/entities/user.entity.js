import { authInstance } from "../index.config";
import { toast } from "react-toastify";

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

  deleteUser: async (payload) => {
    try {
      const idToken = payload.idToken;
      if (!idToken) {
        throw new Error("User not authenticated. Missing id_token.");
      }

      const response = await authInstance.post("/accounts:delete", {
        idToken,
      });

      // Optionally, clear user session data after successful deletion
      sessionStorage.removeItem("id_token");
      sessionStorage.removeItem("userID");

      return response.data; // e.g., { kind: "identitytoolkit#DeleteAccountResponse" }
    } catch (error) {
      console.log(
        "[API-ERROR]: Method: deleteUser | Message - ",
        error.toString()
      );
      throw error; // Re-throw error for higher-level handling, if needed
    }
  },

  sendEmailVerification: async (payload) => {
    try {
      const idToken = payload.idToken;
      if (!idToken) {
        throw new Error("User not authenticated. Missing id_token.");
      }

      const response = await authInstance.post("/accounts:sendOobCode", {
        idToken,
        requestType: "VERIFY_EMAIL",
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
      }
      console.error("[API-ERROR]:", error.toString());
      throw error;
    }
  },

  updateUserEmail: async (payload) => {
    try {
      const idToken = payload.idToken;
      if (!idToken) {
        throw new Error("User not authenticated. Missing id_token.");
      }

      if (!payload.email) {
        throw new Error("Missing email in payload.");
      }

      const response = await authInstance.post("/accounts:update", {
        idToken,
        email: payload.email,
        returnSecureToken: true,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
      }
      console.error("[API-ERROR]:", error.toString());
      throw error;
    }
  },

  verifyPassword: async (payload) => {
    try {
      const response = await authInstance.post("/accounts:signInWithPassword", {
        email: payload.email,
        password: payload.password,
      });
      console.log(response.data);
      return response.data; // {idToken: "...", refreshToken: "..."}
    } catch (error) {
      toast("Your password is invalid.", { type: "error" });
      console.log(
        "[API-ERROR]: Method: verifyPassword | Message - ",
        error.toString()
      );
    }
  },
};

export default entity;
