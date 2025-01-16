import { axiosInstance } from "../index.config";

const generateIBAN = async (entity) => {
  const generateRandomIBAN = () =>
    `RO${String(Math.floor(10 + Math.random() * 90))}VAULT${String(
      Math.floor(1000000000 + Math.random() * 9000000000)
    )}`;

  let iban;
  let isUnique = false;

  // Ensure IBAN is unique
  while (!isUnique) {
    iban = generateRandomIBAN();
    const allProfilesObj = await entity.readAllProfiles();
    const allProfiles = allProfilesObj ? Object.values(allProfilesObj) : [];

    // Check if the IBAN already exists
    if (!allProfiles.some((profile) => profile.IBAN === iban)) {
      isUnique = true;
    }
  }

  return iban;
};

const entity = {
  create: async (payload) => {
    try {
      const IBAN = await generateIBAN(entity);
      const response = await axiosInstance.post("/users.json", {
        email: payload.email,
        password: payload.password,
        userID: payload.userID,
        firstName: payload.firstName,
        lastName: payload.lastName,
        IBAN,
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
      console.error(
        "[API-ERROR]: Entity: Profile | Method: readProfileById",
        error
      );
    }
  },

  readProfileByIBAN: async (payload) => {
    try {
      const response = await axiosInstance.get("/users.json");
      const users = response.data;

      // Filter card by userID
      const userProfile = Object.values(users).find(
        (user) => user.IBAN === payload.IBAN
      );

      return userProfile;
    } catch (error) {
      console.error(
        "[API-ERROR]: Entity: Profile | Method: readProfileByIBAN",
        error
      );
    }
  },

  deleteUserProfile: async (payload) => {
    try {
      const allUsers = await entity.readAllProfiles();

      const userId = Object.keys(allUsers).find(
        (user) => allUsers[user].userID === payload.userID
      );

      if (!userId) {
        console.error("User cannot be found.");
        return null;
      }

      // Update the card in the database
      await axiosInstance.delete(`/users/${userId}.json`);
      console.log("User Deleted Successfully");
      return null; // Return updated data
    } catch (error) {
      console.error(
        "[API-ERROR]: Entity: Profile | Method: deleteUserId",
        error
      );
      return null; // Return null on error
    }
  },

  updateProfileFirstName: async (payload) => {
    try {
      // Fetch the user's card using readCardById
      const userProfile = await entity.readProfileById({
        userID: payload.userID,
      });

      if (!userProfile) {
        console.error("Profile not found for the given userID.");
        return null;
      }

      // Fetch all cards to get the cardId
      const allProfiles = await entity.readAllProfiles();

      // Find the correct cardId using the user's cardNumber
      const profileId = Object.keys(allProfiles).find(
        (key) => allProfiles[key].userID === userProfile.userID
      );

      if (!profileId) {
        console.error("Card not found with the given cardNumber.");
        return null;
      }

      // Update the card in the database
      await axiosInstance.patch(`/users/${profileId}.json`, {
        firstName: payload.firstName,
      });

      console.log("Profile updated successfully.");
      return { profileId }; // Return updated data
    } catch (error) {
      console.error(
        "[API-ERROR]: Entity: Profile | Method: updateProfileFirstName",
        error
      );
      return null; // Return null on error
    }
  },

  updateProfileLastName: async (payload) => {
    try {
      // Fetch the user's card using readCardById
      const userProfile = await entity.readProfileById({
        userID: payload.userID,
      });

      if (!userProfile) {
        console.error("Profile not found for the given userID.");
        return null;
      }

      // Fetch all cards to get the cardId
      const allProfiles = await entity.readAllProfiles();

      // Find the correct cardId using the user's cardNumber
      const profileId = Object.keys(allProfiles).find(
        (key) => allProfiles[key].userID === userProfile.userID
      );

      if (!profileId) {
        console.error("Card not found with the given cardNumber.");
        return null;
      }

      // Update the card in the database
      await axiosInstance.patch(`/users/${profileId}.json`, {
        lastName: payload.lastName,
      });

      console.log("Profile updated successfully.");
      return { profileId }; // Return updated data
    } catch (error) {
      console.error(
        "[API-ERROR]: Entity: Profile | Method: updateProfileLastName",
        error
      );
      return null; // Return null on error
    }
  },
};

export default entity;
