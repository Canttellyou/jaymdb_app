import { ToastAndroid } from "react-native";
export function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
}