import React, { useMemo, useState } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../../Menu/Header";
import Tab from "../../Menu/Bottom_Tab";
import { useNavigation } from "@react-navigation/native";
import programs from "../../assets/programs-sample.json";

const facilityIcons = {
  체육관: require("../../assets/gym.png"),
  수영장: require("../../assets/swim.png"),
  테니스장: require("../../assets/tennis.png"),
  간이운동장: require("../../assets/futsal.png"),
  축구장: require("../../assets/futsal.png"),
  골프연습장: require("../../assets/basketball.png"),
  빙상장: require("../../assets/table-tennis.png"),
  기타시설: require("../../assets/pilates.png"),
  "기타체육시설(체력단련장)": require("../../assets/gym.png"),
  야구장: require("../../assets/basketball.png"),
};

const defaultIcon = require("../../assets/gym.png");
const allIcon = require("../../assets/home.png");

const formatDate = (value) => {
  if (!value) return "";
  const digits = `${value}`.replace(/[^0-9]/g, "");
  if (digits.length === 8) {
    return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6, 8)}`;
  }
  return value;
};

const formatDateRange = (start, end) => {
  const startText = formatDate(start);
  const endText = formatDate(end);
  if (startText && endText) return `${startText} ~ ${endText}`;
  return startText || endText || "기간 미정";
};

const formatPrice = (price) => {
  if (price === null || typeof price === "undefined" || price === "") {
    return "가격 미정";
  }
  const num = Number(price);
  if (Number.isFinite(num)) {
    if (num === 0) return "무료";
    return `${num.toLocaleString()}원`;
  }
  return price;
};

export default function Home() {
  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const [selectedType, setSelectedType] = useState("전체");

  const borderColor = address ? "#000" : "#ccc";

  const categories = useMemo(() => {
    const counts = programs.reduce((acc, cur) => {
      const type = cur.facilityType || "기타";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const sorted = Object.entries(counts)
      .map(([type, count]) => ({
        type,
        count,
        icon: facilityIcons[type] || defaultIcon,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    return [{ type: "전체", count: programs.length, icon: allIcon }, ...sorted];
  }, []);

  const filteredPrograms = useMemo(() => {
    const keyword = address.trim().toLowerCase();

    return programs
      .filter((program) => {
        if (selectedType !== "전체" && program.facilityType !== selectedType) {
          return false;
        }

        if (!keyword) return true;

        return [program.address, program.facilityName, program.programName, program.sigungu, program.sido].some(
          (value) => value && value.toLowerCase().includes(keyword)
        );
      })
      .slice(0, 50);
  }, [address, selectedType]);

  const deleteAddress = () => setAddress("");

  const handlePressProgram = (program) => navigation.navigate("Pg_Detail", { program });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <Header />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={[styles.searchContainer, { borderColor }]}>
            <TextInput
              value={address}
              onChangeText={setAddress}
              style={styles.searchInput}
              placeholder="주소, 장소, 프로그램을 검색하세요"
              placeholderTextColor="#999"
            />
            <View style={styles.searchButton}>
              <TouchableOpacity onPress={deleteAddress} style={styles.clearButton}>
                <Text style={[styles.clearText, { color: borderColor }]}>X</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require("../../assets/search.png")} style={styles.searchIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.title}>어떤 운동을 찾으세요?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
            {categories.map((item) => (
              <TouchableOpacity
                key={item.type}
                style={[styles.categoryCard, selectedType === item.type && styles.categoryCardActive]}
                onPress={() => setSelectedType(item.type)}
              >
                <Image source={item.icon} style={styles.categoryIcon} />
                <View>
                  <Text style={styles.categoryName}>{item.type}</Text>
                  <Text style={styles.categoryCount}>{item.count.toLocaleString()}개</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.listHeader}>
            <View>
              <Text style={styles.subtitle}>공공체육 프로그램</Text>
              <Text style={styles.resultHint}>
                {selectedType} · {filteredPrograms.length}개 노출
              </Text>
            </View>
            <Text style={styles.resultCount}>{programs.length}건 데이터</Text>
          </View>

          {filteredPrograms.length === 0 ? (
            <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
          ) : (
            filteredPrograms.map((item, index) => (
              <TouchableOpacity
                key={`${item.programName}-${item.facilityName}-${index}`}
                onPress={() => handlePressProgram(item)}
                style={styles.itemCard}
              >
                <View style={styles.itemHeader}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.facilityType || "기타"}</Text>
                  </View>
                  <Text style={styles.programType}>{item.programType || "프로그램"}</Text>
                </View>
                <Text style={styles.programName}>{item.programName}</Text>
                <Text style={styles.facility}>{item.facilityName}</Text>
                <Text style={styles.meta}>{item.address}</Text>
                <Text style={styles.meta}>
                  {formatDateRange(item.startDate, item.endDate)} · {item.days || "요일 미정"} ·{" "}
                  {item.time || "시간 미정"}
                </Text>
                <View style={styles.itemFooter}>
                  <Text style={styles.target}>{item.target || "대상 정보 없음"}</Text>
                  <Text style={styles.price}>{formatPrice(item.price)}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
        <Tab />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f6f8fb",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 120,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    marginTop: 12,
  },
  searchIcon: {
    width: 26,
    height: 26,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  clearButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  clearText: {
    fontSize: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 12,
    color: "#333",
  },
  categoryRow: {
    paddingBottom: 12,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 14,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  categoryCardActive: {
    borderColor: "#2596be",
    backgroundColor: "#e8f5fb",
  },
  categoryIcon: {
    width: 44,
    height: 32,
    marginRight: 10,
    resizeMode: "contain",
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  categoryCount: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c3e50",
  },
  resultHint: {
    fontSize: 13,
    color: "#7f8c8d",
    marginTop: 4,
  },
  resultCount: {
    fontSize: 13,
    color: "#7f8c8d",
  },
  itemCard: {
    width: "100%",
    marginBottom: 18,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#eef0f2",
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  badge: {
    backgroundColor: "#e8f5fb",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 13,
    color: "#1f7aa7",
    fontWeight: "700",
  },
  programType: {
    fontSize: 13,
    color: "#5c6b73",
  },
  programName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1b263b",
    marginBottom: 4,
  },
  facility: {
    fontSize: 15,
    color: "#2c3e50",
    marginBottom: 6,
  },
  meta: {
    fontSize: 13,
    color: "#7f8c8d",
    marginBottom: 4,
  },
  itemFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  target: {
    fontSize: 13,
    color: "#455a64",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e67e22",
  },
  emptyText: {
    fontSize: 15,
    color: "#7f8c8d",
    textAlign: "center",
    marginTop: 20,
  },
});
