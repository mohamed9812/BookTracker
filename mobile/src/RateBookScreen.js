
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RateBookScreen({ route, navigation }) {
  const { book } = route.params;
  const [selectedRating, setSelectedRating] = useState(null);
  const [note, setNote] = useState("");

  const handleSave = async () => {
    try {
      const storedBooks = await AsyncStorage.getItem("books");
      const books = storedBooks ? JSON.parse(storedBooks) : [];
      const updatedBooks = books.map((b) =>
        b.uri === book.uri ? { ...b, rating: selectedRating, note } : b
      );
      await AsyncStorage.setItem("books", JSON.stringify(updatedBooks));

      navigation.navigate("SuccessScreen2", {
        titleText: "Bewertung erfolgreich gegeben",
      });
    } catch (error) {
      console.error("Fehler beim Speichern der Bewertung:", error);
    }
  };

  const isSaveEnabled = selectedRating !== null ;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bewertung abgeben</Text>
      <Text style={styles.title}>{book.title || "Kein Titel"}</Text>
      <Text style={styles.subtitle}>Bewerten:</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <TouchableOpacity
            key={rating}
            style={styles.starButton}
            onPress={() => setSelectedRating(rating)}
          >
            <Text
              style={[
                styles.star,
                selectedRating >= rating && styles.selectedStar,
              ]}
            >
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.noteLabel}>Anmerkung (max. 100 Zeichen):</Text>
      <TextInput
        style={styles.noteInput}
        value={note}
        onChangeText={(text) => setNote(text)}
        maxLength={100}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity
        style={[styles.nextButton, !isSaveEnabled && styles.disabledButton]}
        onPress={handleSave}
        disabled={!isSaveEnabled}
      >
        <Text style={styles.nextButtonText}>Absenden</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8C3FC",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    color: "#000000",
    marginBottom: 40,
    fontWeight: "300",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  starButton: {
    paddingHorizontal: 5,
  },
  star: {
    fontSize: 40,
    color: "#FFFFFF",
  },
  selectedStar: {
    color: "#FFD700",
  },
  noteLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    width: "70%",
    backgroundColor: "#FFF",
    paddingBottom: "70%",
  },
  nextButton: {
    marginTop: 30,
    backgroundColor: "#6C76CE",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: "#AAA",
  },
  nextButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "300",
  },
});
