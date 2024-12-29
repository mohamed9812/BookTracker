import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function BookDetailsScreen({ route, navigation }) {
  // Empfange fileUri aus den Parametern
  const { fileUri } = route.params;

  // Zustand für Buchdetails
  const [details, setDetails] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
  });

  // Prüfen, ob alle Felder ausgefüllt sind
  const allFieldsFilled = Object.values(details).every((field) => field.trim() !== '');

  // Funktion zum Navigieren und Details übergeben
  const handleFinish = () => {
    if (allFieldsFilled) {
      navigation.navigate('SuccessScreen', { fileUri, ...details });
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
    backgroundColor: '#E3E3FD',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 16, marginVertical: 20, color: '#555' },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginVertical: 10,
  },
  nextButton: {
    backgroundColor: '#6A5ACD',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: { fontSize: 16, color: '#FFF' },
  disabledButton: { backgroundColor: '#AAA' },
});