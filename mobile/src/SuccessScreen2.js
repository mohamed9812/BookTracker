import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Circle, Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

export default function SuccessScreen2({ route, navigation }) {
  const { titleText } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titleText}</Text>
      <Svg
      width="214"
      height="214"
      viewBox="0 0 214 214"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx="107" cy="107" r="102" stroke="#63CA23" strokeWidth="10" />
      
      <G clipPath="url(#clip0_14_215)">
        <Path
          d="M150.383 67.5259L158.199 75.3426L87.0675 146.474L55.8008 115.208L63.6175 107.391L87.0675 130.841L150.383 67.5259ZM150.383 51.7251L87.0675 115.04L63.6175 91.5901L40 115.208L87.0675 162.275L174 75.3426L150.383 51.7251Z"
          fill="#63CA23"
        />
      </G>

      <Defs>
        <ClipPath id="clip0_14_215">
          <Rect
            width="134"
            height="134"
            fill="white"
            transform="translate(40 40)"
          />
        </ClipPath>
      </Defs>
    </Svg>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Menu")}
      >
        <Text style={styles.buttonText}>Hauptmenü</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8C3FC",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 36,
    color: "#000000",
    marginBottom: 40,
    fontWeight: "300",
    marginBottom: "20%",
  },
  button: {
    backgroundColor: "#6C76CE",
    padding: 15,
    borderRadius: 20,
    width: "70%",
    alignItems: "center",
    marginTop: "30%",
  },
  buttonText: { 
    fontSize: 16, 
    color: "#FFF", 
    fontWeight: "300" 
  },
});
