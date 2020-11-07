import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform, Switch, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import ProfilStackNavigator from '../navigation/stackNavigatorProfil'
import { ROUTE } from './route'
import StackNavigatorCreateAttestation from './stackNavigatorCreateAttestation'
import StackNavigatorAttestation from './stackNavigatorAttestation'

const Tab = createBottomTabNavigator()

export default function MainTabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={
                    {
                        activeTintColor: '#e50d54',
                        inactiveTintColor: 'gray',
                        labelPosition: 'below-icon',
                        showLabel: true
                    }
                }
                initialRouteName={ROUTE.CREATE_ATTESTAION_TAB.MAIN}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: string = "";
                        // Definit le type d icones selon la platforme
                        if (Platform.OS === "android") {
                            iconName += "md-";
                        } else if (Platform.OS === "ios") {
                            iconName += "ios-";
                        }

                        if (focused) {
                            size = size + 4;

                        }

                        // assigne l icone
                        switch (route.name) {
                            case ROUTE.PROFILE_TAB.MAIN: {
                                iconName += "person";
                                break;
                            }
                            case ROUTE.CREATE_ATTESTAION_TAB.MAIN: {
                                iconName += "create";
                                break;
                            }
                            case ROUTE.ATTESTATION_TAB.MAIN: {
                                iconName += "folder";
                                break;
                            }
                            default: {
                                break;
                            }
                        }

                        return (<Ionicons name={iconName} size={size} color={color} />)
                    }
                })
                }

            >
                <Tab.Screen
                    name={ROUTE.PROFILE_TAB.MAIN}
                    component={ProfilStackNavigator}

                />

                <Tab.Screen
                    name={ROUTE.CREATE_ATTESTAION_TAB.MAIN}
                    component={StackNavigatorCreateAttestation}
                />

                <Tab.Screen
                    name={ROUTE.ATTESTATION_TAB.MAIN}
                    component={StackNavigatorAttestation}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}