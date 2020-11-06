import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react'

import Profile from '../pages/profile-page/profil-page'
import CreateProfilePage from '../pages/profile-page/create-profil-page/create-profil-page'
import SettingsPage from "../pages/profile-page/settings-page/settings-page";
import { ROUTE } from "./route";
import SwitchProfilePage from "../pages/profile-page/change-profil-page/switch-profil-page";

const Stack = createStackNavigator();

export default function StackNavigatorProfil() {
    return (
        <Stack.Navigator initialRouteName={ROUTE.PROFILE_TAB.MAIN}>
            <Stack.Screen name={ROUTE.PROFILE_TAB.MAIN} component={Profile} />
            <Stack.Screen name={ROUTE.PROFILE_TAB.CREATE_PROFIL} component={CreateProfilePage} />
            <Stack.Screen name={ROUTE.PROFILE_TAB.SETTINGS} component={SettingsPage} />
            <Stack.Screen name={ROUTE.PROFILE_TAB.SWITCH_PROFILE} component={SwitchProfilePage} />
        </Stack.Navigator>
    )
}