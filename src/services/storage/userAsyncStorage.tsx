import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUserObject } from '../../components/shared/interface/object/IUserObject';

export async function getCurrentUser() {
    try {
        //AsyncStorage.clear()
        const jsonValue = await AsyncStorage.getItem('@connectedUser')
        //return jsonValue != null ? JSON.parse(jsonValue) : null;
        if (jsonValue != null) {
            return JSON.parse(jsonValue) as IUserObject;
        } else {
            return undefined;
        }
    } catch (e) {
        console.log("ERROR: + " + e)
    }
}