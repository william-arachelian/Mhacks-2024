import {
  SafeAreaView,
  View,
  Text,
  Button,

} from "react-native";
import React from "react";
import {useNavigation} from 'expo-router'

const Index = () => {
  const navigation = useNavigation();

  return <SafeAreaView className="flex-1">
    <View className="w-full flex-1 justify-center items-center">
      <Text>Simulating Sign In...</Text>
      <Button 
        className=""
        onPress={() => {
          navigation.navigate("(tabs)")
        }}
        title="Click to Go to App"
      />
      
    </View>
  </SafeAreaView>
 
}

export default Index;

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
