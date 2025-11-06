import { View, Text, StyleSheet } from 'react-native';
import Header from '../../Menu/Header';
import Tab from '../../Menu/Bottom_Tab';

export default function Detail() {
    return(
    <View style={styles.container}>
        <Header />

        <View style={styles.content}>
            <Text>게시글 상세페이지</Text>
            <Text>해당 게시글 불러오고 댓글 기능도 추가할 예정</Text>
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