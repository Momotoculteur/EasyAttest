import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react'
import MyAttestionPage from '../pages/my-attestation-page/my-attestation-page';
import { ROUTE } from './route';


const Stack = createStackNavigator();


export default function StackNavigatorMyAttestation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={ROUTE.MY_ATTESTATION_TAB.MAIN} component={MyAttestionPage} />
        </Stack.Navigator>
    )
}