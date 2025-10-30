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
  { name: '헬스', icon: require('../assets/dumbbell.png') },
  { name: '수영', icon: require('../assets/swim.png') },
  { name: '복싱', icon: require('../assets/boxing.png') },
  { name: '풋살' },
  { name: '골프' },
  { name: '요가 / 필라테스' },
  { name: '배드민턴 / 테니스' },
  { name: '탁구' },
  { name: '농구 / 야구' },
  { name: '볼링 / 당구' },
  { name: '태권도 / 유도 / 주짓수' },
  { name: '공원' },
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
              {item.icon && <Image source={item.icon} style={styles.gymIcon} />}
              <Text style={styles.gymText}>{item.name}</Text>
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
    marginTop: 60,
    gap: 70,
  },
  gymIconContainer: {
    alignItems: 'center',
    gap: 15,
  },
  gymIcon: {
    width: 50,
    height: 50
  }
});