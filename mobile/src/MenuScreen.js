import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MenuScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header mit Profil-Icon */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
      <TouchableOpacity 
          style={styles.profileIcon}
          onPress={() => navigation.navigate('Profile')} // Navigiert zum Profil-Screen
        >
          <Text style={styles.profileText}>👤</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.title}>Willkommen in MyBooks!</Text>
      </View>

      {/* Buttons im Menü */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('BookListScreen')} // Navigiert zur BookListScreen
      >
        <Text style={styles.buttonText}>Buch lesen</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UploadBookScreen')} // Navigiert zur UploadBookScreen
      >
        <Text style={styles.buttonText}>Buch hinzufügen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RatingListScreen')} // Navigiert zur RatingListScreen
      >
        <Text style={styles.buttonText}>Bewertung abgeben</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('NotificationScreen')} // Navigiert zur Lesezeitbenachrichtigung
      >
        <Text style={styles.buttonText}>Lesezeitbenachrichtigung</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>In der Nähe Erkunden</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Buchdetails ergänzen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E3FD',
    padding: 16,
  },
  header: {
    flexDirection: 'col',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20
  },
  profileIcon: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  profileText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    elevation: 2,
    marginLeft: 30,
    marginRight: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});