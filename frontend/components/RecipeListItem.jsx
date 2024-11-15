import {Text, TouchableOpacity } from "react-native";

const RecipeListItem = ({
    name,
    ingredients,
    instructions,
    description,
    cookTime,
}) => {
    const handlePress = () => {
        console.log("pressed");
    }
    return (  
        <TouchableOpacity className="flex-1 w-full bg-secondary h-[150] rounded-lg p-[10] justify-between mb-[20]"
            onPress={() => handlePress()}
        >
            <Text className="font-semibold text-xl">{name}</Text>
            <Text>{description}</Text>
            <Text className="italic">Est. Prep Time: {cookTime}</Text>
        </TouchableOpacity>
    )
}

export default RecipeListItem;