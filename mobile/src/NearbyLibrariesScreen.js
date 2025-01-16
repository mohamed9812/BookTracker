import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function NearbyLibrariesScreen() {
  const GOOGLE_API_KEY = "AIzaSyCvjBrPI7JFyzuM350nwLg1ii31lVMhCv4"; // Füge hier deinen API-Key ein

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Suche nach Bibliotheken"
        onPress={(data, details = null) => {
          console.log(data, details);
          // Hier kannst du die Details für Marker oder andere Aktionen verwenden
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "de",
          types: "library", // Sucht spezifisch nach Bibliotheken
        }}
        styles={{
          textInputContainer: styles.searchContainer,
          textInput: styles.searchInput,
        }}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 52.5200, // Beispiel: Berlin
          longitude: 13.4050,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Marker können hier hinzugefügt werden */}
        <Marker coordinate={{ latitude: 52.5200, longitude: 13.4050 }} title="Bibliothek" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
    backgroundColor: "white",
  },
  searchInput: {
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  map: {
    flex: 1,
  },
});