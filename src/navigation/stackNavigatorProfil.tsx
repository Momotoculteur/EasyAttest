import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react'

import Profile from '../pages/profile-page/create-profil-page-main'
import CreateProfilePage from '../pages/profile-page/create-profil-page/create-profil-page'
import SettingsPage from "../pages/profile-page/settings-page/settings-page";
import { ROUTE_CONSTANT } from "./route";

const Stack = createStackNavigator();

export default function StackNavigatorProfil() {
    //initialRouteName="profil"
    return (
        <Stack.Navigator initialRouteName={ROUTE_CONSTANT.ACTIVE_PROFIL}>
            <Stack.Screen name={ROUTE_CONSTANT.ACTIVE_PROFIL} component={Profile} />
            <Stack.Screen name={ROUTE_CONSTANT.CREATE_PROFIL} component={CreateProfilePage} />
            <Stack.Screen name={ROUTE_CONSTANT.SETTINGS} component={SettingsPage} />

        </Stack.Navigator>
    )
}