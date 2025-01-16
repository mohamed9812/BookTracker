import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookRecommendationScreen() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteGenres, setFavoriteGenres] = useState([]);

  // Lieblingsgenres abrufen
  const fetchFavoriteGenres = async () => {
    try {
      const genres = await AsyncStorage.getItem("favoriteGenres");
      return genres ? JSON.parse(genres) : [];
    } catch (error) {
      console.error("Fehler beim Abrufen der Lieblingsgenres:", error);
      return [];
    }
  };

  // Bücher abrufen basierend auf Lieblingsgenres
  const fetchBooks = async (genres) => {
    if (genres.length === 0) {
      setBooks([]);
      setLoading(false);
      return;
    }

    try {
      // Abfrage für das erste Lieblingsgenre (kann angepasst werden)
      const genre = genres[0].toLowerCase().replace(" ", "_");
      const response = await fetch(`https://openlibrary.org/subjects/${genre}.json`);
      if (!response.ok) {
        throw new Error("Fehler beim Abrufen der API");
      }
      const data = await response.json();
      setBooks(data.works || []);
    } catch (error) {
      console.error("Fehler beim Abrufen der Buchempfehlungen:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const genres = await fetchFavoriteGenres();
      setFavoriteGenres(genres);
      fetchBooks(genres);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6A5ACD" />
        <Text style={styles.loadingText}>Lade Buchempfehlungen...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empfohlene Bücher</Text>
      {books.length === 0 ? (
        <Text style={styles.noBooksText}>Keine Buchempfehlungen gefunden.</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              {item.authors && (
                <Text style={styles.bookAuthor}>
                  Autor: {item.authors.map((author) => author.name).join(", ")}
                </Text>
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
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D8C3FC",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  noBooksText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
  bookItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  bookAuthor: {
    fontSize: 16,
    color: "#555",
  },
});