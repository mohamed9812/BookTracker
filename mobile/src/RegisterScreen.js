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

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Überprüfen, ob alle Felder ausgefüllt sind
  const isFormValid = username && email && password && confirmPassword;

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Fehler", "Passwörter stimmen nicht überein");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URI}:4000/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigation.navigate("Login");
      } else {
        Alert.alert("Registrierung fehlgeschlagen");
      }
    } catch (err) {
      Alert.alert(
        "Es gab ein Problem mit der Registrierung. Bitte versuche es später erneut."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Registrieren</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Benutzername"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="E-Mail Adresse"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="Passwort"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="Passwort bestätigen"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Registrieren Button */}
      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Registrieren</Text>
      </TouchableOpacity>

      <Text style={styles.linkText}>
        Bereits einen Account?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Login
        </Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#D8C3FC",
    padding: 16,
  },
  title: {
    fontSize: 55,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 70,
    marginTop: 20,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 20,
    width: "70%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    paddingHorizontal: 16,
    height: 50,
  },
  button: {
    backgroundColor: "#6C76CE",
    borderRadius: 20,
    width: "70%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  buttonDisabled: {
    backgroundColor: "#B0B0B0",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "300",
  },
  linkText: {
    marginTop: 20,
    color: "#555",
  },
  link: {
    color: "#6C76CE",
    fontWeight: "300",
  },
});
