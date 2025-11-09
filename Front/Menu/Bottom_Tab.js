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
    source={route.name === 'Home' 
      ? require('../assets/home (2).png') 
      : require('../assets/home.png')} 
    style={{width: 50, height: 50}} 
  />
</TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.replace("Community")}>
          <Image 
    source={route.name === 'Community' 
      ? require('../assets/community (2).png') 
      : require('../assets/community.png')} 
    style={{width: 65, height: 65}} 
  />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.replace("Event")}>
          <Image 
    source={route.name === 'Event' 
      ? require('../assets/event (2).png') 
      : require('../assets/event.png')} 
    style={{width: 65, height: 65}} 
  />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.replace("Wishlist")}>
          <Image 
    source={route.name === 'Wishlist' 
      ? require('../assets/wishlist (2).png') 
      : require('../assets/wishlist.png')} 
    style={{width: 55, height: 55}} 
  />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.replace("My")}>
           <Image 
    source={route.name === 'My' 
      ? require('../assets/mypage (2).png') 
      : require('../assets/mypage.png')} 
    style={{width: 75, height: 65}} 
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