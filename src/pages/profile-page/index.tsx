import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("easy_covid.db");

export default function Profile() {

    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <Text>Profillllllllllle</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'stretch',
        flexWrap: 'wrap',
    },
});