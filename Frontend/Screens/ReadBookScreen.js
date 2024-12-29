import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ReadBookScreen({ route }) {
  const { fileUri, title } = route.params;

  const pdfHTML = `
    <html>
      <body style="margin: 0; padding: 0;">
        <iframe
          src="${fileUri}"
          style="width: 100%; height: 100%; border: none;"
          allowfullscreen
        ></iframe>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || "Buch lesen"}</Text>
      <WebView
        originWhitelist={['*']}
        source={{ html: pdfHTML }}
        style={styles.webView}
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
  webView: {
    flex: 1,
  },
});