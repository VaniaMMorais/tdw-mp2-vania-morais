import axios from "axios";

const SUPERHERO_API_URL = `https://www.superheroapi.com/api.php/${process.env.REACT_APP_SuperHero_API_Access_Token}`;

export const searchSuperheroByName = async (name) => {
  try {
    const response = await axios.get(`${SUPERHERO_API_URL}/search/${name}`);
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar detalhes na SuperHero API:", error);
    return null;
  }
};

export const getSuperheroById = async (id) => {
  try {
    const response = await axios.get(`${SUPERHERO_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar personagem na SuperHero API:", error);
    return null;
  }
};
