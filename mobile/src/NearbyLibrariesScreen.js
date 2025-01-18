import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function NearbyLibrariesScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>In der Nähe Erkunden</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8C3FC",
    padding: 16,
  },
  title: {
    fontSize: 36,
    color: "#000000",
    fontWeight: "300",
    marginLeft: 15,
  },
});