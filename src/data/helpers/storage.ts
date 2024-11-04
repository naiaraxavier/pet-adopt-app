import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const STORAGE_KEY = "session-token";

/**
 * Saves the session token to the appropriate storage.
 * @param token - The session token to save.
 */
export const saveSessionToken = async (token: string) => {
  try {
    if (Platform.OS === "web") {
      localStorage.setItem(STORAGE_KEY, token);
    } else {
      await AsyncStorage.setItem(STORAGE_KEY, token);
    }
  } catch (error) {
    console.error("Erro ao salvar o token:", error);
  }
};

/**
 * Retrieves the session token from the appropriate store.
 * @returns The session token, or null in case of error.
 */
export const getSessionToken = async (): Promise<string | null> => {
  try {
    if (Platform.OS === "web") {
      return localStorage.getItem(STORAGE_KEY);
    } else {
      return await AsyncStorage.getItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error("Erro ao buscar o token:", error);
    return null;
  }
};

/**
 * Removes the session token from the appropriate store.
 */
export const removeSessionToken = async () => {
  try {
    if (Platform.OS === "web") {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      await AsyncStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error("Erro ao remover o token:", error);
  }
};
