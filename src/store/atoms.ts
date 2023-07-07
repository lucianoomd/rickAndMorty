import { atom } from 'recoil';
import { Character } from '../types';

export const charactersState = atom<Character[]>({
	key: 'characters',
	default: [],
});

export const loadingState = atom<Boolean>({
	key: 'loading',
	default: false,
});

export const errorState = atom<String>({
	key: 'error',
	default: '',
});

export const favoritesState = atom<Character[]>({
	key: 'favorites',
	default: [],
});
