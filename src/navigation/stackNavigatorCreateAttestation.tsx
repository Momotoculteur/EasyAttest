import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react'
import CreateAttestionPage from '../pages/create-attestation-page/create-attestation-page-main'

const Stack = createStackNavigator();


export default function StackNavigatorCreateAttestation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Créer attestation" component={CreateAttestionPage} />
        </Stack.Navigator>
    )
}