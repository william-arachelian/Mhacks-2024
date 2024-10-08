import { useState } from "react"
import { View,Text,SafeAreaView,TextInput, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router";
import axios from "axios";

const NewRecipe = () => {
    const router = useRouter();
    const [ingredientObj, setIngredientObj] = useState({});

    const handleSubmit = () => {
        axios.post("http://127.0.0.1:5000/ingredients/add", ingredientObj)
        .then((response) => {
            console.log(response)
            router.dismiss()
        })
        .catch((e) => {
            console.log(e);
        })
    }
    return <SafeAreaView className="flex-1">
        <View className="w-full h-[200]">
            <View className="flex-1 justify-center items-center">
                <Text className="font-serif text-3xl ">New Ingredient</Text>
            </View>

            <View className="h-[65] px-10">
                <TextInput 
                    className="bg-secondary rounded-lg h-full text-center"
                    placeholder="Ingredient Name"  
                    onChangeText={(text)=>{setIngredientObj({...ingredientObj, "name": text})}}  
                />
            </View>
        </View>

        <TouchableOpacity 
          className="px-[40]"
            onPress={handleSubmit}
        >
          <View className="bg-primary rounded-xl items-center justify-center w-full h-[50] mb-[50]">
            <Text>Add Ingredient</Text>
          </View>
          
        </TouchableOpacity>
    </SafeAreaView>
}
export default NewRecipe