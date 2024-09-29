import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native"; // Import Text if not included
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecipeGenerator from "./RecipeGenerator"; // Adjust the path if necessary
import background_image from "../assets/background_image.jpg"; // Adjust the path if necessary
// import { TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ListWithScroll from "./ListWScroll";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Recipe from "./recipe"
import SavedRecipes from './SavedRecipes';

// Create the Tab Navigator
const Tab = createBottomTabNavigator();
// Define HomeScreen component within index.jsx
function HomeScreen(props) {
  const navigation = useNavigation(); // Access navigation object

  return (
    <ImageBackground source={background_image} resizeMode="cover" style={styles.background_image}>

        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <View style={styles.text_box}>
                    <Text style={styles.ingredients}>Enter Ingredients:</Text>
                </View>

                {/* List of Ingredients User Enters */}
                <ListWithScroll/>

                <TouchableOpacity
                    style={styles.button} 
                    onPress={() => {
                      props.setButtonClick(true)
                      navigation.navigate('Recipe Generator')
                    }}  // Navigate to RecipeGenerator screen
                >
                    <Text style={styles.buttonText}>Show me Recipes!</Text> 
                </TouchableOpacity>


                <View style={styles.intro}>
                    <Text style={styles.introText}>
                        RecipEasy suggests delicious recipes based on the ingredients you have. 
                        Using AI, it tailors personalized recipes to your available ingredients. 
                        Whether planning a grocery list or seeking inspiration, RecipeGenerator has you covered!
                    </Text>
                </View>


            </View>
        </ScrollView>
    </ImageBackground>
  );
}

//Navigation Bar
export default function Index() {
  const [buttonClick, setButtonClick] = React.useState(true);
  return (
    <Tab.Navigator>
        <Tab.Screen name="RecipEasy" children={() => <HomeScreen buttonClick={buttonClick} setButtonClick={setButtonClick}></HomeScreen>} />
        <Tab.Screen name="Recipe Generator" children={() => <RecipeGenerator buttonClick={buttonClick} setButtonClick={setButtonClick}></RecipeGenerator>} />
        <Tab.Screen name="Save Recipes" component={SavedRecipes}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
 
  intro: {
    padding: 20,                
    marginBottom: 40,               
    textAlign: 'center',            
    color: '#333',           
    fontSize: 30,                   
    lineHeight: 34,                
    backgroundColor: '#f5f5dc',       
    borderRadius: 15,  
    fontWeight: 'bold',                
    
  },  

  introText: {
    color: '#333',
    fontSize: 20,
    fontFamily: 'Georgia', // Change to a different font family
    
  },

  text_box: {
    borderColor: '#777',
    backgroundColor: '#f5f5dc',
    padding: 12,
    margin: 10,
    borderRadius: 15,
  },

  ingredients: {
    fontSize: 35, 
    fontWeight: 'bold', 
    textDecorationLine: 'underline',

  },

  background_image: {
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    paddingBottom: 200,
  },

  input: {
    borderWidth: 1,
    borderColor: "#777",
    backgroundColor: "#fff",
    padding: 8,
    margin: 10,
    height: 100,
    width: 250,
    fontSize: 18,
  },

  button: {
    backgroundColor: "#f5f5dc",
    padding: 12,
    borderRadius: 15,
    marginBottom: 40,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
