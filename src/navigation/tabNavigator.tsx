import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform, Switch } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import Profile from '../scenes/profile'
import AllAttestation from '../scenes/allAttestation'
import CreateAttestation from '../scenes/createAttestation'

const Tab = createBottomTabNavigator()

export default function MainTabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={
                    {
                        activeTintColor: '#e50d54',
                        inactiveTintColor: 'gray',
                        labelPosition: 'below-icon'
                    }
                }
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: string = "";

                        // Definit le type d icones selon la platforme
                        if (Platform.OS === "android") {
                            iconName += "md-";
                        } else if (Platform.OS === "ios") {
                            iconName += "ios-";
                        }

                        // assigne l icone
                        switch (route.name) {
                            case "Mon profil": {
                                iconName += "home";
                                break;
                            }
                            case "Créer attestation": {
                                iconName += "create";
                                break;
                            }
                            case "Mes attestations": {
                                iconName += "folder";
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    }
                })
                }

            >
                <Tab.Screen
                    name='Mon profil'
                    component={Profile}
                />

                <Tab.Screen
                    name='Créer attestation'
                    component={CreateAttestation}
                />

                <Tab.Screen
                    name='Mes attestations'
                    component={AllAttestation}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}