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
  import IngredientListItem from "../../components/IngredientListItem";
  
  const IngredientsList = () => {
  
    const [searchQuery, setSearchQuery] = useState("");
    const [ingredientsList, setIngredientsList] = useState([]);
    
    useEffect(()=>{
      axios.get("http://127.0.0.1:5000/ingredients/")
      .then((response) => {
        setIngredientsList([...response.data["ingredients"]]);
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
            {ingredientsList.length != 0 ? ingredientsList.map((ingredient, i)=> (
              <IngredientListItem 
                ingredientsList = {ingredientsList}
                setIngredientsList = {setIngredientsList}
                key={i}
                _id={ingredient._id}
                name={ingredient.name} 
                exiprationDate={ingredient.expirationDate}
                quantity={ingredient.quantity}
                unit={ingredient.unit}
              /> 
            )) :
             <View>
              <Text className="font-sans font-semibold text-center">No Ingredients Yet...</Text>
            </View>
          }
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
  
  export default IngredientsList;