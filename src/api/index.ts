import axios from 'axios';
import { CharactersApiReturn } from '../types';

const baseAPI = 'https://rickandmortyapi.com/api';

export const getCharacters = async (page: Number = 1): CharactersApiReturn => {
	const result = await axios.get(`${baseAPI}/character?page=${page}`);
	return {
		characters: result.data.results,
		nextPage: result.data.info.next ? result.data.info.next.split('=')[1] : 0,
	};
};
