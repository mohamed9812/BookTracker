import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RateBookScreen({ route, navigation }) {
  const { book } = route.params;
  const [selectedRating, setSelectedRating] = useState(null);

  const handleRating = async (rating) => {
    setSelectedRating(rating);
    try {
      const storedBooks = await AsyncStorage.getItem('books');
      const books = storedBooks ? JSON.parse(storedBooks) : [];
      const updatedBooks = books.map((b) =>
        b.uri === book.uri ? { ...b, rating } : b
      );
      await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
      Alert.alert('Erfolg', `Das Buch wurde mit ${rating} bewertet.`);
      navigation.goBack(); // Gehe zurück zur Bewertungsliste
    } catch (error) {
      console.error('Fehler beim Speichern der Bewertung:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title || 'Kein Titel'}</Text>
      <Text style={styles.subtitle}>Bitte wähle eine Bewertung:</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <TouchableOpacity
            key={rating}
            style={[
              styles.ratingButton,
              selectedRating === rating && styles.selectedButton,
            ]}
            onPress={() => handleRating(rating)}
          >
            <Text style={styles.ratingText}>{rating}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E3FD',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ratingButton: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 5,
    padding: 15,
    elevation: 5,
  },
  selectedButton: {
    backgroundColor: '#FFD700',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});