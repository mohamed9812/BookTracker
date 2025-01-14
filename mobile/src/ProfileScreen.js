import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";

export default function ProfileScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [genresModalVisible, setGenresModalVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const response = await fetch(
            `${process.env.EXPO_PUBLIC_BASE_URI}:4000/api/user/${userId}`
          );
          const data = await response.json();
          if (response.ok) {
            setUserName(data.username);
          } else {
            console.error("Fehler beim Abrufen des Nutzernamens");
          }
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der userId", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  const calculateFavoriteGenres = async () => {
    try {
      const storedBooks = await AsyncStorage.getItem("books");
      const books = storedBooks ? JSON.parse(storedBooks) : [];
      const genreCount = {};

      books.forEach((book) => {
        if (book.genre) {
          genreCount[book.genre] = (genreCount[book.genre] || 0) + 1;
        }
      });

      const sortedGenres = Object.entries(genreCount).sort((a, b) => b[1] - a[1]);
      setFavoriteGenres(sortedGenres.map(([genre, count]) => ({ genre, count })));
      setGenresModalVisible(true);
    } catch (error) {
      console.error("Fehler beim Abrufen der Genres", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Lade...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Buchempfehlungen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={calculateFavoriteGenres}
      >
        <Text style={styles.buttonText}>Lieblingsgenres</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Modal für Logout-Bestätigung */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Als {userName} abmelden?</Text>

            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.confirmText}>Abmelden</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Abbrechen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal für Lieblingsgenres */}
      <Modal
        transparent={true}
        visible={genresModalVisible}
        animationType="slide"
        onRequestClose={() => setGenresModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Lieblingsgenres</Text>
            {favoriteGenres.length > 0 ? (
              <FlatList
                data={favoriteGenres}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Text style={styles.genreText}>
                    {item.genre}: {item.count} 
                  </Text>
                )}
              />
            ) : (
              <Text style={styles.noGenresText}>Keine Genres gefunden.</Text>
            )}

            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setGenresModalVisible(false)}
            >
              <Text style={styles.cancelText}>Schließen</Text>
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
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#FF6B6B",
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#E3E3FD",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  genreText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  noGenresText: {
    fontSize: 16,
    color: "#555",
  },
  modalButton: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#FF6B6B",
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#333",
  },
  confirmText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  cancelText: {
    color: "#333",
    fontWeight: "bold",
  },
});