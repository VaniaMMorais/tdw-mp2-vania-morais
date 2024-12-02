import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import md5 from 'md5';

const PUBLIC_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = process.env.REACT_APP_MARVEL_PRIVATE_KEY;

const generateHash = () => {
  const timestamp = Date.now().toString();
  const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
  return { timestamp, hash };
};

export const marvelApi = createApi({
  reducerPath: 'marvelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gateway.marvel.com/v1/public',
  }),
  endpoints: (builder) => ({
    fetchCharacters: builder.query({
      query: ({ page = 1 }) => {
        const { timestamp, hash } = generateHash();
        const offset = (page - 1) * 12; 
        return {
          url: '/characters',
          params: {
            ts: timestamp,
            apikey: PUBLIC_KEY,
            hash,
            limit: 12,
            offset,
          },
        };
      },
    }),
    fetchCharacterById: builder.query({
        query: (id) => {
          const { timestamp, hash } = generateHash();
          return {
            url: `/characters/${id}`,
            params: {
              ts: timestamp,
              apikey: PUBLIC_KEY,
              hash,
            },
          };
        },
      }),
      fetchComicsByCharacter: builder.query({
        query: (characterId) => {
          const { timestamp, hash } = generateHash();
          return {
            url: `/characters/${characterId}/comics`,
            params: {
              ts: timestamp,
              apikey: PUBLIC_KEY,
              hash,
              limit: 12,
            },
          };
        },
      }),
      searchCharacters: builder.query({
        query: ({ name, page }) => {
          const { timestamp, hash } = generateHash();
          const offset = (page - 1) * 12; 
          return {
            url: '/characters',
            params: {
              ts: timestamp,
              apikey: PUBLIC_KEY,
              hash,
              nameStartsWith: name,
              limit: 12,
              offset,
            },
          };
        },
      }),
    }),
  });

  
  
  export const { useFetchCharactersQuery, useFetchCharacterByIdQuery, useFetchComicsByCharacterQuery, useSearchCharactersQuery } = marvelApi;
  