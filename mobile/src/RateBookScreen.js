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

  const handleRating = async (rating) => {
    if (!note.trim()) {
      Alert.alert("Fehler", "Bitte füge eine Anmerkung hinzu.");
      return;
    }
    if (note.length > 50) {
      Alert.alert("Fehler", "Die Anmerkung darf maximal 50 Zeichen lang sein.");
      return;
    }

    setSelectedRating(rating);
    try {
      const storedBooks = await AsyncStorage.getItem("books");
      const books = storedBooks ? JSON.parse(storedBooks) : [];
      const updatedBooks = books.map((b) =>
        b.uri === book.uri ? { ...b, rating, note } : b
      );
      await AsyncStorage.setItem("books", JSON.stringify(updatedBooks));
      Alert.alert("Erfolg", `Das Buch wurde mit ${rating} bewertet.`);
      navigation.goBack();
    } catch (error) {
      console.error("Fehler beim Speichern der Bewertung:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title || "Kein Titel"}</Text>
      <Text style={styles.subtitle}>Bitte wähle eine Bewertung:</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <TouchableOpacity
            key={rating}
            style={styles.starButton}
            onPress={() => handleRating(rating)}
          >
            <Text style={[styles.star, selectedRating >= rating && styles.selectedStar]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.noteLabel}>Anmerkung (max. 50 Zeichen):</Text>
      <TextInput
        style={styles.noteInput}
        placeholder="Füge eine Anmerkung hinzu..."
        value={note}
        onChangeText={(text) => setNote(text)}
        maxLength={50}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3E3FD",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
    color: "#CCC",
  },
  selectedStar: {
    color: "#FFD700", // Gold für ausgewählte Sterne
  },
  noteLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    backgroundColor: "#FFF",
  },
});