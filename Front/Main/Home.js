import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity } from "react-native";
import Header from "../Components/Header";
import Tab from "../Components/Bottom_Tab";
import { useState } from "react";

export default function Home() {

  const [address, setAddress] = useState('');

  function deleteAddress() {
    setAddress('');
  }

  const gymItems = [
  { name: '헬스', icon: require('../assets/gym.png') },
  { name: '수영', icon: require('../assets/swim.png') },
  { name: '풋살', icon: require('../assets/futsal.png') },
  { name: '탁구', icon: require('../assets/table-tennis.png') },
  { name: '테니스', icon: require('../assets/tennis.png') },
  { name: '농구', icon: require('../assets/basketball.png') },
  { name: '복싱', icon: require('../assets/boxing.png') },
  { name: '필라테스', icon: require('../assets/pilates.png') },
  { name: '태권도', icon: require('../assets/taekwondo.png') },
];

  return(
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View style={{ flex: 1 }}>
    <Header />
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={styles.searchInput}
          placeholder="주소 검색"
        />
        <View style={styles.searchButton}>
        <TouchableOpacity onPress={deleteAddress}>
        <Text 
        style={{fontSize: 20, color: !address ? '#ccc' : '#000'}}>X</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 18}}>|</Text>
        <TouchableOpacity>
         <Image source={require('../assets/search.png')} style={styles.searchIcon} />
         </TouchableOpacity>
         </View>
      </View>
      {Array.from({ length: Math.ceil(gymItems.length / 3) }).map((_, rowIndex) => (
        <View style={styles.iconContainer} key={rowIndex}>
          {gymItems.slice(rowIndex * 3, rowIndex * 3 + 3).map((item, index) => (
            <View style={styles.gymIconContainer} key={index}>
              <TouchableOpacity>
              {item.icon && <Image source={item.icon} style={styles.gymIcon} />}
              {/* <Text style={styles.gymText}>{item.name}</Text> */}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </View>
    <Tab />
  </View>
</TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 15, 
  },
  searchIcon: {
    width: 30,
    height: 24,
  },
  searchInput: {
    flex: 1, 
    paddingVertical: 12, 
    fontSize: 18,
  },
  searchButton: {
    flexDirection: 'row',
    gap: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    gap: 30,
  },
  gymIconContainer: {
    alignItems: 'center',
  },
  gymIcon: {
    width: 100,
    height: 100
  }
});