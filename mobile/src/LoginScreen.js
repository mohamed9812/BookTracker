import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState(""); // Speichert den Benutzernamen
  const [password, setPassword] = useState(""); // Speichert das Passwort

  const handleLogin = async () => {



    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URI}:4000/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });



      const data = await response.json();



      if (response.ok) {
        navigation.navigate("Menu");
      } else {
        Alert.alert("Fehler", "Login fehlgeschlagen");
      }
    } catch (err) {
      Alert.alert(
        "Fehler",
        "Es gab ein Problem mit dem Login. Bitte versuche es später erneut."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Benutzer"
          value={username} // Eingabe mit dem Zustand verbinden
          onChangeText={(text) => setUsername(text)} // Benutzername aktualisieren
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Passwort"
          secureTextEntry
          value={password} // Eingabe mit dem Zustand verbinden
          onChangeText={(text) => setPassword(text)} // Passwort aktualisieren
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.linkText}>
        Passwort vergessen? <Text style={styles.link}>Zurücksetzen</Text>
      </Text>
      <Text style={styles.linkText}>
        Noch keinen Account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")} // Navigiere zu RegisterScreen
        >
          Registrieren
        </Text>
      </Text>
    </SafeAreaView>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 40,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    marginBottom: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#6A5ACD",
    borderRadius: 30,
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 10,
    color: "#555",
    fontSize: 14,
  },
  link: {
    color: "#6A5ACD",
    fontWeight: "bold",
  },
});
