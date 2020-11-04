import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    global: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'space-around',
    },

    // PROFIL SECTION
    viewProfilSection: {
        flexDirection: 'column',
        justifyContent: 'space-around',

        flex: 5
    },
    
    textHeader: {
        fontSize: 30,
        flex: 1,
        fontWeight: 'bold'
    },

    // BOUTTON SECTION
    viewButtonSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
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

});