import axios from 'axios';
import md5 from 'md5';

const BASE_URL = 'https://gateway.marvel.com/v1/public';
const PUBLIC_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = process.env.REACT_APP_MARVEL_PRIVATE_KEY;

// Função para gerar o hash
const generateHash = (timestamp) => {
  return md5(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`);
};

// Função para criar instância do axios
const api = axios.create({
  baseURL: BASE_URL,
});

// Função para fazer chamadas à API
export const fetchMarvelData = async (endpoint, params = {}) => {
  const timestamp = Date.now();
  const hash = generateHash(timestamp);

  const defaultParams = {
    ts: timestamp,
    apikey: PUBLIC_KEY,
    hash: hash,
  };

  try {
    const response = await api.get(endpoint, {
      params: { ...defaultParams, ...params },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados da Marvel API:', error);
    throw error;
  }
};