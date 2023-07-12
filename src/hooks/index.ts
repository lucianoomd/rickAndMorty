import { favoritesAtom } from '../store/atoms';
import { useAtom } from 'jotai';

export function useIsFavorite(id: Number): Boolean {
	const [favorites] = useAtom(favoritesAtom);
	return favorites.some((item) => item.id === id);
}
