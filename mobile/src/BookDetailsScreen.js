import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookDetailsScreen({ route, navigation }) {
  // Empfange fileUri aus den Parametern
  const { fileUri } = route.params;

  // Zustand für Buchdetails
  const [details, setDetails] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });

  // Prüfen, ob alle Felder ausgefüllt sind
  const allFieldsFilled = Object.values(details).every(
    (field) => field.trim() !== ""
  );

  // Funktion zum Navigieren und Details übergeben
  const handleFinish = async () => {
    if (allFieldsFilled) {
      const book = { ...details, uri: fileUri }; // Buchdetails und URI kombinieren
      try {
        const existingBooks = await AsyncStorage.getItem("books");
        const books = existingBooks ? JSON.parse(existingBooks) : [];
        books.push(book); // Neues Buch zur Liste hinzufügen
        await AsyncStorage.setItem("books", JSON.stringify(books)); // Speichern in AsyncStorage
        navigation.navigate("SuccessScreen", {
          titleText: "Buch erfolgreich hinzugefügt!",
        });
      } catch (error) {
        console.error("Fehler beim Speichern des Buches:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buch hinzufügen</Text>
      <Text style={styles.subtitle}>Bitte ergänze noch weitere Daten:</Text>

      {/* Eingabefelder */}
      <TextInput
        style={styles.input}
        placeholder="Titel"
        onChangeText={(text) => setDetails({ ...details, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor"
        onChangeText={(text) => setDetails({ ...details, author: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Genre"
        onChangeText={(text) => setDetails({ ...details, genre: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Erscheinungsjahr"
        keyboardType="numeric"
        onChangeText={(text) => setDetails({ ...details, year: text })}
      />

      {/* Button: Fertigstellen */}
      <TouchableOpacity
        style={[styles.nextButton, !allFieldsFilled && styles.disabledButton]}
        onPress={handleFinish}
        disabled={!allFieldsFilled}
      >
        <Text style={styles.nextButtonText}>Fertigstellen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8C3FC",
    padding: 16,
  },
  title: {
    fontSize: 36,
    color: "#000000",
    marginBottom: 40,
    fontWeight: "300",
    marginLeft: 15,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#555",
    marginLeft: 15,
  },
  input: {
    fontSize: 18,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 15,
    paddingLeft: "10%",
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#6C76CE",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    elevation: 5,
    marginTop: "40%",
    marginLeft: 50,
    marginRight: 50,
  },
  nextButtonText: { 
    fontSize: 16, 
    color: "#FFF", 
    fontWeight: "300",
    marginLeft: "24%",
  },
  disabledButton: { 
    backgroundColor: "#AAA",
  },
});
