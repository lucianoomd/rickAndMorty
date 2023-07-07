import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Character } from '../types';
import { useRecoilState } from 'recoil';
import { favoritesState } from '../store/atoms';
import { useIsFavorite } from '../hooks';

type CharacterCardProps = {
	character: Character;
};

function CharacterCard({ character }: CharacterCardProps): JSX.Element {
	const { name, image, species, origin } = character;
	const [favorites, setFavorites] = useRecoilState(favoritesState);
	const isFavorite = useIsFavorite(character.id);

	const removeFavorite = (): void => {
		setFavorites(favorites.filter((item) => item.id !== character.id));
	};

	const addFavorite = (): void => {
		setFavorites([...favorites, character]);
	};

	const handleOnPress = () => {
		if (isFavorite) {
			removeFavorite();
		} else {
			addFavorite();
		}
	};

	return (
		<View style={styles.card}>
			<View style={styles.imageContainer}>
				{image ? (
					<Image source={{ uri: image }} style={styles.image} />
				) : (
					<View style={styles.noImage} />
				)}
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.title}>
					{'Name: '}
					<Text style={styles.name}>{name ?? ''}</Text>
				</Text>
				<Text style={styles.title}>
					{'Specie: '}
					<Text style={styles.text}>{species ?? ''}</Text>
				</Text>
				<Text style={styles.title}>
					{'Location: '}
					<Text style={styles.text}>{origin.name ?? ''}</Text>
				</Text>
				<TouchableOpacity
					style={[styles.button, isFavorite ? styles.buttonRemove : styles.buttonAdd]}
					onPress={handleOnPress}
				>
					<Text style={styles.buttonText}>{isFavorite ? 'Remove favorite' : 'Add favorite'}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 10,
		borderRadius: 5,
		borderBottomColor: '#555555',
		borderBottomWidth: 1,
		marginBottom: 15,
		flexDirection: 'row',
		backgroundColor: '#ffffffCC',
	},
	imageContainer: {
		flex: 2,
		alignItems: 'center',
	},
	image: {
		height: 120,
		width: 120,
		resizeMode: 'contain',
	},
	infoContainer: {
		flex: 2,
		justifyContent: 'center',
	},
	noImage: {
		height: 120,
		width: 120,
		backgroundColor: '#9f9f9f',
	},
	title: {
		color: '#555',
		fontWeight: '500',
		marginVertical: 2,
	},
	name: {
		color: '#000',
		fontWeight: '900',
	},
	text: {
		color: '#000',
	},
	button: {
		padding: 5,
		alignItems: 'center',
		borderRadius: 5,
	},
	buttonAdd: {
		backgroundColor: '#22AA22',
	},
	buttonRemove: {
		backgroundColor: '#ff2222',
	},
	buttonText: {
		color: 'white',
	},
});

export default CharacterCard;
