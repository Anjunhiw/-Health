import { Text, View, TextInput, ScrollView, StyleSheet, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity } from "react-native";
import Header from "../../Menu/Header";
import Tab from "../../Menu/Bottom_Tab";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Home() {

  const [address, setAddress] = useState('');

  const navigation = useNavigation();
  const borderColor = !address ? '#ccc' : '#000';

  function deleteAddress() {
    setAddress('');
  }

  const gymItems = [
  { name: '헬스', icon: require('../../assets/gym.png') },
  { name: '수영', icon: require('../../assets/swim.png') },
  { name: '풋살', icon: require('../../assets/futsal.png') },
  { name: '탁구', icon: require('../../assets/table-tennis.png') },
  { name: '테니스', icon: require('../../assets/tennis.png') },
  { name: '농구', icon: require('../../assets/basketball.png') },
  { name: '복싱', icon: require('../../assets/boxing.png') },
  { name: '필라테스', icon: require('../../assets/pilates.png') },
  { name: '태권도', icon: require('../../assets/taekwondo.png') },
];

  return(
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View style={{ flex: 1 }}>
    <Header />
    <View style={styles.container}>
      <View style={[styles.searchContainer, { borderColor}]}>
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={styles.searchInput}
          placeholder="주소 검색"
        />
        <View style={styles.searchButton}>
        <TouchableOpacity onPress={deleteAddress}>
        <Text 
        style={{fontSize: 20, color: borderColor}}>X</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 18, color: borderColor}}>|</Text>
        <TouchableOpacity>
         <Image source={require('../../assets/search.png')} style={styles.searchIcon} />
         </TouchableOpacity>
         </View>
      </View>
      <Text style={styles.title}>어떤 운동을 찾으시나요?</Text>
      <ScrollView>
         <View style={styles.iconContainer}>
          {gymItems.map((item, index) => (
            <TouchableOpacity 
            onPress={() => navigation.navigate('Pg_Detail')}
            style={styles.itemCard} key={index}>
              <View style={styles.itemContent}>
                {item.icon && <Image source={item.icon} style={styles.gymIcon} />}
                <View style={styles.textContainer}>
                  <Text style={styles.gymNameText}>{item.name}</Text>
                  <Text style={styles.wishlistText}>찜 0개</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        </ScrollView>
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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
  },
  searchIcon: {
    width: 30,
    height: 24,
  },
  searchInput: {
    flex: 1, 
    paddingVertical: 15, 
    fontSize: 18,
  },
  searchButton: {
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 30,
    color: '#333',
  },
  iconContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  itemCard: {
  width: '100%', 
  marginBottom: 20,
  backgroundColor: '#fff',
  borderRadius: 15,
  padding: 15,
  // 그림자 강조
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 5, // Android용 그림자
  borderWidth: 1,
  borderColor: '#eee', // 카드 경계 강조
},

  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gymIcon: {
    width: 110,
    height: 80,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 50,
  },
  gymNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  wishlistText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 8,
  },
});