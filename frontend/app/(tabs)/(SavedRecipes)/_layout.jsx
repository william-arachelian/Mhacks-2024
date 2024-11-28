import { Stack } from "expo-router";



const SavedRecipesLayout = () => {
    return <Stack
    screenOptions={{
        headerTintColor:'#5DB075',
        headerStyle: {
            backgroundColor: 'white',
        },  
    }}
>
    <Stack.Screen 
        name="SavedRecipes"
        options={{headerShown: false}}
    />
    {/* <Stack.Screen 
        name="SingleSavedRecipe"
        options={{title: ""}}
    /> */}
</Stack>    

}

export default SavedRecipesLayout;