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

    // LISTE ATTESTATION SECTION
    viewAllAttestation: {
        flexDirection: 'column',
        justifyContent: 'space-around',

        flex: 5
    },
    buttonStyle: {
        borderRadius: 20,
        backgroundColor: '#e50d54',
        padding: 10
    },
    textStyle: {
        color: "white",
        textAlign: "center",
        fontWeight: 'bold',
        fontFamily: 'arial'
    }
    //
});