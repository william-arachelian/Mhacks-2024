import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native"
import { useEffect, useState } from "react"
import axios from 'axios'
import RecipeListItem from "../../../components/RecipeListItem.jsx"
const GenerateRecipes = () =>{

  [recipeList, setRecipeList] = useState([]);

  const handleGenerate = () => {
    axios.get("http://127.0.0.1:5000/recipes/generate")
    .then((response) =>{
      console.log(response) 
      setRecipeList([...response.data["recipes"]])
    }
    
    )
    .catch((e) => console.log(e));
  }
  return (
    <SafeAreaView className="flex-1">
    <View className="h-[200] mb-[60]">
      <View className="w-full h-[200] flex-1 items-center justify-center bg-primary">
        <Text className="font-sans text-3xl font-semibold top-10 ">Recipe Generator</Text>

        <View className="w-full h-[65] px-10 relative top-20">
          <TouchableOpacity 
            className="w-full h-full bg-accent rounded-lg flex-1 justify-center items-center"
            onPress={() => handleGenerate()}
          >
            <Text className="text-white italic">Click to Generate!</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  
    <ScrollView className="px-10">
      {recipeList.map((recipe, i)=>
        <RecipeListItem 
          key={i}
          name={recipe.name}
          ingredients={recipe.ingredients}
          instructions={recipe.instructions}
          description={recipe.description}
          cookTime={recipe.cookTime}
        />
      )}
      
    </ScrollView>

  </SafeAreaView>
  
)
}



export default GenerateRecipes