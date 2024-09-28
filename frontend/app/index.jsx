import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity,} from 'react-native'; // Import Text if not included
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecipeGenerator from './RecipeGenerator'; // Adjust the path if necessary
import background_image from '../assets/background_image.jpg'; // Adjust the path if necessary
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

// Create the Tab Navigator
const Tab = createBottomTabNavigator();

// Define HomeScreen component within index.jsx
function HomeScreen() {
  const navigation = useNavigation(); // Access navigation object
  
  return (
    <ImageBackground source={background_image} resizeMode="cover" style={styles.background_image}>
        <View style={styles.container}>
            <View style={styles.text_box}>
                <Text style={styles.ingredients}>Enter Ingredients:</Text>
            </View>
            <TextInput 
                style={styles.input}
                placeholder='e.g. Eggs 12, Milk 2, Cheese 7, Bacon 4'
                multiline={true} // placeholder vertical centering 
            />

            <TouchableOpacity
                style={styles.button} 
                onPress={() => navigation.navigate('Recipe Generator')}  // Navigate to RecipeGenerator screen
            >
                <Text style={styles.buttonText}>Show me Recipes!</Text> 
            </TouchableOpacity>
        </View>
    </ImageBackground>
  );
}

//Navigation Bar
export default function Index() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="RecipEasy" component={HomeScreen} />
        <Tab.Screen name="Recipe Generator" component={RecipeGenerator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  text_box: {
    borderColor: '#777',
    backgroundColor: '#f5f5dc',
    padding: 8,
    margin: 10,
    borderRadius: 15,
  },

  ingredients: {
    fontSize: 18, 
  },

  background_image: {
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#777',
    backgroundColor: '#fff',
    padding: 8,
    margin: 10,
    height: 100,
    width: 250,
    fontSize: 18,   
  },

  button: {
    backgroundColor: '#f5f5dc',
    padding: 12,
    borderRadius: 15,
  },

  buttonText: {
    fontSize: 20,   
    fontWeight: 'bold', 
  }
});