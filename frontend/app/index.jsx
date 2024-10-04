import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import IngredientListItem from "../components/IngredientListItem";

const IngredientsPage = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  
  useEffect(()=>{
    axios.get("http://127.0.0.1:5000/ingredients/")
      .then((response) => {
        setIngredientsList([...response.data["ingredients"]]);
        console.log(ingredientsList)
      })
      .catch((e) => {
        console.log(e);
      })
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="h-[200] mb-[80]">
        <View className="w-full h-[200] flex-1 items-center justify-center bg-primary">
          <Text className="font-sans text-3xl font-semibold top-10 ">Your Ingredients</Text>

          <View className="w-full h-[65] px-10 relative top-20">
            <Text>Search for an Ingredient:</Text>

            <TextInput className="w-full h-full bg-secondary rounded-lg text-center"
              placeholder="e.g. Eggs, Milk, Chicken"
              onChangeText={(input) => setSearchQuery(input)}
            />

          </View>
        </View>
      </View>

      <ScrollView 
        className="px-10 mb-[50]"
      >
          {ingredientsList.map((ingredient, i)=> (
            <IngredientListItem 
              key={i}
              _id={ingredient._id}
              name={ingredient.name} 
              exiprationDate={ingredient.expirationDate}
              quantity={ingredient.quantity}
              unit={ingredient.unit}
            />
          ))}
      </ScrollView>
      
      
      <TouchableOpacity 
        className="px-[40]"
        onPress={()=>{console.log("go to create ingredient")}}
      >
        <View className="bg-primary rounded-xl items-center justify-center w-full h-[50] mb-[50]">
          <Text>Add Ingredient</Text>
        </View>
        
      </TouchableOpacity>
    </SafeAreaView>
    
  )
}

export default IngredientsPage

// Define HomeScreen component within index.jsx
// function HomeScreen(props) {
//   const navigation = useNavigation(); // Access navigation object

//   return (
//     <ImageBackground source={background_image} resizeMode="cover" style={styles.background_image}>

//         <ScrollView contentContainerStyle={styles.scrollViewContainer}>
//             <View style={styles.container}>
//                 <View style={styles.text_box}>
//                     <Text style={styles.ingredients}>Enter Ingredients:</Text>
//                 </View>

//                 {/* List of Ingredients User Enters */}
//                 <ListWithScroll/>

//                 <TouchableOpacity
//                     style={styles.button} 
//                     onPress={() => {
//                       props.setButtonClick(true)
//                       navigation.navigate('Recipe Generator')
//                     }}  // Navigate to RecipeGenerator screen
//                 >
//                     <Text style={styles.buttonText}>Show me Recipes!</Text> 
//                 </TouchableOpacity>


//                 <View style={styles.intro}>
//                     <Text style={styles.introText}>
//                         RecipEasy suggests delicious recipes based on the ingredients you have. 
//                         Using AI, it tailors personalized recipes to your available ingredients. 
//                         Whether planning a grocery list or seeking inspiration, RecipeGenerator has you covered!
//                     </Text>
//                 </View>


//             </View>
//         </ScrollView>
//     </ImageBackground>
//   );
// }

// //Navigation Bar
// function Index() {
//   const [buttonClick, setButtonClick] = React.useState(true);
//   return (

//     <HomeScreen></HomeScreen>
//   );
// }

// const styles = StyleSheet.create({
 
//   intro: {
//     padding: 20,                
//     marginBottom: 40,               
//     textAlign: 'center',            
//     color: '#333',           
//     fontSize: 30,                   
//     lineHeight: 34,                
//     backgroundColor: '#f5f5dc',       
//     borderRadius: 15,  
//     fontWeight: 'bold',                
    
//   },  

//   introText: {
//     color: '#333',
//     fontSize: 20,
//     fontFamily: 'Georgia', // Change to a different font family
    
//   },

//   text_box: {
//     borderColor: '#777',
//     backgroundColor: '#f5f5dc',
//     padding: 12,
//     margin: 10,
//     borderRadius: 15,
//   },

//   ingredients: {
//     fontSize: 35, 
//     fontWeight: 'bold', 
//     textDecorationLine: 'underline',

//   },

//   background_image: {
//     flex: 1,
//   },

//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingTop: 100,
//     paddingBottom: 200,
//   },

//   input: {
//     borderWidth: 1,
//     borderColor: "#777",
//     backgroundColor: "#fff",
//     padding: 8,
//     margin: 10,
//     height: 100,
//     width: 250,
//     fontSize: 18,
//   },

//   button: {
//     backgroundColor: "#f5f5dc",
//     padding: 12,
//     borderRadius: 15,
//     marginBottom: 40,
//   },

//   buttonText: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
// });
