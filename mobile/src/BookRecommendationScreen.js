import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookRecommendationScreen() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteGenres, setFavoriteGenres] = useState([]);


  const fetchFavoriteGenres = async () => {
    const userId = await AsyncStorage.getItem("userId");
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URI}:4000/api/user/get-user-genres/${userId}`);
      
      if (!response.ok) {
        throw new Error("Fehler beim Abrufen der Genres");
      }
  
      const data = await response.json();
      return data.genres || [];
    } catch (error) {
      console.error("Fehler beim Abrufen der Lieblingsgenres:", error);
      return [];
    }
  };


  const fetchBooks = async (genres) => {
    if (genres.length === 0) {
      setBooks([]);
      setLoading(false);
      return;
    }
  
    try {

      const bookRequests = genres.map(async (genre) => {
        const genreFormatted = genre.toLowerCase().replace(" ", "_");
        const response = await fetch(`https://openlibrary.org/subjects/${genreFormatted}.json`);
        if (!response.ok) {
          throw new Error(`Fehler beim Abrufen der Bücher für ${genre}`);
        }
        return response.json();
      });
  
      const bookResponses = await Promise.all(bookRequests);
      const allBooks = bookResponses.flatMap((data) => data.works || []);
  
      setBooks(allBooks);
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