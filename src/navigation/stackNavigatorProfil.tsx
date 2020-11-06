import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react'

import Profile from '../pages/profile-page/create-profil-page-main'
import CreateProfilePage from '../pages/profile-page/create-profil-page/create-profil-page'
import { ROUTE_CONSTANT } from "./route";

const Stack = createStackNavigator();

export default function StackNavigatorProfil() {
    return (
        <Stack.Navigator initialRouteName="profil">
            <Stack.Screen name={ROUTE_CONSTANT.ACTIVE_PROFIL} component={Profile} />
            <Stack.Screen name={ROUTE_CONSTANT.CREATE_PROFIL} component={CreateProfilePage} />

        </Stack.Navigator>
    )
}