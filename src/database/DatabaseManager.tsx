import * as SQLite from 'expo-sqlite';
import { Item } from 'react-native-paper/lib/typescript/src/components/List/List';
import { IUser } from '../components/shared/interface/IUser';

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
                    description text not null\
                )"
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

    }

    /*
    static getAllUser(): IUser[] {
        let result: IUser[] = [];
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
                        } as IUser);

                    }
                    return result;
                }
                )
            }, (e) => { console.log("ERREUR + " + e) },
            () => {}
        );

    }*/

    
    static async getAllUser() {
        let result: IUser[] = [];
        let selectQuery = await this.ExecuteQuery("SELECT * FROM user",[]);
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
            } as IUser);
        }

        return result;
    }




    static insertUser(user: IUser): void {
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
}