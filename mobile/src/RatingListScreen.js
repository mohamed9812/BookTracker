import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function RatingListScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const storedBooks = await AsyncStorage.getItem('books');
      const parsedBooks = storedBooks ? JSON.parse(storedBooks) : [];
      setBooks(parsedBooks);
    } catch (error) {
      console.error('Fehler beim Abrufen der Bücher:', error);
    }
  };

  // Daten aktualisieren, wenn der Bildschirm in den Fokus kommt
  useFocusEffect(
    React.useCallback(() => {
      fetchBooks();
    }, [])
  );

  const openRateBookScreen = (book) => {
    navigation.navigate('RateBookScreen', { book });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bewertbare Bücher</Text>
      {books.length === 0 ? (
        <Text style={styles.noBooksText}>Keine Bücher verfügbar.</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookItem}
              onPress={() => openRateBookScreen(item)}
            >
              <Text style={styles.bookName}>{item.title || 'Kein Titel'}</Text>
              {item.rating && (
                <Text style={styles.bookRating}>
                  Bewertung: {item.rating}/5
                </Text>
              )}
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
    backgroundColor: '#D8C3FC',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noBooksText: {
    fontSize: 16,
    color: '#555',
  },
  bookItem: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  bookName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookRating: {
    fontSize: 16,
    color: '#6A5ACD',
    marginTop: 5,
  },
});