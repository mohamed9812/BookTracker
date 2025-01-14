import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function UploadBookScreen({ navigation }) {
  const [fileUri, setFileUri] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      console.log("DocumentPicker Result:", result);

      if (!result.canceled && result.assets) {
        const { uri } = result.assets[0];
        setFileUri(uri);
        console.log("Datei-URI gespeichert:", uri);
      }
    } catch (error) {
      console.error("Fehler beim Auswählen der Datei:", error);
    }
  };

  const goToNextScreen = () => {
    if (fileUri) {
      navigation.navigate("BookDetailsScreen", { fileUri });
    } else {
      alert("Bitte wähle zuerst eine Datei aus.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buch hinzufügen</Text>
      <Text style={styles.subtitle}>Bitte wähle eine Datei aus:</Text>

      <TouchableOpacity
        style={[styles.uploadButton, fileUri && styles.disabledButton]}
        onPress={pickDocument}
        disabled={!!fileUri} // Deaktiviert den Button, wenn eine Datei ausgewählt wurde
      >
        <Text style={styles.uploadButtonText}>
          {fileUri ? "Datei ausgewählt" : "Datei Auswählen"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={goToNextScreen}>
        <Text style={styles.nextButtonText}>Nächster Schritt</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8C3FC",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },
  uploadButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#6A5ACD",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  disabledButton: {
    backgroundColor: "#E0E0E0", // Visuell anders, wenn deaktiviert
    borderColor: "#CCC",
    shadowOpacity: 0, // Keine Schatten für deaktivierten Button
  },
  uploadButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#6A5ACD",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    elevation: 5,
  },
  nextButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});