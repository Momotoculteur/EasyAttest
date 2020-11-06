import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react'
import AllAttestionPage from '../pages/all-attestation-page/all-attestation-page-main';
import { ROUTE_CONSTANT } from './route';


const Stack = createStackNavigator();


export default function StackNavigatorAllAttestation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={ROUTE_CONSTANT.ALL_ATTESTATIONS_MAIN_TAB} component={AllAttestionPage} />
        </Stack.Navigator>
    )
}