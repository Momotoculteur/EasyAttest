import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform, Switch } from 'react-native'
import { Ionicons } from '@expo/vector-icons'


import Profile from '../pages/profile-page'
import AllAttestation from '../pages/all-attestation-page'
import CreateAttestation from '../pages/create-attestation-page'
import { ROUTE_CONSTANT } from './route'

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
                        const {routeID}  = route.params;
                        // Definit le type d icones selon la platforme
                        if (Platform.OS === "android") {
                            iconName += "md-";
                        } else if (Platform.OS === "ios") {
                            iconName += "ios-";
                        }
                        
                        // assigne l icone
                        switch (routeID) {
                            case ROUTE_CONSTANT.MY_PROFILE: {
                                iconName += "home";
                                break;
                            }
                            case ROUTE_CONSTANT.CREATE_ATTESTATION: {
                                iconName += "create";
                                break;
                            }
                            case ROUTE_CONSTANT.ALL_ATTESTATIONS: {
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
                    initialParams={{routeID: ROUTE_CONSTANT.MY_PROFILE}}
                
                />

                <Tab.Screen
                    name='Créer attestation'
                    component={CreateAttestation}
                    initialParams={{routeID: ROUTE_CONSTANT.CREATE_ATTESTATION}}
                />

                <Tab.Screen
                    name='Mes attestations'
                    component={AllAttestation}
                    initialParams={{routeID: ROUTE_CONSTANT.ALL_ATTESTATIONS}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}