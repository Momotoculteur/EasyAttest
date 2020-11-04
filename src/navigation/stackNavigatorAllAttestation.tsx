import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react'
import AllAttestionPage from '../pages/all-attestation-page/all-attestation-page-main';


const Stack = createStackNavigator();


export default function StackNavigatorAllAttestation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Mes attestations" component={AllAttestionPage} />
        </Stack.Navigator>
    )
}