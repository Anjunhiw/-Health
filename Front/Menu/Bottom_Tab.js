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
            source={require('../assets/home.png')} 
            style={[styles.icon, { opacity: route.name === 'Home' ? 1 : 0.3 }]} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.replace("Community")}>
          <Image 
            source={require('../assets/community.png')} 
            style={[styles.icon, { opacity: route.name === 'Community' ? 1 : 0.3 }]} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.replace("Event")}>
          <Image 
            source={require('../assets/megaphone.png')} 
            style={[styles.icon, { opacity: route.name === 'Event' ? 1 : 0.3 }]} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.replace("Wishlist")}>
          <Image 
            source={require('../assets/love.png')} 
            style={[styles.icon, { opacity: route.name === 'Wishlist' ? 1 : 0.3 }]} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.replace("My")}>
          <Image 
            source={require('../assets/user.png')} 
            style={[styles.icon, { opacity: route.name === 'My' ? 1 : 0.3 }]} 
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
  icon: {
    width: 24,
    height: 24,
  },
  tabText: {
    fontSize: 15,
    color: "#333",
  },
});