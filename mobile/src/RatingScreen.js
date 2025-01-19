import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function RatingListScreen() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const storedBooks = await AsyncStorage.getItem("books");
      const parsedBooks = storedBooks ? JSON.parse(storedBooks) : [];
      setBooks(parsedBooks);
    } catch (error) {
      console.error("Fehler beim Abrufen der Bücher:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBooks();
    }, [])
  );

  const renderStars = (rating) => {
    return (
      <Text>
        {Array.from({ length: 5 }, (_, i) => (i < rating ? "★" : "☆")).join("")}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bewertungen</Text>
      <Text style={styles.subtitle}>Liste der bewerteten Bücher:</Text>
      {books.length === 0 ? (
        <Text style={styles.noBooksText}>Keine Bücher verfügbar.</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Text style={styles.bookName}>{item.title || "Kein Titel"}</Text>
              {item.rating && (
                <Text style={styles.bookRating}>
                  Bewertung: {renderStars(item.rating)}
                </Text>
              )}
              {item.note && (
                <Text style={styles.bookNote}>Anmerkung: {item.note}</Text>
              )}
            </View>
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
    fontSize: 36,
    color: "#000000",
    marginBottom: 30,
    fontWeight: "300",
    marginLeft: 15,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "300",
    marginLeft: 20,
  },
  noBooksText: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "300",
    marginLeft: 20,
  },
  bookItem: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  bookName: {
    fontSize: 18,
    fontWeight: "300",
  },
  bookRating: {
    fontSize: 16,
    color: "#6A5ACD",
    marginTop: 5,
  },
  bookNote: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
    fontStyle: "italic",
  },
});