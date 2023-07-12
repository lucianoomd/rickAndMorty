import React from 'react';
import { FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { favoritesAtom } from '../store/atoms';
import CharacterCard from '../components/CharacterCard';
import portal from '../assets/portal.png';
import { useAtom } from 'jotai';

function Favorites(): JSX.Element {
	const [favorites] = useAtom(favoritesAtom);

	return (
		<ImageBackground style={styles.container} source={portal}>
			<SafeAreaView style={styles.container}>
				<FlatList
					data={favorites}
					renderItem={({ item }) => (
						<CharacterCard character={item} key={`${item.name}${Math.random()}`} />
					)}
					ListEmptyComponent={
						<View style={styles.emptyListContainer}>
							<Text style={styles.emptyListText}>{"You have no favorite character yet! :'("}</Text>
						</View>
					}
				/>
			</SafeAreaView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	emptyListContainer: {
		padding: 20,
		backgroundColor: '#ffffffCC',
		alignItems: 'center',
	},
	emptyListText: {
		color: '#000',
	},
});

export default Favorites;
