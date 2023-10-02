import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import fetchNutritionData from "./api";

const HomePage = () => {
  const [searchText, setSearchText] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowNutrition = () => {
    fetchNutritionData(searchText)
      .then((data) => {
        const selectedNutrition = data[0]; // Ambil data pertama dari hasil API (sesuaikan dengan respon API sebenarnya)
        const foodDetails = {
          name: searchText,
          nutrition: selectedNutrition || {
            karbohidrat: "Data tidak tersedia",
            lemak: "Data tidak tersedia",
            protein: "Data tidak tersedia",
            imageUrl: "URL_GAMBAR_DEFAULT",
          },
        };
        console.log("Food Details:", foodDetails);
        setSelectedItem(foodDetails);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Masukkan kata..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <Button
          title="Simpan"
          onPress={() => setSearchHistory([...searchHistory, searchText])}
        />
      </View>
      <FlatList
        data={searchHistory}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.searchItem}>{item}</Text>
            <TouchableOpacity
              onPress={() => {
                setSearchText(item);
                handleShowNutrition();
              }}
            >
              {/* <Text style={styles.showNutrition}>Show Nutrition >></Text> */}
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {selectedItem && (
        <View style={styles.nutritionContainer}>
          <Image
            source={{ uri: selectedItem.nutrition.imageUrl }}
            style={styles.image}
          />
          <Text style={styles.nutritionLabel}>
            Karbohidrat: {selectedItem.nutrition.karbohidrat}
          </Text>
          <Text style={styles.nutritionLabel}>
            Lemak: {selectedItem.nutrition.lemak}
          </Text>
          <Text style={styles.nutritionLabel}>
            Protein: {selectedItem.nutrition.protein}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
  },
  searchContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  input: {
    flex: 1,
    marginRight: 20,
    borderWidth: 1,
    padding: 8,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchItem: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  showNutrition: {
    color: "blue",
  },
  nutritionContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  nutritionLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
});

export default HomePage;
