import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY_TOKEN = "session-token";
const STORAGE_KEY_EMAIL = "user-email";

// Generic function to access appropriate storage (localStorage or AsyncStorage)
const storage = Platform.OS === "web" ? localStorage : AsyncStorage;

// Function to save the token and email
export const saveSession = async (token: string, email: string) => {
  try {
    await storage.setItem(STORAGE_KEY_TOKEN, token);
    await storage.setItem(STORAGE_KEY_EMAIL, email);
  } catch (error) {
    console.error("Erro ao salvar o token e o e-mail:", error);
  }
};

// Function to obtain the token and email
export const getSession = async (): Promise<{
  token: string | null;
  email: string | null;
}> => {
  try {
    const token = await storage.getItem(STORAGE_KEY_TOKEN);
    const email = await storage.getItem(STORAGE_KEY_EMAIL);
    return { token, email };
  } catch (error) {
    console.error("Erro ao buscar o token e o e-mail:", error);
    return { token: null, email: null };
  }
};

// Function to remove the token and email
export const removeSession = async () => {
  try {
    await storage.removeItem(STORAGE_KEY_TOKEN);
    await storage.removeItem(STORAGE_KEY_EMAIL);
  } catch (error) {
    console.error("Erro ao remover o token e o e-mail:", error);
  }
};
