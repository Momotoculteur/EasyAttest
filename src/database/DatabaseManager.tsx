import * as SQLite from 'expo-sqlite';
import { Item } from 'react-native-paper/lib/typescript/src/components/List/List';
import { IAttestationObject } from '../components/shared/interface/object/IAttestationObject';
import { IUserObject } from '../components/shared/interface/object/IUserObject';

const db = SQLite.openDatabase("easy_covid.db");


export default class DatabaseManager {

    static ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
        db.transaction((trans) => {
            trans.executeSql(sql, params, (trans, results) => {
                resolve(results);
            },
                (error) => {
                    reject(error);
                });
        });
    });

    static initializeDatabase(): void {
        db.transaction(tx => {

            // Supprimer une table
            //tx.executeSql("DROP TABLE attestation");
            //tx.executeSql("DROP TABLE user");





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

            /*
            tx.executeSql(
                "create table if not exists\
                motif (\
                    motif_id integer primary key autoincrement not null,\
                    intitule text not null,\
                    description text not null\
                )"
            );
            */

            tx.executeSql(
                "create table if not exists\
                    attestation (\
                        attestation_id integer primary key autoincrement not null,\
                        date_sortie text not null,\
                        heure_sortie text not null,\
                        user_id int not null,\
                        motifListId string not null,\
                        foreign key (user_id) references user(user_id)\
                    );"
            );

            //foreign key (motif_id) references motif(motif_id),\
            //                        motif_id int not null,\


            /*
            tx.executeSql("insert into motif (intitule, description) values ('coucou', 'slt bg cm tu vq')");
            tx.executeSql("select * from motif", [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
            );*/
        }, (e) => { console.log("ERREUR + " + e) },
            () => { console.log("OK + ") }
        );

    }

    /*
    static getAllUser(): IUserObject[] {
        let result: IUserObject[] = [];
        db.transaction(
            tx => {
                tx.executeSql("select * from user", [], (err, { rows }) => {
                    for (let i = 0; i < rows.length; i++) {
                        var item = rows.item(i);
                        result.push({
                            firstName: item.prenom,
                            lastName: item.nom,
                            birthplace: item.lieu_naissance,
                            birthdate: item.date_naissance,
                            postalCode: item.code_postal,
                            city: item.ville,
                            adress: item.adresse
                        } as IUserObject);

                    }
                    return result;
                }
                )
            }, (e) => { console.log("ERREUR + " + e) },
            () => {}
        );

    }*/


    static async getAllUser() {
        let result: IUserObject[] = [];
        let selectQuery = await this.ExecuteQuery("SELECT * FROM user", []);
        var rows = selectQuery.rows;
        for (let i = 0; i < rows.length; i++) {
            var item = rows.item(i);
            result.push({
                firstName: item.prenom,
                lastName: item.nom,
                birthplace: item.lieu_naissance,
                birthdate: item.date_naissance,
                postalCode: item.code_postal,
                city: item.ville,
                adress: item.adresse,
                id: item.user_id
            } as IUserObject);
        }

        return result;
    }

    static async deleteUserWithId(id: number) {
        await this.ExecuteQuery("DELETE FROM attestation WHERE user_id=?", [id])
            .then(() => {
                this.ExecuteQuery("DELETE FROM user WHERE user_id=?", [id]);
            });

    }

    static async deleteAttestationWithId(id: number) {
        await this.ExecuteQuery("DELETE FROM attestation WHERE attestation_id=?", [id]);
    }

    static async deleteAllAttestionWithCurrendUserId(id: number) {
        await this.ExecuteQuery("DELETE FROM attestation WHERE user_id=?", [id]);
    }

    static async createAttestation(date: string, time: string, userId: number, motifListId: string) {
        console.log(time)
        await this.ExecuteQuery("INSERT INTO attestation(\
                                                date_sortie,\
                                                heure_sortie,\
                                                user_id,\
                                                motifListId)\
                                                values(\
                                                    ?,\
                                                    ?,\
                                                    ?,\
                                                    ?)", [date, time, userId, motifListId]);

    }

    static async getAllAttestationByUserId(id?: number) {
        let result: IAttestationObject[] = [];
        let selectQuery = await this.ExecuteQuery("SELECT * FROM attestation WHERE user_id=?", [id]);
        var rows = selectQuery.rows;
        for (let i = 0; i < rows.length; i++) {
            var item = rows.item(i);
            result.push({
                id: item.attestation_id,
                date: item.date_sortie,
                time: item.heure_sortie,
                reasons: item.motifListId,
                pathAttestation: '',
            } as IAttestationObject);
        }

        return result;
    }


    static async createUser(user: IUserObject) {
        await this.ExecuteQuery("insert into\
        user(\
            prenom,\
            nom,\
            date_naissance,\
            lieu_naissance,\
            adresse,\
            ville,\
            code_postal\
            )\
        values(\
            ?,\
            ?,\
            ?,\
            ?,\
            ?,\
            ?,\
            ?)",
            [
                user.firstName,
                user.lastName,
                user.birthdate,
                user.birthplace,
                user.adress,
                user.city,
                user.postalCode
            ]);
    }


    /* 

    A SUPPRIMER OLD


    static insertUser(user: IUserObject): void {
        db.transaction(
            tx => {
                tx.executeSql(
                    "insert into\
                        user(\
                            prenom,\
                            nom,\
                            date_naissance,\
                            lieu_naissance,\
                            adresse,\
                            ville,\
                            code_postal\
                            )\
                        values(\
                            ?,\
                            ?,\
                            ?,\
                            ?,\
                            ?,\
                            ?,\
                            ?)",
                    [
                        user.firstName,
                        user.lastName,
                        user.birthdate,
                        user.birthplace,
                        user.adress,
                        user.city,
                        user.postalCode
                    ]
                )
            },
            (e) => { console.log("ERREUR + " + e) },
            () => { console.log("OK + ") }
        )
    }
    */


}