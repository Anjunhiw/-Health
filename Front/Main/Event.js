import { Text, View } from "react-native";
import Header from "../Components/Header";
import Tab from "../Components/Bottom_Tab";

export default function Event() {
    return(
        <View style={{ flex: 1 }}>
            <Header />
            <View style={{ flex: 1 }}>
            <Text>Event</Text>
            </View>
            <Tab />
        </View>
    )
}