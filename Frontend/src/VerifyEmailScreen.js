import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";

export default function VerifyEmailScreen({ route, navigation }) {
  const { token } = route.params;

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/auth/verify-email/${token}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        setStatus('error');
      }
    };

    verifyEmail();
  }, [token]);

  if (status === 'loading') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Verifizierung läuft...</Text>
      </View>
    );
  }

  if (status === 'success') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Deine E-Mail wurde erfolgreich verifiziert!</Text>
        <Button title="Zurück zum Login" onPress={() => navigation.navigate("Login")} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Fehler bei der Verifizierung. Bitte versuche es erneut.</Text>
      <Button title="Zurück zum Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
