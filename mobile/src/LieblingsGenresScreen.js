import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LieblingsGenresScreen() {
  const genres = [
    'Romanze',
    'Krimi',
    'Thriller',
    'Fantasy',
    'Science-Fiction',
    'Horror',
    'Abenteuer',
    'Action',
    'Politik',
    'Geschichte',
    'Philosophie',
    'Biografie',
    'Kinderbücher',
    'Reisen',
    'Kochen',
    'Wissenschaft',
    
  ];

  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    // Lade die gespeicherten Genres aus AsyncStorage
    const loadGenres = async () => {
      try {
        const storedGenres = await AsyncStorage.getItem('favoriteGenres');
        if (storedGenres) {
          setSelectedGenres(JSON.parse(storedGenres));
        }
      } catch (error) {
        console.error('Fehler beim Laden der Genres:', error);
      }
    };

    loadGenres();
  }, []);

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((item) => item !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('favoriteGenres', JSON.stringify(selectedGenres));
      Alert.alert('Gespeichert', `Deine Lieblingsgenres: ${selectedGenres.join(', ')}`);
    } catch (error) {
      console.error('Fehler beim Speichern der Genres:', error);
      Alert.alert('Fehler', 'Die Genres konnten nicht gespeichert werden.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lieblingsgenre</Text>
      <Text style={styles.subtitle}>Bitte wähle deine Lieblings-Genres aus:</Text>
      <View style={styles.genreContainer}>
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre}
            style={[
              styles.genreButton,
              selectedGenres.includes(genre) && styles.selectedButton,
            ]}
            onPress={() => toggleGenre(genre)}
          >
            <Text
              style={[
                styles.genreText,
                selectedGenres.includes(genre) && styles.selectedText,
              ]}
            >
              {genre}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Speichern</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8C3FC',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    elevation: 2,
  },
  selectedButton: {
    backgroundColor: '#6A5ACD',
  },
  genreText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    color: '#FFF',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#6A5ACD',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});