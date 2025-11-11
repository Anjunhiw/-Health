import { View, Text, StyleSheet } from 'react-native';
import Header from '../../Menu/Header';
import Tab from '../../Menu/Bottom_Tab';

export default function Pg_Detail() {
    return(
    <View style={styles.container}>
        <Header />

        <View style={styles.content}>
            <Text>프로그램 상세페이지</Text>
        </View>

        <Tab />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})