import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../Screens/Home/Home'
import Welcome from '../Screens/Welcome/Welcome'
import RecipeDetail from '../Screens/RecipeDetail/RecipeDetail'


const Stack = createNativeStackNavigator()
const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation