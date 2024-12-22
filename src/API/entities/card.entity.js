import { axiosInstance } from "../index.config";

const generateRandomNumber = () =>
  Array(4)
    .fill(0)
    .map(() => Math.floor(1000 + Math.random() * 9000))
    .join(" ");

const generateRandomExpiry = () => {
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const year = String(Math.floor(24 + Math.random() * 10));
  return `${month}/${year}`;
};

const generateCCV = () => {
  return Math.floor(Math.random() * 900 + 100); // Generates a number between 100 and 999
};

const entity = {
  create: async (payload) => {
    try {
      let cardNumber;
      let isUnique = false;

      // Loop to ensure uniqueness of cardNumber
      while (!isUnique) {
        cardNumber = generateRandomNumber(); // Generate a random card number
        const allCardsObj = await entity.readAllCards();
        const allCards = allCardsObj ? Object.values(allCardsObj) : [];

        // Check if the generated cardNumber already exists
        if (!allCards.some((card) => card.cardNumber === cardNumber)) {
          isUnique = true; // Card number is unique
        }
      }

      console.log(`Generated unique cardNumber: ${cardNumber}`); // Log the generated card number

      const response = await axiosInstance.post("/cards.json", {
        cardNumber, // Use the unique cardNumber
        cardCCV: generateCCV(),
        cardExpDate: generateRandomExpiry(),
        userID: payload.userID,
        locale: "ro-RO",
        currency: "RON",
      });

      return response.data; // Return the response from the API
    } catch (error) {
      console.log("[API-ERROR]:Entity: Card | Method: create", error);
      return null; // Return null on error
    }
  },

  readAllCards: async () => {
    try {
      const response = await axiosInstance.get(`/cards.json`);
      return response.data; // Return the list of all cards
    } catch (error) {
      console.log("[API-ERROR]:Entity: Card | Method: read", error);
      return {}; // Return an empty array on error
    }
  },

  readCardById: async (payload) => {
    try {
      const response = await axiosInstance.get("/cards.json");
      const cards = response.data;

      // Filter card by userID
      const userCard = Object.values(cards).find(
        (card) => card.userID === payload.userID
      );

      return userCard;
    } catch (error) {
      console.error("[API-ERROR]: Entity: Card | Method: readCardById", error);
    }
  },

  initializeMovements: async (payload) => {
    try {
      // Fetch the user's card using readCardById
      const userCard = await entity.readCardById({ userID: payload.userID });

      if (!userCard) {
        console.error("Card not found for the given userID.");
        return null;
      }

      // If movements don't exist, initialize it with an object containing value and date
      if (!userCard.movements || !Array.isArray(userCard.movements)) {
        console.log("Initializing movements with 1000 and current date.");
        const updatedMovements = [{ value: 1000, date: new Date() }]; // Initialize with 1000 and current date
        const allCards = await entity.readAllCards();

        // Find the correct cardId using the user's cardNumber
        const cardId = Object.keys(allCards).find(
          (key) => allCards[key].cardNumber === userCard.cardNumber
        );

        if (!cardId) {
          console.error("Card not found with the given cardNumber.");
          return null;
        }

        // Update the card in the database
        await axiosInstance.patch(`/cards/${cardId}.json`, {
          movements: updatedMovements,
        });

        console.log("Movements initialized successfully.");
        return { cardId, updatedMovements }; // Return updated data
      } else {
        console.log("Movements already exist. No need to initialize.");
        return userCard; // Return the existing card data
      }
    } catch (error) {
      console.error(
        "[API-ERROR]: Entity: Card | Method: initializeMovements",
        error
      );
      return null; // Return null on error
    }
  },

  updateMovements: async (payload) => {
    try {
      // Fetch the user's card using readCardById
      const userCard = await entity.readCardById({ userID: payload.userID });

      if (!userCard) {
        console.error("Card not found for the given userID.");
        return null;
      }

      const updatedMovements = [
        ...userCard.movements,
        { value: payload.movement, date: new Date() },
      ];

      // Fetch all cards to get the cardId
      const allCards = await entity.readAllCards();

      // Find the correct cardId using the user's cardNumber
      const cardId = Object.keys(allCards).find(
        (key) => allCards[key].cardNumber === userCard.cardNumber
      );

      if (!cardId) {
        console.error("Card not found with the given cardNumber.");
        return null;
      }

      // Update the card in the database
      await axiosInstance.patch(`/cards/${cardId}.json`, {
        movements: updatedMovements,
      });

      console.log("Movements updated successfully.");
      return { cardId, updatedMovements }; // Return updated data
    } catch (error) {
      console.error(
        "[API-ERROR]: Entity: Card | Method: updateMovements",
        error
      );
      return null; // Return null on error
    }
  },

  updateLocaleAndCurrency: async (payload) => {
    try {
      // Fetch the user's card using readCardById
      const userCard = await entity.readCardById({ userID: payload.userID });

      if (!userCard) {
        console.error("Card not found for the given userID.");
        return null;
      }

      // Fetch all cards to get the cardId
      const allCards = await entity.readAllCards();

      // Find the correct cardId using the user's cardNumber
      const cardId = Object.keys(allCards).find(
        (key) => allCards[key].cardNumber === userCard.cardNumber
      );

      if (!cardId) {
        console.error("Card not found with the given cardNumber.");
        return null;
      }

      // Update the card in the database
      await axiosInstance.patch(`/cards/${cardId}.json`, {
        locale: payload.locale,
        currency: payload.currency,
      });

      console.log("Movements updated successfully.");
      return null; // Return updated data
    } catch (error) {
      console.error(
        "[API-ERROR]: Entity: Card | Method: updateMovements",
        error
      );
      return null; // Return null on error
    }
  },
};

export default entity;
