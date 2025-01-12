import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookListScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const storedBooks = await AsyncStorage.getItem("books");
        const parsedBooks = storedBooks ? JSON.parse(storedBooks) : [];
        setBooks(parsedBooks);
      } catch (error) {
        console.error("Fehler beim Abrufen der Bücher:", error);
      }
    };

    fetchBooks();
  }, []);

  const deleteBook = async (book) => {
    const updatedBooks = books.filter((b) => b.uri !== book.uri);
    setBooks(updatedBooks);
    await AsyncStorage.setItem("books", JSON.stringify(updatedBooks));
    Alert.alert("Erfolg", "Das Buch wurde gelöscht.");
  };

  const renameBook = async () => {
    if (!newTitle.trim()) {
      Alert.alert("Fehler", "Der Titel darf nicht leer sein.");
      return;
    }
    const updatedBooks = books.map((b) =>
      b.uri === selectedBook.uri ? { ...b, title: newTitle } : b
    );
    setBooks(updatedBooks);
    await AsyncStorage.setItem("books", JSON.stringify(updatedBooks));
    setModalVisible(false);
    Alert.alert("Erfolg", "Der Titel wurde geändert.");
  };

  const openOptions = (book) => {
    setSelectedBook(book);
    setNewTitle(book.title || ""); // Den aktuellen Titel als Standard setzen
    setModalVisible(true);
  };

  const openReadBookScreen = (book) => {
    navigation.navigate("ReadBookScreen", { fileUri: book.uri, title: book.title || "Kein Titel" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bücherliste</Text>
      {books.length === 0 ? (
        <Text style={styles.noBooksText}>Keine Bücher verfügbar.</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookItem}
              onLongPress={() => openOptions(item)} // Lange drücken, um Optionen anzuzeigen
              onPress={() => openReadBookScreen(item)} // Klick, um zum ReadBookScreen zu gehen
            >
              <Text style={styles.bookName}>{item.title || "Kein Titel"}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Modal für Optionen */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Optionen</Text>

            {/* Eingabefeld für Umbenennen */}
            <TextInput
              style={styles.input}
              placeholder="Neuer Titel"
              value={newTitle}
              onChangeText={(text) => setNewTitle(text)}
            />

            <TouchableOpacity style={styles.modalButton} onPress={renameBook}>
              <Text style={styles.modalButtonText}>Umbenennen</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.deleteButton]}
              onPress={() => {
                setModalVisible(false);
                deleteBook(selectedBook);
              }}
            >
              <Text style={styles.modalButtonText}>Löschen</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Abbrechen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8C3FC",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  noBooksText: {
    fontSize: 16,
    color: "#555",
  },
  bookItem: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFF",
    marginBottom: 10,
  },
  bookName: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    width: "100%",
    padding: 10,
    marginBottom: 20,
  },
  modalButton: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#6A5ACD",
    alignItems: "center",
    marginVertical: 5,
  },
  deleteButton: {
    backgroundColor: "#FF6B6B",
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});