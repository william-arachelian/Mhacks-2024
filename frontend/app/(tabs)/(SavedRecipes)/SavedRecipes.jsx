import { View, Text, SafeAreaView, TextInput, ScrollView } from "react-native"
import RecipeListItem from "../../../components/RecipeListItem.jsx"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigation } from "expo-router"
const SavedRecipes = () =>{

    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigation = useNavigation();
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get("http://127.0.0.1:5000/recipes/")
            .then((response) => {
                console.log(response.data.recipes)
                setRecipes([...response.data.recipes]);
            })
            .catch((e) => console.log(e))
            
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (searchQuery !== ""){
            axios.get(`http://127.0.0.1:5000/recipes/searchByName/${searchQuery}`)
            .then((response) => {
                setRecipes([...response.data.recipes])
            })
            .catch((e) => {
                console.log(e);
            })
        }
        else {
            axios.get("http://127.0.0.1:5000/recipes/")
            .then((response) => {
                setRecipes([...response.data.recipes]);
            })
            .catch((e) => {
                console.log(e);
            })
        }



    }, [searchQuery])

    return  <SafeAreaView className="flex-1">
        <View className="h-[200] mb-[80]">
            <View className="w-full h-[200] flex-1 items-center justify-center bg-primary">
                <Text className="font-sans text-3xl font-semibold top-10 ">Saved Recipes</Text>

                <View className="w-full h-[65] px-10 relative top-20">
                <Text>Search for a Recipe:</Text>

                <TextInput className="w-full h-full bg-secondary rounded-lg text-center"
                    placeholder={"e.g. Apple Pie"}
                    value={searchQuery}
                    onChangeText={(text) => {setSearchQuery(text)}}
                />

                </View>
            </View>


            
        </View>
        <ScrollView
           className="px-10"
        >
            {recipes.reverse().map((recipe, i) => {
                return <RecipeListItem 
                    key={i}
                    name={recipe.name}
                    ingredients={recipe.ingredients}
                    instructions={recipe.instructions}
                    description={recipe.description}
                    cookTime={recipe.cookTime}
                    navigation={navigation}
                />

            })}
        </ScrollView>
       
    
    
    </SafeAreaView>
}



export default SavedRecipes