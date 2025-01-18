import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

export default function ReadBookScreen({ route }) {
  const { fileUri, title } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || "Buch lesen"}</Text>
      <Pdf
        trustAllCerts={false}
        source={{ uri: fileUri }}
        style={styles.pdf}
        scale={1.0} // Standard-Zoomstufe
        minScale={1.0} // Mindest-Zoomstufe
        maxScale={3.0} // Maximale Zoomstufe
        spacing={5} // Abstände zwischen Seiten
        enablePaging={true} // Für Seitennavigation
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
       
        onError={(error) => {
          console.error(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8C3FC",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "300",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  pdf: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#AAA",
    marginTop: 10,
  },
});