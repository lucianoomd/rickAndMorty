import React from 'react';
import { FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { favoritesState } from '../store/atoms';
import CharacterCard from '../components/CharacterCard';
import portal from '../assets/portal.png';

function Favorites(): JSX.Element {
	const characters = useRecoilValue(favoritesState);

	return (
		<ImageBackground style={styles.container} source={portal}>
			<SafeAreaView style={styles.container}>
				<FlatList
					data={characters}
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
