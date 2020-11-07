import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react'
import MyAttestionPage from '../pages/attestation-page/my-attestation-page';
import { ROUTE } from './route';


const Stack = createStackNavigator();


export default function StackNavigatorAttestation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={ROUTE.ATTESTATION_TAB.MAIN} component={MyAttestionPage} />
        </Stack.Navigator>
    )
}