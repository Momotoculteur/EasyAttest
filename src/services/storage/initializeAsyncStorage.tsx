import AsyncStorage from "@react-native-async-storage/async-storage"

export async function initializeAllAsyncStorage() {
    try {

        // USER

        // SETTINGS
        await AsyncStorage.setItem('@settings_AutoDate', JSON.stringify(true))
        await AsyncStorage.setItem('@settings_AutoHour', JSON.stringify(true))
        await AsyncStorage.setItem('@settings_AutoTitle', JSON.stringify(true))

    } catch (e) {
        console.log("ERROR: + " + e)
    }
}