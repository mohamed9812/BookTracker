import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buch erfolgreich hinzugefügt!</Text>
      <Text style={styles.checkmark}>✅</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Menu")}
      >
        <Text style={styles.buttonText}>Hauptmenü</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3E3FD",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 20 },
  checkmark: { fontSize: 64, color: "#2ECC71", marginVertical: 20 },
  button: {
    backgroundColor: "#6A5ACD",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { fontSize: 16, color: "#FFF" },
});
