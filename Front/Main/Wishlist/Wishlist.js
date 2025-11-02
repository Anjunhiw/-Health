import { Text, View } from "react-native";
import Header from "../../Menu/Header";
import Tab from "../../Menu/Bottom_Tab";

export default function Wishlist() {
    return(
        <View style={{ flex: 1 }}>
            <Header />
            <View style={{ flex: 1 }}>
            <Text>Wishlist</Text>
            </View>
            <Tab />
        </View>
    )
}