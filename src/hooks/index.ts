import { useRecoilValue } from 'recoil';
import { favoritesState } from '../store/atoms';

export function useIsFavorite(id: Number): Boolean {
	const favorites = useRecoilValue(favoritesState);
	return favorites.some((item) => item.id === id);
}
