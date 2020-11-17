import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'space-around',
    },

    // BOUTTON SECTION
    viewButtonSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    // CREER ATTESTATION SECTION
    viewCreateAttestation: {
        flex: 5,
    },
    viewCreateAttestationContener:{
        flex: 1,
        flexDirection: 'row'        
    },
    buttonStyle: {
        borderRadius: 20,
        padding: 10
    },
    textStyle: {
        color: "white",
        textAlign: "center",
        fontWeight: 'bold',
        fontFamily: 'Arial'
    }

    //
});