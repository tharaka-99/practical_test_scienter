// services/tempStorage.ts

// Temporary in-memory storage for user data
const tempStorage: Record<string, { username: string; password: string }> = {};

// Save user data to temporary storage
export const saveUser = (
  username: string,
  userData: { username: string; password: string }
) => {
  tempStorage[username] = userData;
  console.log(userData);
};

// Get user data from temporary storage
export const getUser = (username: string) => {
  return tempStorage[username] || null;
};
