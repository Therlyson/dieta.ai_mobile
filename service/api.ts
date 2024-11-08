import axios from "axios";

export const api = axios.create({
  baseURL: "https://dieta-ai-backend-cuud.onrender.com",
});