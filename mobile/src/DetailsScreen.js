import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookListScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newYear, setNewYear] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

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

  const saveChanges = async () => {
    if (!newTitle.trim()) {
      Alert.alert("Fehler", "Der Titel darf nicht leer sein.");
      return;
    }
    const updatedBooks = books.map((b) =>
      b.uri === selectedBook.uri
        ? { ...b, title: newTitle, author: newAuthor, genre: newGenre, year: newYear }
        : b
    );
    setBooks(updatedBooks);
    await AsyncStorage.setItem("books", JSON.stringify(updatedBooks));
    setModalVisible(false);
    Alert.alert("Erfolg", "Die Änderungen wurden gespeichert.");
  };

  const openOptions = (book) => {
    setSelectedBook(book);
    setNewTitle(book.title || "");
    setNewAuthor(book.author || "");
    setNewGenre(book.genre || "");
    setNewYear(book.year || "");
    setHasChanges(false);
    setModalVisible(true);
  };

  const handleInputChange = (field, value) => {
    if (field === "title") setNewTitle(value);
    else if (field === "author") setNewAuthor(value);
    else if (field === "genre") setNewGenre(value);
    else if (field === "year") setNewYear(value);

    setHasChanges(
      value !==
        (field === "title"
          ? selectedBook.title
          : field === "author"
          ? selectedBook.author
          : field === "genre"
          ? selectedBook.genre
          : selectedBook.year)
    );
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buchdetails ergänzen</Text>
      <Text style={styles.subtitle}>Bitte wähle ein Buch aus:</Text>
      {books.length === 0 ? (
        <Text style={styles.noBooksText}>Keine Bücher verfügbar.</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookItem}
             
              onPress={() => openOptions(item)}
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
            <Text style={styles.modalTitle}>Buchdetails</Text>

            {/* Eingabefelder für Buchdetails mit Überschriften */}
            <Text style={styles.inputLabel}>Titel:</Text>
            <TextInput
              style={styles.input}
              placeholder="Neuer Titel"
              value={newTitle}
              onChangeText={(text) => handleInputChange("title", text)}
            />
            <Text style={styles.inputLabel}>Autor:</Text>
            <TextInput
              style={styles.input}
              placeholder="Autor"
              value={newAuthor}
              onChangeText={(text) => handleInputChange("author", text)}
            />
            <Text style={styles.inputLabel}>Genre:</Text>
            <TextInput
              style={styles.input}
              placeholder="Genre"
              value={newGenre}
              onChangeText={(text) => handleInputChange("genre", text)}
            />
            <Text style={styles.inputLabel}>Erscheinungsjahr:</Text>
            <TextInput
              style={styles.input}
              placeholder="Erscheinungsjahr"
              value={newYear}
              onChangeText={(text) => handleInputChange("year", text)}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={[styles.modalButton, !hasChanges && styles.disabledButton]}
              onPress={saveChanges}
              disabled={!hasChanges}
            >
              <Text style={styles.modalButtonText}>Speichern</Text>
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
    fontSize: 36,
    color: "#000000",
    fontWeight: "300",
    marginLeft: 15,
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "300",
    marginLeft: 15,
  },
  noBooksText: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "300",
    marginLeft: 15,
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
  inputLabel: {
    alignSelf: "flex-start",
    fontSize: 16,
    marginBottom: 5,
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
  disabledButton: {
    backgroundColor: "#CCC",
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});