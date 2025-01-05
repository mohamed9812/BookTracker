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
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onError={(error) => {
          console.error(error);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3E3FD",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  pdf: {
    flex: 1,
  },
});
