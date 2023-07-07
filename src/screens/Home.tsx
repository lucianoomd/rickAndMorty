import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Button,
	FlatList,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useRecoilState } from 'recoil';
import { getCharacters } from '../api';
import { charactersState, errorState, loadingState } from '../store/atoms';
import CharacterCard from '../components/CharacterCard';
import { Character } from '../types';
import portal from '../assets/portal.png';

function Home(): JSX.Element {
	const [characters, setCharacters] = useRecoilState(charactersState);
	const [loading, setLoading] = useRecoilState(loadingState);
	const [error, setError] = useRecoilState(errorState);
	const [page, setPage] = useState(1);

	async function getCharacterWithPage() {
		if (page !== 0) {
			try {
				setLoading(true);
				const result = await getCharacters(page);
				let newCharacters: Character[] = [];
				if (characters) {
					newCharacters = newCharacters.concat(characters);
				}

				if (result && result.characters) {
					newCharacters = newCharacters.concat(result.characters);
				}
				setPage(result.nextPage);
				setCharacters(newCharacters);
				setLoading(false);
			} catch (error) {
				setError(String(error));
				setLoading(false);
			}
		}
	}

	useEffect(() => {
		getCharacterWithPage();
	}, []);

	function retry() {
		setError('');
		getCharacterWithPage();
	}

	const renderError = () => {
		return (
			<ImageBackground style={styles.container} source={portal}>
				<SafeAreaView style={styles.container}>
					<View style={styles.errorContainer}>
						<Text style={styles.errorText}>{error}</Text>
						<Button title="Retry" onPress={retry} />
					</View>
				</SafeAreaView>
			</ImageBackground>
		);
	};

	if (error) {
		return renderError();
	}

	return (
		<ImageBackground style={styles.container} source={portal}>
			<SafeAreaView style={styles.container}>
				<FlatList
					data={characters}
					renderItem={({ item }) => (
						<CharacterCard character={item} key={`${item.created}${Math.random()}`} />
					)}
					onEndReachedThreshold={0.9}
					onEndReached={getCharacterWithPage}
				/>
				{loading ? (
					<View style={styles.loaderContainer}>
						<ActivityIndicator size={'large'} />
					</View>
				) : (
					<></>
				)}
			</SafeAreaView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loaderContainer: {
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffffCC',
	},
	errorContainer: {
		backgroundColor: '#f00',
		padding: 20,
	},
	errorText: {
		color: '#fff',
	},
});

export default Home;
