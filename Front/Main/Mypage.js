import { Text, View } from "react-native";
import Header from "../Components/Header";
import Tab from "../Components/Bottom_Tab";

export default function My() {
    return(
        <View style={{ flex: 1 }}>
            <Header />
            <View style={{ flex: 1 }}>
            <Text>라이선스</Text>
            <Text>일부 아이콘은 Freepik에서 디자인되었습니다.</Text>
            <Text>Some icons are designed by Freepik from the Noun Project.</Text>
            </View>
            <Tab />
        </View>
    )
}