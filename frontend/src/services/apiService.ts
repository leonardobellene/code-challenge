import axios from "axios";
import { Movie, Principal, Name } from "../types";

const BASE_URL = "http://127.0.0.1:8000/api";

// Cache data in localStorage with an expiration time
const cacheData = (key: string, data: any, ttl = 24 * 60 * 60 * 1000) => {
  const cachedData = { data, expiry: Date.now() + ttl };
  localStorage.setItem(key, JSON.stringify(cachedData));
};

// Get cached data if not expired
const getCachedData = (key: string) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { data, expiry } = JSON.parse(cached);
  if (Date.now() > expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
};

// Fetch movies with localStorage caching
export const fetchMovies = async (): Promise<Movie[]> => {
  const cachedMovies = getCachedData("movies");
  if (cachedMovies) return cachedMovies;

  try {
    const response = await axios.get(`${BASE_URL}/movies/`);
    cacheData("movies", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Fetch names with localStorage caching
export const fetchNames = async (): Promise<Name[]> => {
  const cachedNames = getCachedData("names");
  if (cachedNames) return cachedNames;

  try {
    const response = await axios.get(`${BASE_URL}/names/`);
    cacheData("names", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching names:", error);
    return [];
  }
};

// Fetch principals for a given movie (NO CACHING)
export const fetchPrincipals = async (tconst: string): Promise<Principal[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/principals/`);
    return response.data.filter((p: Principal) => p.tconst === tconst);
  } catch (error) {
    console.error("Error fetching principals:", error);
    return [];
  }
};
