import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import { useRoute } from '@react-navigation/native';
const SingleRecipe = () => {

    const route = useRoute();
    const {name, ingredients, instructions, description, cookTime} = route.params;
    const handleSave = () => {
        console.log("saved recipe")

    }


    return <SafeAreaView>
        <ScrollView>
            <View className="w-full flex-row justify-center pt-[50] px-[25] pb-[25]">
                <Text className="text-2xl text-center">{name}</Text>
            </View>
            <View className="w-full px-[25]">
                <Text className="text-lg font-semibold">Ingredients:</Text>
                {ingredients.map((ingredient, i) => {
                    return <Text className="ml-2">{i+1}. {ingredient}</Text>
                })}
            </View>
            <View className="w-full px-[25]">
                <Text className="text-lg font-semibold">Instructions:</Text>
                {instructions.map((ingredient, i) => {
                    return <Text className="ml-2">{i+1}. {ingredient}</Text>
                })}
            </View>
        </ScrollView>

        <View className="w-full h-[50] px-10 mt-10">
          <TouchableOpacity 
            className="w-full h-full bg-primary rounded-lg flex-1 justify-center items-center"
            onPress={() => handleSave()}
          >
            <Text className="font-semibold">Save Recipe</Text>
          </TouchableOpacity>

        </View>
        
    </SafeAreaView>
}

export default SingleRecipe;