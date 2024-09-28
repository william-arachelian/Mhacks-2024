import React from 'react';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';
import background_image from '../assets/background_image.jpg'; // Adjust the path if necessary

export default function RecipeGenerator() {
  return (
    <ImageBackground source={background_image} resizeMode="cover" style={styles.background_image}>
        <View style={styles.container}>
        <Text style={styles.text}>Recipe Generator</Text>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background_image: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});