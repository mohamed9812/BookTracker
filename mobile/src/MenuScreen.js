import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MenuScreen({ navigation }) {
  const [userName, setUserName] = useState("");
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
    <SafeAreaView style={styles.container}>
      {/* Header mit Profil-Icon */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Svg
              width="47"
              height="47"
              viewBox="0 0 47 47"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M23.5 0.583374C10.85 0.583374 0.583328 10.85 0.583328 23.5C0.583328 36.15 10.85 46.4167 23.5 46.4167C36.15 46.4167 46.4167 36.15 46.4167 23.5C46.4167 10.85 36.15 0.583374 23.5 0.583374ZM12.2021 37.8917C13.1875 35.8292 19.1917 33.8125 23.5 33.8125C27.8083 33.8125 33.8354 35.8292 34.7979 37.8917C31.6812 40.3667 27.7625 41.8334 23.5 41.8334C19.2375 41.8334 15.3187 40.3667 12.2021 37.8917ZM38.075 34.5688C34.7979 30.5813 26.8458 29.2292 23.5 29.2292C20.1542 29.2292 12.2021 30.5813 8.92499 34.5688C6.58749 31.498 5.16666 27.6709 5.16666 23.5C5.16666 13.3938 13.3937 5.16671 23.5 5.16671C33.6062 5.16671 41.8333 13.3938 41.8333 23.5C41.8333 27.6709 40.4125 31.498 38.075 34.5688ZM23.5 9.75004C19.0542 9.75004 15.4792 13.325 15.4792 17.7709C15.4792 22.2167 19.0542 25.7917 23.5 25.7917C27.9458 25.7917 31.5208 22.2167 31.5208 17.7709C31.5208 13.325 27.9458 9.75004 23.5 9.75004ZM23.5 21.2084C21.5979 21.2084 20.0625 19.673 20.0625 17.7709C20.0625 15.8688 21.5979 14.3334 23.5 14.3334C25.4021 14.3334 26.9375 15.8688 26.9375 17.7709C26.9375 19.673 25.4021 21.2084 23.5 21.2084Z"
                fill="#323232"
              />
            </Svg>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Willkommen zurück,</Text>
        <Text style={styles.title}>{userName}!</Text>
      </View>

      {/* Buttons im Menü */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BookListScreen")}
      >
        <Text style={styles.buttonText}>Buch lesen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("UploadBookScreen")}
      >
        <Text style={styles.buttonText}>Buch hinzufügen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("RatingListScreen")}
      >
        <Text style={styles.buttonText}>Bewertung abgeben</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NotificationScreen")}
      >
        <Text style={styles.buttonText}>Lesezeitbenachrichtigung</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NearbyLibrariesScreen")}
      >
        <Text style={styles.buttonText}>In der Nähe Erkunden</Text>
      </TouchableOpacity>

     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8C3FC",
    padding: 16,
  },
  header: {
    flexDirection: "col",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  profileContainer: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  profileText: {
    fontSize: 18,
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
    textAlign: "center",
  },
});
