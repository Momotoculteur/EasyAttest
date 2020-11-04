import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform, Switch, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import ProfilStackNavigator from '../navigation/stackNavigatorProfil'
import StackNavigatorAllAttestation from '../navigation/stackNavigatorAllAttestation'
import { ROUTE_CONSTANT } from './route'
import StackNavigatorCreateAttestation from './stackNavigatorCreateAttestation'

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
                initialRouteName={ROUTE_CONSTANT.CREATE_ATTESTATION_MAIN_TAB}
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
                            case ROUTE_CONSTANT.MY_PROFILE_MAIN_TAB: {
                                iconName += "people";
                                break;
                            }
                            case ROUTE_CONSTANT.CREATE_ATTESTATION_MAIN_TAB: {
                                iconName += "create";
                                break;
                            }
                            case ROUTE_CONSTANT.ALL_ATTESTATIONS_MAIN_TAB: {
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
                    name={ROUTE_CONSTANT.MY_PROFILE_MAIN_TAB}
                    component={ProfilStackNavigator}

                />

                <Tab.Screen
                    name={ROUTE_CONSTANT.CREATE_ATTESTATION_MAIN_TAB}
                    component={StackNavigatorCreateAttestation}
                />

                <Tab.Screen
                    name={ROUTE_CONSTANT.ALL_ATTESTATIONS_MAIN_TAB}
                    component={StackNavigatorAllAttestation}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}