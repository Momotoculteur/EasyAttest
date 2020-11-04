import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react'

import Profile from '../pages/profile-page/create-profil-page-main'
import CreateProfilePage from '../pages/profile-page/create-profil-page/create-profil-page'

const Stack = createStackNavigator();

export default function StackNavigatorProfil() {
    return (
        <Stack.Navigator initialRouteName="profil">
            <Stack.Screen name="Mes profils" component={Profile} />
            <Stack.Screen name="createProfil" component={CreateProfilePage} />

        </Stack.Navigator>
    )
}