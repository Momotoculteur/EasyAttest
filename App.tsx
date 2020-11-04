import * as SQLite from 'expo-sqlite';
import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import MainTabNav from './src/navigation/tabNavigator'

const db = SQLite.openDatabase("easy_covid.db");

export default function App() {


    db.transaction(tx => {
        tx.executeSql(
            "create table if not exists\
                user (\
                    user_id integer primary key autoincrement not null,\
                    prenom text not null,\
                    nom text not null,\
                    date_naissance text not null,\
                    lieu_naissance text not null,\
                    adresse text not null,\
                    ville text not null,\
                    code_postal text not null\
            );"
        );

        tx.executeSql(
            "create table if not exists\
                motif (\
                    motif_id integer primary key autoincrement not null,\
                    intitule text not null,\
                    description text not null)"
        );

        tx.executeSql(
            "create table if not exists\
                attestation (\
                    attestation_id integer primary key autoincrement not null,\
                    date_sortie text not null,\
                    heure_sortie text not null,\
                    user_id int not null,\
                    motif_id int not null,\
                    foreign key (motif_id) references motif(motif_id),\
                    foreign key (user_id) references user(user_id)\
            );"
        );
                
        /*
        tx.executeSql("insert into motif (intitule, description) values ('coucou', 'slt bg cm tu vq')");
        tx.executeSql("select * from motif", [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
        );*/
    }, (e) => { console.log("ERREUR + " + e) },
        () => { console.log("OK + ") }
    );



    return (
        <SafeAreaView style={styles.container}>
            <MainTabNav />
        </SafeAreaView >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});

