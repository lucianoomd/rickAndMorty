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
import getCharacters from '../api';
import { charactersState, errorState, loadingState } from '../store/atoms';
import CharacterCard from '../components/CharacterCard';
import { Character } from '../types';
import portal from '../assets/portal.png';
import { useQuery } from '@apollo/client';

function Home(): JSX.Element {
	const [characters, setCharacters] = useRecoilState(charactersState);
	const [page, setPage] = useState(1);
	const { loading, error, data } = useQuery(getCharacters, {
		variables: { page },
	});

	async function getCharacterWithPage() {
		try {
			const result = data?.characters && data?.characters;
			let newCharacters: Character[] = [];
			if (characters) {
				newCharacters = newCharacters.concat(characters);
			}

			if (result && result?.results) {
				newCharacters = newCharacters.concat(result.results);
			}
			setCharacters(newCharacters);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getCharacterWithPage();
	}, [data?.characters]);

	function retry() {
		getCharacterWithPage();
	}

	const renderError = () => {
		return (
			<ImageBackground style={styles.container} source={portal}>
				<SafeAreaView style={styles.container}>
					<View style={styles.errorContainer}>
						<Text style={styles.errorText}>{error?.message}</Text>
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
