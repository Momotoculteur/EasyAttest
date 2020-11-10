import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react'
import MyAttestionPage from '../pages/attestation-page/my-attestation-page';
import PdfReaderPage from '../pages/attestation-page/pdf-reader-page.tsx/pdf-reader-page';
import { ROUTE } from './route';


const Stack = createStackNavigator();


export default function StackNavigatorAttestation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={ROUTE.ATTESTATION_TAB.MAIN} component={MyAttestionPage} />
            <Stack.Screen name={ROUTE.ATTESTATION_TAB.PDF_READER} component={PdfReaderPage} />
        </Stack.Navigator>
    )
}