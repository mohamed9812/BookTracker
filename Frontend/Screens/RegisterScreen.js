import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Überprüfen, ob alle Felder ausgefüllt sind
  const isFormValid = username && email && password && confirmPassword;

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Fehler', 'Passwörter stimmen nicht überein');
    } else {
      // Wenn alles korrekt ist, navigiere zum LoginScreen
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Registrieren</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Benutzername"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="E-Mail Adresse"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Passwort"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Passwort bestätigen"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Registrieren Button */}
      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.buttonDisabled]} // Ändere den Stil, wenn Button deaktiviert ist
        onPress={handleRegister}
        disabled={!isFormValid} // Deaktiviere den Button, wenn Felder leer sind
      >
        <Text style={styles.buttonText}>Registrieren</Text>
      </TouchableOpacity>

      <Text style={styles.linkText}>
        Bereits ein Account?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3E3FD',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#6A5ACD',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#B0B0B0', // Grauer Hintergrund für deaktivierten Button
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 20,
    color: '#555',
  },
  link: {
    color: '#6A5ACD',
    fontWeight: 'bold',
  },
});