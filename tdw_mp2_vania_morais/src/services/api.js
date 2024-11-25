import axios from 'axios';
import md5 from 'md5';

const BASE_URL = 'https://gateway.marvel.com/v1/public';
const PUBLIC_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = process.env.REACT_APP_MARVEL_PRIVATE_KEY;

// Gerar o hash necessário para autenticação
const generateHash = () => {
    const timestamp = Date.now().toString();
    const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
    return { timestamp, hash };
  };
  
  // Função para buscar personagens
  export const fetchCharacters = async (params = {}) => {
    const { timestamp, hash } = generateHash();
    const defaultParams = {
      apikey: PUBLIC_KEY,
      ts: timestamp,
      hash,
      limit: 30,
    };
  
    const response = await axios.get(`${BASE_URL}/characters`, {
      params: { ...defaultParams, ...params },
    });
  
    return response.data.data.results; // Retorna apenas os personagens
  };