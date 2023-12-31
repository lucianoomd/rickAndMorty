import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Details from './screens/Details';
import Favorites from './screens/Favorites';
import { ApolloProvider } from '@apollo/client';
import client from './api/service';
import { Provider } from 'jotai';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Favorites" component={Favorites} />
		</Tab.Navigator>
	);
}

export default function Router() {
	return (
		<ApolloProvider client={client}>
			<Provider>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name="HomeTab" component={MyTabs} />
						<Stack.Screen name="Details" component={Details} />
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		</ApolloProvider>
	);
}
