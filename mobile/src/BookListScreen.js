import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookListScreen({ navigation }) {
  const [books, setBooks] = useState([]);


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

  
  const openReadBookScreen = (book) => {
    navigation.navigate("ReadBookScreen", {
      fileUri: book.uri,
      title: book.title || "Kein Titel",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buch lesen</Text>
      <Text style={styles.subtitle}>Bitte wähle ein Buch aus:</Text>
      {books.length === 0 ? (
        <Text style={styles.noBooksText}>Noch keine Bücher hinzugefügt.</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookItem}
             
              onPress={() => openReadBookScreen(item)} // Klick, um zum ReadBookScreen zu gehen
            >
              <Text style={styles.bookName}>{item.title || "Kein Titel"}</Text>
            </TouchableOpacity>
          )}
        />
      )}

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
    fontSize: 55,
    color: "#000000",
    marginBottom: 40,
    fontWeight: "300",
    marginLeft: 15,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#555",
    marginLeft: 20,
  },
  noBooksText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 20,
  },
  bookItem: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFF",
    marginBottom: 10,
    marginLeft: 50,
    marginRight: 50,
  },
  bookName: {
    fontSize: 18,
    fontWeight: "300",
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