import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Tab() {
  const navigation = useNavigation();
  const route = useRoute(); 

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.replace("Home")}>
          <Image 
            source={require('../assets/home (3).png')} 
            style={[{width: 45, height: 45} , { opacity: route.name === 'Home' ? 1 : 0.3 }]} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.replace("Community")}>
          <Image 
            source={require('../assets/community (2).png')} 
            style={[{width: 60, height: 60} , { opacity: route.name === 'Community' ? 1 : 0.3 }]} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.replace("Event")}>
          <Image 
            source={require('../assets/event.png')} 
            style={[{width: 60, height: 60} , { opacity: route.name === 'Event' ? 1 : 0.3 }]} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.replace("Wishlist")}>
          <Image 
            source={require('../assets/wishlist.png')} 
            style={[{width: 50, height: 50} , { opacity: route.name === 'Wishlist' ? 1 : 0.3 }]} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.replace("My")}>
          <Image 
            source={require('../assets/mypage (2).png')} 
            style={[{width: 70, height: 65} , { opacity: route.name === 'My' ? 1 : 0.3 }]} 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
  },
  container: {
    flexDirection: "row",
    height: 70,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  tabText: {
    fontSize: 15,
    color: "#333",
  },
});