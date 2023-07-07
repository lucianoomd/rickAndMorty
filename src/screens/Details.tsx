import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

function Details(): JSX.Element {
	return (
		<SafeAreaView>
			<ScrollView contentInsetAdjustmentBehavior="automatic">
				<Text style={styles.text}>Details</Text>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	text: {
		color: '#000',
	},
});

export default Details;
