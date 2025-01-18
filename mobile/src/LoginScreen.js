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
import Svg, { Path } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URI}:4000/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("userId", data.user.id);
        await AsyncStorage.setItem("token", data.token);
        
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
      <View>
      <View style={styles.inputContainer}>
        <Svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={styles.icon}
        >
          <Path
            d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM5.07 16.28C5.5 15.38 8.12 14.5 10 14.5C11.88 14.5 14.51 15.38 14.93 16.28C13.57 17.36 11.86 18 10 18C8.14 18 6.43 17.36 5.07 16.28ZM16.36 14.83C14.93 13.09 11.46 12.5 10 12.5C8.54 12.5 5.07 13.09 3.64 14.83C2.62 13.49 2 11.82 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 11.82 17.38 13.49 16.36 14.83ZM10 4C8.06 4 6.5 5.56 6.5 7.5C6.5 9.44 8.06 11 10 11C11.94 11 13.5 9.44 13.5 7.5C13.5 5.56 11.94 4 10 4ZM10 9C9.17 9 8.5 8.33 8.5 7.5C8.5 6.67 9.17 6 10 6C10.83 6 11.5 6.67 11.5 7.5C11.5 8.33 10.83 9 10 9Z"
            fill="#AC9999"
          />
        </Svg>
        <TextInput
          style={styles.user}
          placeholder="Benutzer"
          value={username}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Svg
          width="16"
          height="21"
          viewBox="0 0 16 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM5 5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7H5V5ZM14 19H2V9H14V19ZM8 16C9.1 16 10 15.1 10 14C10 12.9 9.1 12 8 12C6.9 12 6 12.9 6 14C6 15.1 6.9 16 8 16Z"
            fill="#AC9999"
          />
        </Svg>

        <TextInput
          style={styles.password}
          placeholder="Passwort"
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
        />
      </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View>
      <Text style={styles.linkText}>
        Passwort vergessen? <Text style={styles.link}>Zurücksetzen</Text>
      </Text>
      <Text style={styles.linkText}>
        Noch keinen Account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Registrieren
        </Text>
      </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8C3FC",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    padding: 16,
  },
  title: {
    fontSize: 55,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 50,
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
  icon: {
    marginRight: 10,
  },
  user: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingLeft: 10,
  },
  password: {
    flex: 1, // TextInput nimmt den verbleibenden Platz ein
    fontSize: 16,
    color: "#000",
    paddingLeft: 25,
  },
  button: {
    backgroundColor: "#6C76CE",
    borderRadius: 20,
    width: "70%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "300",
  },
  linkText: {
    marginTop: 10,
    color: "#555",
    fontSize: 14,
  },
  link: {
    color: "#6C76CE",
    fontWeight: "300",
  },
});
