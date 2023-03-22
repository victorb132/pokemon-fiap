import axios from 'axios';

const endpoint = 'https://pokeapi.co/api/v2/pokemon';

export const api = axios.create({
  baseURL: endpoint
});