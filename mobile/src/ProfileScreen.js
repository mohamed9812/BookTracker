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

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BookRecommendationScreen")}
      >
        <Text style={styles.buttonText}>Buchempfehlungen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LieblingsGenresScreen")}
      >
        <Text style={styles.buttonText}>Liebliengs Generes</Text>
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
              onPress={async () => {
                await AsyncStorage.removeItem("userId");
                await AsyncStorage.removeItem("token");

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8C3FC",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    color: "#000000",
    fontWeight: "300",
    marginLeft: 15,
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginVertical: 10,
    elevation: 2,
    marginLeft: 40,
    marginRight: 40,
  },
  buttonText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "300",
    marginLeft: "18%",
  },
  logoutButton: {
    marginTop: "90%",
    backgroundColor: "#FF6B6B",
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: "39%",
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
