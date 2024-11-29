import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import { useRoute } from '@react-navigation/native';
import axios from 'axios'
import { useFocusEffect } from "expo-router";
import { useEffect, useState } from "react";
const SingleRecipe = () => {

    const route = useRoute();

     //need to first check if a recipe with this name already save in database and initialize saved state based on that
     // issue with recipes/findByName

    const [saved, setSaved] = useState(false);
    const {name, ingredients, instructions, description, cookTime} = route.params;

    const [recipeObj, setRecipeObj] = useState({
        "name":name,
        "ingredients":ingredients, 
        "instructions": instructions, 
        "description": description, 
        "cookTime":cookTime,
        });

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/recipes/findOneByName/${recipeObj.name}`)
        .then((response) => {
            // console.log(response.data)
            setSaved(true)
            setRecipeObj((prev) => ({ ...prev, _id: response.data.recipe._id })); 
        })
        .catch((e) => {
            setSaved(false)

        })
    }, [])

    const handleSave = () => {
        if (!saved){
            axios.post("http://127.0.0.1:5000/recipes/add", 
                {"name":name,
                "ingredients":ingredients, 
                "instructions": instructions, 
                "description": description, 
                "cookTime":cookTime
                })
            .then((response) => {
                console.log(response.data.output._id)
                setRecipeObj((prev) => ({ ...prev, _id: response.data.output._id }));
                setSaved(true)
            })
            .catch((e) => {
                console.log(e);
            })
           
        }
        else {
            axios.delete(`http://127.0.0.1:5000/recipes/delete/${recipeObj._id}`)
            .then((response) =>  {
                setSaved(false)
                setRecipeObj(prev => ({ ...prev, _id: null }));
            })
            .catch((e) =>{
                console.log(e)
            })
        }

    }

    return <><SafeAreaView>
        <ScrollView className="px-[25] h-max-[150]">
            <View className="w-full flex-row justify-center pt-[50]">
                <Text className="text-2xl text-center">{name}</Text>
            </View>
            <View className="w-full">
                <Text className="text-lg font-semibold">Ingredients:</Text>
                {ingredients.map((ingredient, i) => {
                    return <Text key={i} className="ml-2">{i+1}. {ingredient}</Text>
                })}
            </View>
            <View className="w-full">
                <Text className="text-lg font-semibold">Instructions:</Text>
                {instructions.map((ingredient, i) => {
                    return <Text key={i} className="ml-2">{i+1}. {ingredient}</Text>
                })}
            </View>
        </ScrollView>

        
    </SafeAreaView>
     <View className="w-full h-[50] px-10 absolute bottom-[25]">
     <TouchableOpacity 
       className="w-full h-full bg-primary rounded-lg flex-1 justify-center items-center"
       onPress={() => handleSave()}
     >
        {!saved ? <Text className="font-semibold">Save Recipe</Text> : <Text className="font-semibold">Saved</Text>}
       
     </TouchableOpacity>

   </View></>

}

export default SingleRecipe;