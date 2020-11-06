import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react'
import CreateAttestionPage from '../pages/create-attestation-page/create-attestation-page'
import { ROUTE } from './route';

const Stack = createStackNavigator();


export default function StackNavigatorCreateAttestation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={ROUTE.CREATE_ATTESTAION_TAB.MAIN} component={CreateAttestionPage} />
        </Stack.Navigator>
    )
}