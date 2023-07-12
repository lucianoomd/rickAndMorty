import { atom } from 'jotai';
import { Character } from '../types';

export const charactersAtom = atom<Character[]>([]);

export const favoritesAtom = atom<Character[]>([]);
