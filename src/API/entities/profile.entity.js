import { axiosInstance } from "../index.config";

const entity = {
  create: async (payload) => {
    try {
      const response = await axiosInstance.post("/users.json", {
        email: payload.email,
        password: payload.password,
        userID: payload.userID,
        firstName: payload.firstName,
        lastName: payload.lastName,
      });

      return response.data; // Return the response from the API
    } catch (error) {
      console.log("[API-ERROR]:Entity: Card | Method: create", error);
      return null; // Return null on error
    }
  },

  readAllProfiles: async () => {
    try {
      const response = await axiosInstance.get(`/users.json`);
      return response.data; // Return the list of all cards
    } catch (error) {
      console.log("[API-ERROR]:Entity: Profile | Method: read", error);
      return {}; // Return an empty array on error
    }
  },

  readProfileById: async (payload) => {
    try {
      const response = await axiosInstance.get("/users.json");
      const users = response.data;

      // Filter card by userID
      const userProfile = Object.values(users).find(
        (user) => user.userID === payload.userID
      );

      return userProfile;
    } catch (error) {
      console.error("[API-ERROR]: Entity: Card | Method: readCardById", error);
    }
  },
};

export default entity;
