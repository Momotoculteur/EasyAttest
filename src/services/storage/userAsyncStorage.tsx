import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from '../components/shared/interface/IUser';

export async function getCurrentUser() {
    try {
        //AsyncStorage.clear()
        const jsonValue = await AsyncStorage.getItem('@connectedUser')
        //return jsonValue != null ? JSON.parse(jsonValue) : null;
        if (jsonValue != null) {
            return JSON.parse(jsonValue) as IUser;
        } else {
            return undefined;
        }
    } catch (e) {
        console.log("ERRORRRRR: + " + e)
    }
}