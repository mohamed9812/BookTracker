import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";

export default function UploadBookScreen({ navigation }) {
  const [fileUri, setFileUri] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });


      if (!result.canceled && result.assets) {
        const { uri } = result.assets[0];
        setFileUri(uri);
      }
    } catch (error) {
      console.error("Fehler beim auswählen der Datei:", error);
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
        disabled={!!fileUri}
      >
        <Text style={styles.uploadButtonText}>
          {fileUri ? "Datei ausgewählt" : "Datei auswählen"}
        </Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.file}>Datei: {fileUri?.split("/").pop()}</Text>
      </View>

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
    padding: 20,
  },
  title: {
    fontSize: 36,
    color: "#000000",
    marginBottom: 40,
    fontWeight: "300",
    marginLeft: 15,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#555",
    marginLeft: 15,
  },
  file: {
    marginLeft: 30,
    marginRight: 30,
  },
  uploadButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#6A5ACD",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginLeft: 30,
    marginRight: 30,
  },
  disabledButton: {
    backgroundColor: "#A8E6CF",
    borderColor: "#94D7B8",
    shadowOpacity: 0,
  },

  uploadButtonText: {
    fontSize: 18,
    color: "#333",
    marginLeft: "23%",
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#6C76CE",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    elevation: 5,
    marginTop: "80%",
    marginLeft: 50,
    marginRight: 50,
  },
  nextButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: "16%",
    fontWeight: "300",
  },
});
